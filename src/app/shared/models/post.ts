export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: Date;
  tags: string[];
  imageUrl?: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
}
