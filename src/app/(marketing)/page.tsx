import { LandingHero } from '@/components/marketing/LandingHero';
import { Pricing } from '@/components/marketing/Pricing';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { TweetCard } from '@/components/ui/tweet-card';

export default function LandingPage() {
  return (
    <div className="w-full">
      <LandingHero />
      
      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#37352F] mb-4">Everything you need, nothing you don&apos;t</h2>
            <p className="text-[#91918E] text-lg font-medium">Say goodbye to messy email threads and confusing spreadsheets. Welcome to clarity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kanban Workflow',
                desc: 'Drag & drop orders through stages like Pending, In Progress, and Review effortlessly.',
              },
              {
                title: 'Monochrome Aesthetic',
                desc: 'A distraction-free, hyper-minimalist interface inspired by modern productivity tools.',
              },
              {
                title: 'Real-time Tracking',
                desc: 'Know exactly when your content will arrive with precise due dates and instant status updates.',
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#FAFAFA] border border-black/5 hover:border-black/10 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center mb-6 text-xl font-bold">0{i+1}</div>
                <h3 className="text-xl font-bold text-[#37352F] mb-3">{feature.title}</h3>
                <p className="text-[#91918E] font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-[#FAFAFA] border-y border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#37352F] mb-16">Metrics that matter</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
            <div className="flex flex-col items-center space-y-4">
              <AnimatedCircularProgressBar max={100} min={0} value={98} gaugePrimaryColor="#37352F" />
              <p className="text-[#91918E] font-medium text-lg">On-Time Delivery</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <AnimatedCircularProgressBar max={100} min={0} value={95} gaugePrimaryColor="#37352F" />
              <p className="text-[#91918E] font-medium text-lg">Client Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#37352F] mb-4">Loved by creators & agencies</h2>
            <p className="text-[#91918E] text-lg font-medium">Don&apos;t just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TweetCard 
              authorName="Sarah Jenkins" 
              authorUsername="sjenkins" 
              content="QuantumCraft completely changed how our agency orders content. The notion-like kanban is a massive time saver. 10/10." 
              authorImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
            />
            <TweetCard 
              authorName="David Chen" 
              authorUsername="davidchen_dev" 
              content="The cleanest UI I've seen for a client dashboard in a long time. No clutter, just the features I actually use." 
              authorImage="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
            />
            <TweetCard 
              authorName="Emily Ross" 
              authorUsername="em_ross_marketing" 
              content="Their dark mode and localization setup is absolutely flawless. I love sending my Spanish-speaking clients to this portal." 
              authorImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <Pricing />
    </div>
  );
}
