// schemas/blog.ts
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(200),
  content: z.string().min(1, '내용을 입력해주세요'),
  slug: z.string().min(1, 'URL 슬러그를 입력해주세요').regex(/^[a-z0-9-]+$/, '영문 소문자, 숫자, 하이픈만 사용 가능합니다'),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof postSchema>;