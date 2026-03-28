'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProfile } from '@/data/mock';
import { PLAN_LIMITS } from '@/lib/constants';
import { useToast } from '@/context/ToastContext';

export default function BillingPage() {
  const plan = PLAN_LIMITS[mockProfile.plan as keyof typeof PLAN_LIMITS];
  const { addToast } = useToast();

  const handleManageSubscription = () => {
    addToast({
      title: 'Redirecting to Payment Gateway',
      description: 'In a real app, this would open Stripe Customer Portal.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">Billing & Plans</h1>
        <p className="text-sm text-[#91918E] mt-1">Manage your subscription and billing details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold tracking-tight text-gray-900 capitalize">{mockProfile.plan}</span>
            </div>
            <p className="text-sm text-gray-500">
              You are currently on the {mockProfile.plan} plan.
            </p>
            
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Words Limit</span>
                <span className="font-medium text-gray-900">{plan.words === -1 ? 'Unlimited' : plan.words.toLocaleString()} words</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleManageSubscription}>
              Manage Subscription
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-black/90 backdrop-blur-2xl text-white border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[100%] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-white z-10 relative">Upgrade to Enterprise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-sm">
              Get unlimited words, dedicated account manager, and priority 24/7 support.
            </p>
            <ul className="space-y-2 text-sm text-gray-300 mt-6">
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Unlimited word counts</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100" asChild>
              <a href="mailto:support@quantumcraft.com">Contact Sales</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
