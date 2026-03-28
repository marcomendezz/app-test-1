import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ConfirmedEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 mt-4 shadow-[0_0_40px_rgba(34,197,94,0.15)] ring-1 ring-green-100">
        <CheckCircle className="h-10 w-10 text-green-500" strokeWidth={2} />
      </div>
      
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#37352F]">Email Confirmed!</h1>
        <p className="text-[#91918E] max-w-sm mx-auto font-medium">
          Your email has been successfully verified. You can now access your client dashboard and start requesting content.
        </p>
      </div>

      <div className="pt-6 w-full max-w-sm">
        <Link 
          href="/login"
          className="flex w-full items-center justify-center rounded-xl bg-[#37352F] hover:bg-black p-4 text-sm font-semibold text-white transition-all shadow-md mt-4"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
