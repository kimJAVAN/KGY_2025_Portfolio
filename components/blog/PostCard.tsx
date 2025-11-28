// components/blog/PostCard.tsx
import Link from 'next/link';
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
      <article className="group cursor-pointer rounded-lg border bg-white p-6 transition-all hover:shadow-lg">
        {post.coverImage && (
          <div className="mb-4 h-48 w-full overflow-hidden rounded-md bg-gray-200">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="mb-3 text-gray-600 line-clamp-2">{post.excerpt}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={post.createdAt}>{date}</time>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
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