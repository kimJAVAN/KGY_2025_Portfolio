// components/blog/PostList.tsx
'use client';

import { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import PostCard from './PostCard';
import Loading from '@/components/common/Loading';

export default function PostList() {
  const { posts, loading, error, fetchPosts } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading && posts.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-slate-500">게시물이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
