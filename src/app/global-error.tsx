'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 bg-[#f9fafb]">
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
          <p className="text-gray-500 max-w-md text-center">{error.message || 'An unexpected error occurred.'}</p>
          <Button onClick={() => reset()} className="mt-4 bg-black text-white px-6">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
