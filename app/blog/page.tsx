// app/blog/page.tsx
import Link from 'next/link';
import PostList from '@/components/blog/PostList';
import { Button } from '@/components/common/Button';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">블로그</h1>
        <Button asChild>
          <Link href="/blog/write">새 글 작성</Link>
        </Button>
      </div>
      <PostList />
    </div>
  );
}