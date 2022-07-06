const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

function generatePost (post) {
  return {
    ...post,
    body: BlocksToMarkdown(post.body, { serializers, ...client.config() })
  }
}

const getPosts = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "post" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    _id,
    publishedAt,
    isPinned,
    isBig,
    title,
    subtitle,
    slug,
    body[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "authors": authors[].author->
  }`;
  // TODO: this may not be taking advantage of Sanity's order cache
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  // TODO: can we abstract out calls to the client? make this declarative
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const preparePosts = reducedDocs.map(generatePost)
  return preparePosts
}

module.exports = getPosts
