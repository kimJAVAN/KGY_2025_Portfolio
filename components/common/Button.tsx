// components/common/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90', // 다크 모드 스타일 추가
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-100', // 다크 모드 스타일 추가
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600', // 다크 모드 스타일 추가
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-gray-800 dark:hover:text-gray-50', // 다크 모드 스타일 추가
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-white', // 다크 모드 스타일 추가
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // asChild prop 추가
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'button';
    const combinedClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(props.children)) {
      return React.cloneElement(props.children, {
        className: cn(props.children.props.className, combinedClassName),
        ref,
      });
    }

    return (
      <Comp
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
