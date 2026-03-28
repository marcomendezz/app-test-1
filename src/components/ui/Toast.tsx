import React from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export function Toast({ title, description, type = 'info' }: ToastProps) {
  return (
    <div className={cn(
      'fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg',
      {
        'bg-white border-gray-200': type === 'info',
        'bg-green-50 border-green-200 text-green-900': type === 'success',
        'bg-red-50 border-red-200 text-red-900': type === 'error',
      }
    )}>
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
    </div>
  );
}
