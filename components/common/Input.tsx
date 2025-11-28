// components/common/Input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>; // interface 대신 type 사용

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:focus-visible:ring-gray-600', // 다크 모드 스타일 추가
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
