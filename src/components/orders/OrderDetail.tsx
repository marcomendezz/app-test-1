'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockOrderUpdates } from '@/data/mock';
import { Button } from '@/components/ui/Button';
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants';
import { format } from 'date-fns';
import { useOrders } from '@/context/OrdersContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import { OrderStatus } from '@/types';
import { Textarea } from '@/components/ui/Textarea';

export function OrderDetail({ id, isModal = false }: { id: string, isModal?: boolean }) {
  const { orders } = useOrders();
  const { t } = useLanguage();
  const { addToast } = useToast();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
      </div>
    );
  }

  const updates = mockOrderUpdates.filter((u) => u.order_id === order.id);

  return (
    <div className={`space-y-6 ${isModal ? 'max-h-[80vh] overflow-y-auto pr-2' : ''}`}>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 pr-8">
            <h1 className="text-xl font-semibold tracking-tight text-[#37352F] mb-2">{order.title}</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border pointer-events-none ${STATUS_COLORS[order.status]}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('detail.content_brief')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{order.brief}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('detail.timeline')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative border-l border-gray-200 ml-3 space-y-8 mt-4">
                {updates.length === 0 ? (
                  <p className="text-sm text-gray-500 ml-6">{t('detail.no_updates')}</p>
                ) : (
                  updates.map((update) => (
                    <div key={update.id} className="relative pl-6">
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{update.message}</p>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {format(new Date(update.created_at), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Status changed to {STATUS_LABELS[update.status_snapshot]}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('detail.details')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{t('new_order.content_type')}</dt>
                <dd className="text-sm font-medium text-gray-900 capitalize">{order.content_type.replace('_', ' ')}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{t('new_order.priority')}</dt>
                <dd className={`text-sm font-medium ${order.priority === 'Urgent' ? 'text-red-600' : 'text-gray-900'} capitalize`}>
                  {t(`priority.${order.priority || 'Normal'}`)}
                </dd>
              </div>
              <hr className="border-gray-100" />
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{t('new_order.word_count')}</dt>
                <dd className="text-sm font-medium text-gray-900">{order.word_count} {t('orders.words')}</dd>
              </div>
              <hr className="border-gray-100" />
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{t('new_order.due_date')}</dt>
                <dd className="text-sm font-medium text-gray-900">{format(new Date(order.due_date), 'MMM d, yyyy')}</dd>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
