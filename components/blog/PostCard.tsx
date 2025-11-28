// components/blog/PostCard.tsx
import Link from 'next/link';
import Image from 'next/image'; // next/image 임포트
import type { Post } from '@/types/blog';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer rounded-lg border bg-white p-6 transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
        {post.coverImage && (
          <div className="mb-4 h-48 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
            <Image // img 태그 대신 Image 컴포넌트 사용
              src={post.coverImage} 
              alt={post.title}
              fill // 부모 div에 맞춰 채우기
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 반응형 사이즈
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="mb-3 text-gray-600 line-clamp-2 dark:text-gray-300">{post.excerpt}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.createdAt}>{date}</time>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}