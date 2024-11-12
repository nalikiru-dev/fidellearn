export default {



  name: 'achievement',



  title: 'Achievement',



  type: 'document',



  fields: [



    {



      name: 'title',



      title: 'Title',



      type: 'string',



      validation: rule => rule.required()



    },



    {



      name: 'description',



      title: 'Description',



      type: 'text',



      validation: rule => rule.required()



    },



    {



      name: 'icon',



      title: 'Icon',



      type: 'image',



      validation: rule => rule.required()



    },



    {



      name: 'type',



      title: 'Type',



      type: 'string',



      options: {



        list: [



          { title: 'Course Completion', value: 'course' },



          { title: 'Streak', value: 'streak' },



          { title: 'Community', value: 'community' },



          { title: 'Special', value: 'special' },



        ],



      },



      validation: rule => rule.required()



    },



    {



      name: 'points',



      title: 'Points',



      type: 'number',



      validation: rule => rule.required().min(0)



    },



    {



      name: 'criteria',



      title: 'Criteria',



      type: 'text',



      description: 'Requirements to earn this achievement',



      validation: rule => rule.required()



    },



  ],



}; 






























