'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { login } from '@/app/actions/auth';
import { ArrowLeft } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Login</h1>
        <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your account.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">{error}</div>}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</label>
            <Input id="email" name="email" type="email" placeholder="Enter your email" required className="h-11 rounded-xl border-gray-200 shadow-sm" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-gray-900">Password</label>
              <a href="#" className="text-xs text-black/50 hover:text-black font-medium transition-colors">Forgot password?</a>
            </div>
            <Input id="password" name="password" type="password" placeholder="Enter your password" required className="h-11 rounded-xl border-gray-200 shadow-sm" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 space-x-4">
          <Button variant="outline" asChild className="w-full rounded-xl h-11 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50">
            <Link href="/signup">Register</Link>
          </Button>
          <Button type="submit" disabled={isPending} className="w-full rounded-xl h-11 bg-black hover:bg-gray-900 text-white font-semibold shadow-sm">
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}
