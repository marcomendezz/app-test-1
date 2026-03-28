'use client';

import React from 'react';
import { OrdersProvider } from '@/context/OrdersContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { ToastProvider } from '@/context/ToastContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { Order, Profile } from '@/types';

export function Providers({ 
  children,
  initialOrders = [],
  initialProfile = null
}: { 
  children: React.ReactNode,
  initialOrders?: Order[],
  initialProfile?: Profile | null
}) {
  return (
    <ToastProvider>
      <ProfileProvider initialProfile={initialProfile}>
        <OrdersProvider initialOrders={initialOrders}>
          {children}
          <ToastContainer />
        </OrdersProvider>
      </ProfileProvider>
    </ToastProvider>
  );
}
