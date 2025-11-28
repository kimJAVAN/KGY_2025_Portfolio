// components/auth/SignInForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth 임포트
import { auth } from "@/lib/firebase/firebase"; // Firebase auth 객체 임포트
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import Link from "next/link"; // 회원가입 페이지로 이동하는 링크를 위해 Link 임포트

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 후 메인 페이지 또는 이전 페이지로 리다이렉트
      router.push("/"); // 메인 페이지로 리다이렉트
    } catch (error: unknown) { // 'any' 대신 'unknown' 사용
      if (error instanceof Error) { // 타입 가드
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="********"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
          회원가입
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
