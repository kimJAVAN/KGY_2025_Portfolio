// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-5xl font-bold">
          안녕하세요 👋
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            저는 개발자입니다
          </span>
        </h1>
        
        <p className="mb-8 max-w-2xl text-xl text-gray-600">
          Next.js, TypeScript, React를 활용한 웹 개발을 하고 있습니다.
          <br />
          기술 블로그와 프로젝트를 공유합니다.
        </p>
        
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-gray-300 px-6 py-3 hover:bg-gray-100"
          >
            소개
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-8 text-3xl font-bold text-center">기술 스택</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Zustand', 'Zod', 'Firebase'].map((tech) => (
            <div key={tech} className="rounded-lg border bg-white p-6 text-center hover:shadow-md transition-shadow">
              <p className="font-semibold">{tech}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}