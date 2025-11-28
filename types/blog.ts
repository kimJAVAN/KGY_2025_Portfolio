// types/blog.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}