export default {

  name: 'notification',

  title: 'Notification',

  type: 'document',

  fields: [

    {

      name: 'user',

      title: 'User',

      type: 'string',

      validation: rule => rule.required()

    },

    {

      name: 'title',

      title: 'Title',

      type: 'string',

      validation: rule => rule.required()

    },

    {

      name: 'message',

      title: 'Message',

      type: 'text',

      validation: rule => rule.required()

    },

    {

      name: 'type',

      title: 'Type',

      type: 'string',

      options: {

        list: [

          { title: 'Course Update', value: 'course' },

          { title: 'Achievement', value: 'achievement' },

          { title: 'System', value: 'system' },

          { title: 'Community', value: 'community' },

        ],

      },

      validation: rule => rule.required()

    },

    {

      name: 'read',

      title: 'Read',

      type: 'boolean',

      initialValue: false,

      validation: rule => rule.required()

    },

    {

      name: 'createdAt',

      title: 'Created At',

      type: 'datetime',

      initialValue: (new Date()).toISOString(),

      validation: rule => rule.required()

    },

    {

      name: 'link',

      title: 'Link',

      type: 'url',

      description: 'Optional link to related content',

      validation: rule => rule.required()

    },

  ]

}; 






























