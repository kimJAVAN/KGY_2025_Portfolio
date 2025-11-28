// components/blog/PostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogStore } from '@/store/blogStore';
import { postSchema } from '@/schemas/blog';
import type { PostFormData } from '@/schemas/blog';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Button } from '@/components/common/Button';

export default function PostForm() {
  const router = useRouter();
  const { createPost, loading } = useBlogStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    slug: '',
    excerpt: '',
    coverImage: '',
    tags: [],
    published: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic slug generation
    const currentSlug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    try {
      const validated = postSchema.parse({
        ...formData,
        slug: currentSlug,
      });
      await createPost(validated);
      router.push('/blog');
    } catch (error: unknown) { // 'any' 대신 'unknown' 사용
      if (error instanceof Error) {
        if (error.errors) { // Zod validation error
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err: any) => { // Zod error의 경우 any 사용
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
        } else { // 일반 Error 객체
          setErrors({ general: error.message || "알 수 없는 오류가 발생했습니다." });
        }
      } else {
        // 알 수 없는 타입의 오류
        setErrors({ general: "알 수 없는 오류가 발생했습니다." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {errors.general && <p className="mt-1 text-sm text-red-600">{errors.general}</p>}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          제목 *
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          URL 슬러그 (비워두면 제목으로 자동 생성)
        </label>
        <Input
          id="slug"
          name="slug"
          type="text"
          value={formData.slug}
          onChange={handleChange}
          placeholder="예: my-first-post"
        />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          요약
        </label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={2}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          내용 *
        </label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={12}
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          커버 이미지 URL
        </label>
        <Input
          id="coverImage"
          name="coverImage"
          type="text"
          value={formData.coverImage}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          태그 (쉼표로 구분)
        </label>
        <Input
          id="tags"
          name="tags"
          type="text"
          defaultValue={formData.tags?.join(', ')}
          onChange={handleTagsChange}
          placeholder="React, TypeScript, Next.js"
        />
      </div>

      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-700" // 다크 모드 스타일 추가
        />
        <label htmlFor="published" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          바로 게시하기
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? '저장 중...' : '게시물 저장'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}