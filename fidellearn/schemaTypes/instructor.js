export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'avatar',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree/Certification',
              type: 'string',
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      initialValue: 0,
    },
    {
      name: 'totalStudents',
      title: 'Total Students',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'languages',
      title: 'Teaching Languages',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'avatar',
    },
  },
};
