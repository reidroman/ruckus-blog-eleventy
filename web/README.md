# ruckus-blog-eleventy-web

A lot of code and inspiration drawn from these templates:
https://github.com/sanity-io/sanity-template-eleventy-blog
https://github.com/philhawksworth/eleventyone
https://github.com/google/eleventy-high-performance-blog
https://github.com/reeseschultz/11r
Check their readmes for issues or config details

TODO:
[] reconcile json metadata with sanity provisions
[] ensure draft posting, scheduled releases, tags, images, code snippets, code copying enabled through sanity
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

Features for consideration
[] [https://github.com/surjithctly/neat-starter](https://github.com/surjithctly/neat-starter)
  [] Alpine.js (maybe this is all the dynamism I need for instant nav)
[] [https://github.com/reeseschultz/11r](https://github.com/reeseschultz/11r)
[] [https://github.com/signalkuppe/eleventy-react](https://github.com/signalkuppe/eleventy-react)
[] [https://htmx.org/](https://htmx.org/)
[] [other plugins](https://www.11ty.dev/docs/plugins/)
[] dark mode/light mode (ideally match system theme) [tutorial](https://jec.fyi/blog/supporting-dark-mode)
[] automated responsiveness test?
[] send to Kindle? PDF version?
[] search posts
[] pagination? probably not
[] [https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/](https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/)
  [] Browsersync
  [] cache-busting strategies

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
