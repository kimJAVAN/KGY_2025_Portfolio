// app/signin/page.tsx
import SignInForm from "@/components/auth/SignInForm";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
