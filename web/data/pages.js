const groq = require("groq");
const BlocksToMarkdown = require("@sanity/block-content-to-markdown");
const client = require("../utils/sanityClient.js");
const serializers = require("../utils/serializers");
const overlayDrafts = require("../utils/overlayDrafts");

const hasToken = !!client.config().token;

function generatePage(page) {
  return {
    ...page,
    content: BlocksToMarkdown(page.content, { serializers, ...client.config() }),
  };
}

async function getPages() {
  const filter = groq`*[_type == "page"]`;
  const docs = await client.fetch(filter).catch((err) => console.error(err));
  const pages = docs.map(generatePage);
  const reducedPages = overlayDrafts(hasToken, pages);
  return reducedPages;
}

module.exports = getPages;
