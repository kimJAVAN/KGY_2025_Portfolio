// app/blog/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useBlogStore } from '@/store/blogStore';
import PostCard from '@/components/blog/PostCard';

export default function BlogPage() {
  const { posts, loading, fetchPosts } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link
          href="/blog/write"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          글 쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}