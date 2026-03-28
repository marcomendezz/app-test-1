import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative items-center">
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center text-sm font-medium text-[#91918E] hover:text-[#37352F] transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="w-full sm:max-w-md z-10">
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-[1px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="bg-white absolute inset-[1px] rounded-xl z-0" />
          <div className="relative z-10 px-4 py-8 sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
