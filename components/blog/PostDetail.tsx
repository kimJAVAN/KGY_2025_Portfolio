// components/blog/PostDetail.tsx
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
        <div className="mb-8 h-96 w-full overflow-hidden rounded-lg bg-gray-200">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {post.title}
      </h1>
      
      <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
        <time dateTime={post.createdAt}>{date}</time>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Render the main content with prose styling */}
      <div 
        className="prose prose-slate max-w-none prose-lg prose-p:text-gray-700 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
      />
    </article>
  );
}
