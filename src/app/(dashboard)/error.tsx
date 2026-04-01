'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center p-8 text-center">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#37352F] mb-2">Failed to load content</h2>
      <p className="text-[#91918E] max-w-md mb-8">
        We encountered an error while loading your dashboard data. Please try again or contact support if the issue persists.
      </p>
      <Button onClick={() => reset()} className="bg-black text-white hover:bg-black/80">
        Try again
      </Button>
    </div>
  );
}
