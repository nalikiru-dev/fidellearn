export default {



  name: 'course',



  title: 'Course',



  type: 'document',



  fields: [



    {



      name: 'title',



      title: 'Title',



      type: 'string',



    },



    {



      name: 'description',



      title: 'Description',



      type: 'text',



    },



    {



      name: 'image',



      title: 'Image',



      type: 'image',



      options: {



        hotspot: true,



      },



    },



    {



      name: 'subjects',



      title: 'Subjects',



      type: 'array',



      of: [{ type: 'string' }],



    },



    {



      name: 'lessons',



      title: 'Lessons',



      type: 'array',



      of: [

        {

          type: 'object',

          fields: [

            { name: 'title', type: 'string' },

            { name: 'completed', type: 'boolean', initialValue: false },

            { name: 'locked', type: 'boolean', initialValue: false }

          ]

        }

      ]



    },



    {



      name: 'progress',
      title: 'Progress',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }

  ],



};










