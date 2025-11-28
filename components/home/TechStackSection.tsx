// components/home/TechStackSection.tsx
export default function TechStackSection() {
  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-center">기술 스택</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Zustand', 'Zod', 'Firebase'].map((tech) => (
          <div key={tech} className="rounded-lg border bg-white p-6 text-center hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"> {/* 다크 모드 스타일 추가 */}
            <p className="font-semibold text-gray-900 dark:text-white">{tech}</p> {/* 다크 모드 텍스트 색상 추가 */}
          </div>
        ))}
      </div>
    </section>
  );
}