// components/blog/PostDetail.tsx
import Image from 'next/image'; // next/image 임포트
import type { Post } from '@/types/blog';

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const date = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-3xl mx-auto">
      {post.coverImage && (
        <div className="mb-8 h-96 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"> 
          <Image // img 태그 대신 Image 컴포넌트 사용
            src={post.coverImage} 
            alt={post.title}
            fill // 부모 div에 맞춰 채우기
            sizes="100vw" // 반응형 사이즈
            className="object-cover"
          />
        </div>
      )}
      
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white"> 
        {post.title}
      </h1>
      
      <div className="mb-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"> 
        <time dateTime={post.createdAt}>{date}</time>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Render the main content with prose styling */}
      <div 
        className="prose prose-slate max-w-none prose-lg prose-p:text-gray-700 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-p:text-gray-300 dark:prose-headings:text-white dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300" // 다크 모드 스타일 추가
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
      />
    </article>
  );
}
