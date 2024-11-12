export default {
  name: 'community',
  title: 'Community',
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
    // ... other fields with validation: rule => rule.required()
  ]
}; 


































