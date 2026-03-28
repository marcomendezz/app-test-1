import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          {
            'bg-[#37352F] text-white hover:bg-[#2A2B2E] shadow-sm font-medium': variant === 'primary',
            'bg-black/5 text-[#37352F] hover:bg-black/10': variant === 'secondary',
            'hover:bg-black/5 text-[#37352F]': variant === 'ghost',
            'bg-[#EB5757] text-white hover:bg-[#D94E4E] shadow-sm': variant === 'destructive',
            'border border-[#EFEFEF] bg-white hover:bg-black/5 text-[#37352F] shadow-[0_1px_2px_rgb(0,0,0,0.02)]': variant === 'outline',
            'h-7 px-3 text-xs': size === 'sm',
            'h-8 px-4 text-[14px]': size === 'md',
            'h-10 px-6 text-[15px]': size === 'lg',
            'h-8 w-8': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
