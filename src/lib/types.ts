export type Author = {
  id: string;
  name: string;
  avatarUrl: string;
  imageHint: string;
  bio: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  authorId: string;
  coverImage: string;
  imageHint: string;
  content: string;
  tags: string[];
  category: string;
  publishDate: string;
  featured: boolean;
  editorsPick: boolean;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageHint: string;
  location: {
    name: string;
    address: string;
  };
  date: string;
  time: string;
};
