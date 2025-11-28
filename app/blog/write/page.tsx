'use client'; // 클라이언트 컴포넌트로 변경 (useAuthStore 사용을 위해)

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/blog/PostForm';
import { useAuthStore } from '@/store/authStore'; // useAuthStore 임포트

export default function WritePage() {
  const { user, loading, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !user) { // 초기화되었지만 사용자가 없으면 로그인 페이지로 리다이렉트
      router.push('/signin');
    }
  }, [user, initialized, router]);

  if (loading || !initialized || !user) { // 로딩 중이거나 초기화 전이거나 사용자가 없으면 로딩 표시
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 dark:text-gray-300">권한 확인 중...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">글 쓰기</h1> {/* 다크 모드 텍스트 색상 추가 */}
      <PostForm />
    </div>
  );
}