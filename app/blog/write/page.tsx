// app/blog/write/page.tsx
import PostForm from '@/components/blog/PostForm';

export default function WritePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">글 쓰기</h1>
      <PostForm />
    </div>
  );
}