import { MarketingNavbar } from '@/components/marketing/MarketingNavbar';
import { LandingHero } from '@/components/marketing/LandingHero';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#37352F] selection:bg-black/10 selection:text-black">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      
      <footer className="border-t border-black/5 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#37352F] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold">QC</span>
            </div>
            <span className="font-semibold text-sm tracking-wide">QuantumCraft</span>
          </div>
          <p className="text-xs font-medium text-[#91918E]">
            © {new Date().getFullYear()} QuantumCraft. All rights reserved. Building the future of content.
          </p>
        </div>
      </footer>
    </div>
  );
}
