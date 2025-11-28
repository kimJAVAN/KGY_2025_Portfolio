'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // useRouter 임포트
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth'; // Firebase signOut 임포트
import { auth } from '@/lib/firebase/firebase'; // Firebase auth 객체 임포트
import { useAuthStore } from '@/store/authStore'; // authStore 임포트
import { Button } from '@/components/common/Button'; // Button 컴포넌트 임포트

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter(); // useRouter 훅 사용
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { user, loading, initialized } = useAuthStore(); // authStore 상태 가져오기

  // useEffect를 사용하여 클라이언트 사이드에서만 테마를 렌더링
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (loading || !mounted || !initialized) return null; // loading 상태도 추가

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error: unknown) { // 'any' 대신 'unknown' 사용
      if (error instanceof Error) { // 타입 가드
        console.error("로그아웃 실패:", error.message);
        alert("로그아웃에 실패했습니다: " + error.message);
      } else {
        console.error("로그아웃 실패: 알 수 없는 오류");
        alert("로그아웃에 실패했습니다: 알 수 없는 오류");
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          My Portfolio
        </Link>
        
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors hover:text-blue-600 ${
                  pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* 인증 상태에 따른 버튼 */}
          {user ? (
            <>
              {/* 사용자 정보 표시 (예: 이메일) */}
              <li className="text-gray-700 dark:text-gray-300 text-sm">
                {user.email}님
              </li>
              <li>
                <Button onClick={handleSignOut} size="sm" variant="outline">
                  로그아웃
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button asChild size="sm">
                  <Link href="/signin">로그인</Link>
                </Button>
              </li>
              <li>
                <Button asChild size="sm" variant="secondary">
                  <Link href="/signup">회원가입</Link>
                </Button>
              </li>
            </>
          )}

          {/* 다크 모드 토글 버튼 */}
          <li>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}