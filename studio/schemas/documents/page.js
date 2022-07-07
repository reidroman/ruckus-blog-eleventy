import {format, parseISO} from 'date-fns'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'The name of the page',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'content',
    },
  },
}
