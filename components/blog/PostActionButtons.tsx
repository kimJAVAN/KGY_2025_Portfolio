// components/blog/PostActionButtons.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useBlogStore } from '@/store/blogStore';
import { Button } from '@/components/common/Button';
import type { Post } from '@/types/blog';

interface PostActionButtonsProps {
  post: Post;
}

export default function PostActionButtons({ post }: PostActionButtonsProps) {
  const router = useRouter();
  const { deletePost, loading } = useBlogStore();

  const handleDelete = async () => {
    if (!confirm('정말 이 게시물을 삭제하시겠습니까?')) return;
    
    await deletePost(post.id);
    // On successful deletion, navigate back to the blog main page
    router.push('/blog');
    router.refresh(); // Refresh the page to reflect the changes
  };

  const handleEdit = () => {
    // Navigate to the write page with an 'edit' query param
    // The PostForm would need to be updated to handle editing
    router.push(`/blog/write?edit=${post.id}`);
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-6 border-t">
      <Button variant="outline" onClick={handleEdit}>
        수정
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={loading}>
        {loading ? '삭제 중...' : '삭제'}
      </Button>
      <Button variant="secondary" className="ml-auto" onClick={() => router.push('/blog')}>
        목록으로
      </Button>
    </div>
  );
}
