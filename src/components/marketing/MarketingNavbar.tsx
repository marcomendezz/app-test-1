import Link from 'next/link';
import { Command } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MarketingNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#37352F] flex items-center justify-center shrink-0">
            <Command className="w-4 h-4 text-[#37352F]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#37352F]">QuantumCraft</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[#505050] hover:text-[#37352F] transition-colors">
            Log in
          </Link>
          <Button asChild size="sm" className="rounded-full px-5 shadow-sm">
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
