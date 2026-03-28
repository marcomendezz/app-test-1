import { Button } from '@/components/ui/Button';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center py-8">
      <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center shrink-0 mb-2">
        <Mail className="w-8 h-8 text-[#37352F]" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">Check your email</h1>
        <p className="text-sm text-[#91918E] max-w-sm mx-auto leading-relaxed">
          We&apos;ve sent a verification link to your email address. Please click the link to activate your account and continue to your dashboard.
        </p>
      </div>

      <div className="pt-4 w-full">
        <Button className="w-full" asChild variant="outline">
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
      
      <p className="text-xs text-[#91918E] mt-8">
        Did not receive the email? Check your spam folder or try signing up again.
      </p>
    </div>
  );
}
