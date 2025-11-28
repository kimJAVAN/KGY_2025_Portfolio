// components/home/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function HeroSection() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-5xl font-bold">
        안녕하세요 👋
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          저는 개발자입니다
        </span>
      </h1>
      
      <p className="mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300"> {/* 다크 모드 텍스트 색상 추가 */}
        Next.js, TypeScript, React를 활용한 웹 개발을 하고 있습니다.
        <br />
        기술 블로그와 프로젝트를 공유합니다.
      </p>
      
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/blog">블로그 보기</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/about">소개</Link>
        </Button>
      </div>
    </section>
  );
}