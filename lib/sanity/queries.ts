import { client } from './client';

export async function getCourseById(courseId: string) {
  const query = `
    *[_type == "course" && _id == $courseId][0]{
      _id,
      title,
      description,
      instructor->{
        _id,
        name,
        email,
        bio,
        avatar,
        expertise,
        qualifications,
        rating,
        totalStudents,
        languages
      },
      coverImage,
      price,
      duration,
      modules[]->{
        _id,
        title,
        description,
        order,
        lessons[]->{
          _id,
          title,
          description,
          videoUrl,
          duration,
          content,
          resources
        }
      },
      level,
      prerequisites,
      objectives,
      status,
      category->{
        _id,
        name,
        description
      },
      enrolledStudents
    }
  `;

  return client.fetch(query, { courseId });
}
