// components/common/Textarea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>; // interface 대신 type 사용

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:focus-visible:ring-gray-600', // 다크 모드 스타일 추가
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
