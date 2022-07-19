export default {
  name: 'section',
  type: 'document',
  title: 'Reusable Section',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
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
    }
  }
}
