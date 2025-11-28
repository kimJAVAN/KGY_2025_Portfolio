// app/page.tsx
import HeroSection from '@/components/home/HeroSection'; // HeroSection 임포트
import TechStackSection from '@/components/home/TechStackSection'; // TechStackSection 임포트

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <HeroSection /> {/* HeroSection 사용 */}
      <TechStackSection /> {/* TechStackSection 사용 */}
    </div>
  );
}