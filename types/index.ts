export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: {
    asset: {
      url: string;
    };
  };
  price: number;
  duration: number;
  instructor: Instructor;
  modules: Module[];
  category: Category;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Module {
  _id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  content: any[];
  resources: {
    title: string;
    url: string;
  }[];
  duration: number;
}

export interface Instructor {
  _id: string;
  name: string;
  bio: string;
  avatar: {
    asset: {
      url: string;
    };
  };
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}
