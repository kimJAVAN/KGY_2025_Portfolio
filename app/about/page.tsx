// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <div className="prose prose-lg max-w-none">
          <p>
            안녕하세요! 저는 웹 개발에 열정을 가진 개발자입니다. 새로운 기술을 배우고 적용하는 것을 즐기며, 특히 React와 Next.js 생태계에 관심이 많습니다.
          </p>
          <p>
            이 블로그는 제가 배우고 경험한 것들을 기록하고 공유하기 위한 공간입니다. 방문해주셔서 감사합니다.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
          <ul>
            <li>
              <strong>Email:</strong> <a href="mailto:ookim7717@naver.com">ookim7717@naver.com</a>
            </li>
            <li>
              <strong>GitHub:</strong> <a href="https://github.com/kimJAVAN" target="_blank" rel="noopener noreferrer">https://github.com/kimJAVAN</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
