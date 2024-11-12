export default {

  name: 'progress',

  title: 'Progress',

  type: 'document',

  fields: [

    {

      name: 'user',

      title: 'User',

      type: 'string',

      validation: rule => rule.required()

    },

    {

      name: 'course',

      title: 'Course',

      type: 'reference',

      to: [{ type: 'course' }],

      validation: rule => rule.required()

    },

    {

      name: 'completedLessons',

      title: 'Completed Lessons',

      type: 'array',

      of: [{ type: 'reference', to: [{ type: 'lesson' }] }],

      validation: rule => rule.required()

    },

    {

      name: 'lastAccessed',

      title: 'Last Accessed',

      type: 'datetime',

      validation: rule => rule.required()

    },

    {

      name: 'completionPercentage',

      title: 'Completion Percentage',

      type: 'number',

      validation: rule => rule.required()

    },

    {

      name: 'quizScores',

      title: 'Quiz Scores',

      type: 'array',

      of: [

        {

          type: 'object',

          fields: [

            { name: 'quizId', type: 'string' },

            { name: 'score', type: 'number' },

            { name: 'maxScore', type: 'number' },

            { name: 'completedAt', type: 'datetime' },

          ],

        },

      ],

      validation: rule => rule.required()

    },

  ]

}; 






























