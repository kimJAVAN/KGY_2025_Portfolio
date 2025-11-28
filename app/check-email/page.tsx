// app/check-email/page.tsx
const CheckEmailPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"> {/* 다크 모드 배경색 추가 */}
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md text-center dark:bg-gray-800 dark:text-white"> {/* 다크 모드 배경색, 텍스트 색상 추가 */}
        <h1 className="text-2xl font-bold mb-4">이메일을 확인해주세요!</h1>
        <p className="text-gray-700 dark:text-gray-300"> {/* 다크 모드 텍스트 색상 추가 */}
          회원가입을 완료하려면 이메일로 전송된 확인 링크를 클릭해주세요.
        </p>
        <p className="text-gray-700 mt-2 dark:text-gray-300"> {/* 다크 모드 텍스트 색상 추가 */}
          이메일이 오지 않았다면 스팸함을 확인하거나 잠시 후 다시 시도해주세요.
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
