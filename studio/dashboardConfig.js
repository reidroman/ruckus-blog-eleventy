export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '62c06001355a9e4c3111180d',
                  title: 'Sanity Studio',
                  name: 'ruckus-blog-eleventy-studio',
                  apiId: '80f3cbef-3665-4323-b2a9-01ea5f71d315'
                },
                {
                  buildHookId: '62c06001bafb1752fffa2e93',
                  title: 'Blog Website',
                  name: 'ruckus-blog-eleventy',
                  apiId: 'a8caaa27-cc69-44f6-8945-0ae528af32d1'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/reidroman/ruckus-blog-eleventy',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://ruckus-blog-eleventy.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
