import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$499',
      interval: '/mo',
      desc: 'Perfect for small teams needing consistent, high-quality content.',
      features: ['Up to 10,000 words per month', 'Access to Syncro Board', 'Standard 5-day delivery', 'Email support'],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$999',
      interval: '/mo',
      desc: 'For growing businesses scaling their content strategy.',
      features: ['Up to 30,000 words per month', 'Priority Urgent delivery', 'Dedicated account manager', 'SEO optimization included', 'Monthly strategy call'],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      interval: '',
      desc: 'High-volume production for agencies and large organizations.',
      features: ['Unlimited word count', 'White-labeled dashboard', 'Custom integrations', '24/7 priority support', 'Dedicated writing team'],
      buttonText: 'Contact Sales',
      popular: false,
    }
  ];

  return (
    <section className="py-24 bg-[#F9F9F8] border-t border-black/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#37352F] mb-4">Simple, transparent pricing</h2>
          <p className="text-[#91918E] text-lg font-medium">Invest in content that grows your business. No hidden fees or complex contracts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 mt-12 items-center">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-3xl p-8 bg-white border ${tier.popular ? 'border-[#37352F] shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-105 z-10 py-12' : 'border-black/5 shadow-sm'} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <span className="bg-[#37352F] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">Most Popular</span>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-[#37352F] mb-2">{tier.name}</h3>
              <p className="text-[#91918E] text-sm font-medium mb-6 h-10">{tier.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#37352F] tracking-tight">{tier.price}</span>
                <span className="text-[#91918E] font-medium">{tier.interval}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#37352F] shrink-0" />
                    <span className="text-sm font-medium text-[#505050]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild size="lg" variant={tier.popular ? 'primary' : 'outline'} className="w-full rounded-2xl h-12 shadow-none">
                <Link href={tier.popular ? '/signup' : '/login'}>{tier.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
