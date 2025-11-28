// components/blog/PostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogStore } from '@/store/blogStore';
import { postSchema } from '@/schemas/blog';
import type { PostFormData } from '@/schemas/blog';

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

    try {
      const validated = postSchema.parse(formData);
      await createPost(validated);
      router.push('/blog');
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          제목 *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2">
          URL 슬러그 * (예: my-first-post)
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={formData.slug}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          요약
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={2}
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          내용 *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={12}
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
          커버 이미지 URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="text"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          태그 (쉼표로 구분)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags?.join(', ')}
          onChange={handleTagsChange}
          placeholder="React, TypeScript, Next.js"
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="published" className="ml-2 text-sm">
          바로 게시하기
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '저장 중...' : '저장'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border px-6 py-2 hover:bg-gray-100"
        >
          취소
        </button>
      </div>
    </form>
  );
}