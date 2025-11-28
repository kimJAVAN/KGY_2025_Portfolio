// app/blog/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogStore } from '@/store/blogStore';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { currentPost, loading, fetchPostBySlug, deletePost } = useBlogStore();

  useEffect(() => {
    fetchPostBySlug(params.slug);
  }, [params.slug, fetchPostBySlug]);

  const handleDelete = async () => {
    if (!currentPost || !confirm('정말 삭제하시겠습니까?')) return;
    
    await deletePost(currentPost.id);
    router.push('/blog');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-500">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const date = new Date(currentPost.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      {currentPost.coverImage && (
        <div className="mb-8 h-96 w-full overflow-hidden rounded-lg">
          <img 
            src={currentPost.coverImage} 
            alt={currentPost.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{currentPost.title}</h1>
        
        <div className="flex items-center justify-between text-gray-600">
          <time dateTime={currentPost.createdAt}>{date}</time>
          
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="flex gap-2">
              {currentPost.tags.map((tag) => (
                <span 
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        {currentPost.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>

      <div className="flex gap-4 border-t pt-6">
        <button
          onClick={() => router.push(`/blog/write?edit=${currentPost.id}`)}
          className="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          삭제
        </button>
        <button
          onClick={() => router.push('/blog')}
          className="ml-auto rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          목록으로
        </button>
      </div>
    </article>
  );
}