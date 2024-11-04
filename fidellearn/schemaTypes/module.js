export default {
    name: 'module',
    title: 'Module',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'lessons',
        title: 'Lessons',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'lesson' }] }],
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  