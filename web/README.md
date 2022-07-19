# ruckus-blog-eleventy-web

A lot of code and inspiration drawn from these templates:
https://github.com/sanity-io/sanity-template-eleventy-blog
https://github.com/philhawksworth/eleventyone
https://github.com/philhawksworth/eleventail
https://github.com/google/eleventy-high-performance-blog
https://github.com/reeseschultz/11r
Check their readmes for issues or config details

TODO:
[] steal design inspo
  [] https://www.twosigma.com/
  [] https://github.com/philhawksworth/hawksworx.com/tree/master/src/site
  [] https://eleventyduo.netlify.app/
[] reconcile json metadata with sanity provisions
[] pull `mainImage` from sanity
[] ensure draft posting, scheduled releases, tags, images, code snippets, code copying enabled through sanity
[] ensure 11ty using sanity's preview, orderings, list fetches
[] ensure RSS feed is working
[] remove web/posts/posts.11tydata.js if so
[] reinstate tests ( "build": "yarn js-build && eleventy && yarn test", in package.json)
[] [11ty plugin navigation](https://www.11ty.dev/docs/plugins/navigation/) vs native?
[] [11ty plugin image](https://www.11ty.dev/docs/plugins/image/) vs third party
[] update and verify [Open Graph](https://ogp.me/) tags (`og:...`)
[] https://type-scale.com/
[] lighthouse audits [https://github.com/ar363/eleventy-stylus-blog-theme](https://github.com/ar363/eleventy-stylus-blog-theme)
[] page-load time (fixed with dynamic content and preloading - low prio)
[] minimize cumulative layout shift
[] no FOUC
[] review high-performance SEO features
[] highlight to share
[] more/better share options
[] obfuscate/fingerprint asset URLs
[] separate css files, maybe don't inline
[] remove either `scripts/ga.js` or `data/googleanalytics.js`, or figure this out
[] check on `_headers`
[] get a11y check, specifically for max contrast
[] fix [tailwind imports](https://tailwindcss.com/docs/using-with-preprocessors)
[] adhere to [font best practices](https://web.dev/font-best-practices/)
[] figure out JSON-LD and [schema.org](https://schema.org/docs/gs.html)
[] ensure consent and compliance with GA: https://analytics.google.com/analytics/web/#/a233779348p322165129/admin/datapolicies/datacollection
[] probably replace local plugin img-dim with 11ty-maintained
  [] deal with local ffmpeg install
[] add reader bar? https://www.npmjs.com/package/eleventy-plugin-reader-bar

Features for consideration
[] [https://github.com/signalkuppe/eleventy-react](https://github.com/signalkuppe/eleventy-react)
[] [https://htmx.org/](https://htmx.org/)
[] [https://mdxjs.com/](https://mdxjs.com/)
[] is Svelte better than Alpine? probably worth a try
[] [other plugins](https://www.11ty.dev/docs/plugins/)
[] dark mode/light mode (ideally match system theme) [tutorial](https://jec.fyi/blog/supporting-dark-mode)
  [] maybe [theme ui](https://github.com/deckchairlabs/eleventy-plugin-theme-ui) can help
[] automated responsiveness test?
[] play button with various options
  [] send to Kindle
  [] PDF version
  [] Audm or read aloud
[] mobile mousedown for link previews?
[] search posts
[] pagination? probably not
[] [https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/](https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/)
  [] Browsersync
  [] cache-busting strategies
[] Enable [Tweet embeds in markdown](https://orbit.love/blog/how-to-add-twitter-and-instagram-embeds-on-an-eleventy-website-using-sanity)
[] update [sanity icons](https://www.sanity.io/docs/icons-for-data-types) for doc types
[] garbagetown experience getting first-party GA logging
- https://analytics.google.com/analytics/web/#/a233779348p322165129/admin/streams/table/3823518178
- https://ga-dev-tools.web.app/ga4/event-builder/
- https://developers.google.com/tag-platform/tag-manager/server-side/send-data
- https://www.simoahava.com/gtm-tips/send-google-analytics-requests-custom-endpoint/
- https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
- https://jec.fyi/blog/setting-up-seo-and-google-analytics
  [] either spend more hours with body from functions/ga.js
  [] or find an earlier UA example (maybe functions/ga.bak.js)
  [] debug local transport_url port stripping
[] get noscript image trick working
- https://www.analyticsmania.com/post/google-tag-manager-noscript/
[] webvitals
- https://www.searchenginejournal.com/technical-seo-core-web-vitals-guide/402501/
- https://github.com/GoogleChrome/web-vitals
- https://web.dev/vitals/
  [] setup sample web vitals report: https://github.com/GoogleChromeLabs/web-vitals-report
[] maybe don't build on netlify? seems weird that I can't set NODE_ENV to production on production (because it's building with dev deps)
[] maybe don't watch and force eleventy rebuild on dist file change (since it won't affect html)
[] make sure tweeting and search engines pick up a pretty preview (excerpt from Sanity)
[] eventually change Sections in Posts to references inside the body, then fetch and inline them on generation


design vision:
- no images?
- two post previews - big (2-row) and small (1-row), both 1-col
- 2-col index layout
- sticky header with nav to home page
- bold headers, thin text, all sans
- "Pinned Posts"
- no "Go to archive", just scroll for list
- grid for pinned, list for archive
- big, bold slogan
- lots of horizontal rules
- accent on hover? probably accent always

eleventy templates and starters:
- https://www.11ty.dev/docs/starter/
- https://jamstackthemes.dev/ssg/eleventy/
- https://www.easeout.co/blog/2021-01-28-50-best-eleventy-starter-themes-2021/

all relevant schema.org typedefs:
[] probably don't bother with the schema plugin, just use json-ld checker from high-performance
[] maybe just use https://developers.google.com/search/docs/advanced/structured-data to autogenerate
- https://www.maxivanov.io/add-structured-data-to-eleventy-blog/
- https://github.com/quasibit/eleventy-plugin-schema
- https://json-ld.org/playground/
- https://www.jsonschemavalidator.net/
https://schema.org/Blog
https://schema.org/Article
https://schema.org/HyperToc
https://schema.org/HyperTocEntry
https://schema.org/WebContent
https://schema.org/WebPage
https://schema.org/WebPageElement
https://schema.org/WebSite
https://schema.org/Corporation
https://schema.org/Project
https://schema.org/Code
https://schema.org/WebApplication

https://schema.org/ReactAction
https://schema.org/LikeAction
https://schema.org/ReviewAction
https://schema.org/UseAction
https://schema.org/AskAction
https://schema.org/CommentAction

why does css break sometimes? seems like it's after cached deploys
css pipeline:
css files -> js import -> rollup extraction -> postcss plugin -> optimizeHtml plugin -> dist
