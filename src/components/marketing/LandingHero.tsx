import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TextAnimate } from '@/components/ui/text-animate';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { SparklesCore } from '@/components/ui/sparkles';

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none opacity-50">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#37352f"
        />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-gray-100/50 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-black/10 bg-black/5 text-xs font-medium text-[#37352F] mb-4 tracking-wide hover:bg-black/10 transition-colors cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-black/40 mr-2"></span>
          Now live with Supabase Integration
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <TextAnimate text="Your content pipeline," className="text-5xl md:text-7xl font-bold text-[#37352F] tracking-tighter leading-[1.1]" />
          <TextAnimate text="beautifully streamlined." className="text-5xl md:text-7xl font-bold text-black/40 tracking-tighter leading-[1.1]" />
        </div>
        
        <p className="text-lg md:text-xl text-[#91918E] max-w-2xl mx-auto leading-relaxed font-medium mt-6">
          A minimalist, Notion-inspired client portal to request, track, and manage all your content production without the clutter.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/signup">
            <RainbowButton className="w-full sm:w-auto text-base h-[52px]">
              Start your project
              <ArrowRight className="ml-2 h-4 w-4 inline-block group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
          </Link>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-8 h-[52px] text-base w-full sm:w-auto bg-white/50 backdrop-blur-sm border-black/10 hover:bg-black/5">
            <Link href="/login">Sign in to portal</Link>
          </Button>
        </div>
      </div>
      
      {/* Mockup Dashboard Image / Glassmorphism Preview */}
      <div className="max-w-5xl mx-auto px-6 mt-20 md:mt-32">
        <div className="relative rounded-2xl md:rounded-[40px] border border-black/5 bg-white/40 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-4 md:p-8 aspect-video overflow-hidden group">
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
           <div className="w-full h-full rounded-xl md:rounded-2xl border border-black/5 bg-[#F9F9F8] shadow-inner overflow-hidden flex flex-col">
             {/* Fake App Header */}
             <div className="h-12 border-b border-black/5 bg-white flex items-center px-4 gap-2">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-black/10" />
                 <div className="w-3 h-3 rounded-full bg-black/10" />
                 <div className="w-3 h-3 rounded-full bg-black/10" />
               </div>
               <div className="flex-1 mx-4 h-6 bg-black/5 rounded-md max-w-sm" />
             </div>
             {/* Fake App Body */}
             <div className="flex-1 flex p-4 gap-4">
               <div className="w-48 hidden md:flex flex-col gap-2">
                 <div className="w-full h-8 bg-black/5 rounded-md" />
                 <div className="w-3/4 h-8 bg-black/5 rounded-md" />
                 <div className="w-5/6 h-8 bg-black/5 rounded-md" />
               </div>
               <div className="flex-1 rounded-xl bg-white border border-black/5 shadow-sm p-4 flex gap-4">
                 <div className="flex-1 h-full bg-black/5 rounded-lg" />
                 <div className="flex-1 h-full bg-black/5 rounded-lg" />
                 <div className="flex-1 h-full bg-black/5 rounded-lg" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
