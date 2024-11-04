export default {
    name: 'lesson',
    title: 'Lesson',
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
        name: 'videoUrl',
        title: 'Video URL',
        type: 'url',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
              },
            ],
          },
        ],
      },
      {
        name: 'resources',
        title: 'Resources',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Title' },
              { name: 'url', type: 'url', title: 'URL' },
            ],
          },
        ],
      },
      {
        name: 'duration',
        title: 'Duration (in minutes)',
        type: 'number',
      },
    ],
  };
  