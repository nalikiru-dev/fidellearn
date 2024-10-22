export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Article', value: 'article' },
          { title: 'Quiz', value: 'quiz' },
        ],
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    },
  ],
};

