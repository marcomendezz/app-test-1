'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useOrders } from '@/context/OrdersContext';
import { useProfile } from '@/context/ProfileContext';
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants';
import { Modal } from '@/components/ui/Modal';
import { OrderDetail } from '@/components/orders/OrderDetail';
import { NewOrderForm } from '@/components/orders/NewOrderForm';
import { OverviewChart } from '@/components/dashboard/OverviewChart';
import { useLanguage } from '@/context/LanguageContext';
import { Order } from '@/types';

export default function DashboardOverview() {
  const { orders } = useOrders();
  const { profile } = useProfile();
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const activeOrders = orders.filter((o) => o.status === 'in_progress' || o.status === 'review');
  const draftOrders = orders.filter((o) => o.status === 'pending');
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">{t('nav.dashboard')}</h1>
          <p className="text-sm text-[#91918E] mt-1">{t('overview.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">{t('nav.settings')}</Link>
          </Button>
          <Button onClick={() => setIsNewOrderOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('orders.new_order')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-[#91918E] uppercase font-semibold">{t('overview.active_orders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#37352F]">{activeOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-[#91918E] uppercase font-semibold">{t('overview.draft_orders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#37352F]">{draftOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-[#91918E] uppercase font-semibold">{t('overview.total_words')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#37352F]">
              {orders.reduce((sum, order) => sum + (order.status === 'completed' ? order.word_count : 0), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-[#91918E] uppercase font-semibold">{t('overview.plan_limit')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#37352F] capitalize">{profile.plan}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <OverviewChart orders={orders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] tracking-wide uppercase font-semibold text-[#91918E]">{t('overview.recent_orders')}</h2>
          </div>
          <div className="grid gap-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} onClick={() => setSelectedOrder(order)} className="block group cursor-pointer">
                <Card className="p-4 flex items-center justify-between hover:bg-white/90 transition-colors shadow-sm group-hover:shadow-md cursor-pointer border-white/80">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-semibold text-[#37352F]">{order.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#91918E] font-medium tracking-wide">
                      <span className="uppercase">{order.content_type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{order.word_count} words</span>
                      <span>•</span>
                      <span>{format(new Date(order.due_date), 'MMM d')}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md ${STATUS_COLORS[order.status]} bg-opacity-10 border border-current`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </Card>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="p-10 text-center border-2 border-dashed border-white/60 bg-white/30 backdrop-blur-md rounded-2xl text-sm font-medium text-[#91918E]">
                No orders yet.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{t('overview.recent_activity')}</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-4 flex space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <span className="text-xs font-medium text-[#37352F]">#</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#37352F]">
                        Order <span className="font-semibold">&quot;{order.title}&quot;</span> was created.
                      </p>
                      <p className="text-xs text-[#91918E] mt-1">{format(new Date(order.created_at || new Date()), 'MMM d, yyyy h:mm a')}</p>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="p-4 text-sm text-[#91918E] text-center">No recent activity.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Summary">
        {selectedOrder && <OrderDetail id={selectedOrder.id} isModal={true} />}
      </Modal>

      <Modal isOpen={isNewOrderOpen} onClose={() => setIsNewOrderOpen(false)} title="Create New Order">
        {isNewOrderOpen && <NewOrderForm onClose={() => setIsNewOrderOpen(false)} />}
      </Modal>
    </div>
  );
}
