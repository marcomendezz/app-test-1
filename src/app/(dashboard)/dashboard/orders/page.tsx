'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { STATUS_LABELS } from '@/lib/constants';
import { useOrders } from '@/context/OrdersContext';
import { Modal } from '@/components/ui/Modal';
import { NewOrderForm } from '@/components/orders/NewOrderForm';
import { useLanguage } from '@/context/LanguageContext';
import { OrderStatus } from '@/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useRouter } from 'next/navigation';

const COLUMNS: OrderStatus[] = ['pending', 'in_progress', 'review', 'completed'];

export default function OrdersPage() {
  const router = useRouter();
  const { orders, updateOrderStatus } = useOrders();
  const { t } = useLanguage();
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredOrders = orders.filter((o) => {
    return o.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newStatus = destination.droppableId as OrderStatus;
    updateOrderStatus(draggableId, newStatus);
  };

  return (
    <div className="flex flex-col h-full bg-transparent -mx-4 md:-mx-8 px-4 md:px-8 mt-2 pb-8">
      {/* Top Search & Create Bar mapping the screenshot structure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 shrink-0 mb-6 bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="relative w-full flex-1 mr-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#91918E]" />
          <Input 
            placeholder={t('orders.search')}
            className="pl-11 h-10 w-full text-sm bg-white/60 backdrop-blur-lg border-white/40 shadow-sm rounded-xl placeholder:text-[#91918E] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          
          {/* Autocomplete Dropdown */}
          {isSearchFocused && searchQuery && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden z-[100] max-h-80 overflow-y-auto">
              {filteredOrders.length > 0 ? (
                <div className="py-2">
                  <div className="px-3 pb-2 pt-1 text-xs font-semibold text-[#91918E] uppercase tracking-wider">{t('orders.results')}</div>
                  {filteredOrders.map(order => (
                    <div 
                      key={order.id}
                      onClick={() => router.push('/dashboard/orders/' + order.id)}
                      className="px-4 py-3 hover:bg-black/5 cursor-pointer border-b border-black/5 last:border-0 transition-colors"
                    >
                      <h4 className="text-sm font-semibold text-[#37352F]">{order.title}</h4>
                      <div className="flex items-center gap-2 mt-1 -">
                        <span className="text-[11px] font-medium text-[#91918E] uppercase">{STATUS_LABELS[order.status]}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20"></span>
                        <span className="text-[11px] font-medium text-[#91918E] uppercase">{order.content_type.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-[#91918E] text-center">{t('orders.no_results')} &quot;{searchQuery}&quot;</div>
              )}
            </div>
          )}
        </div>
        
        <Button onClick={() => setIsNewOrderOpen(true)} className="shrink-0 rounded-xl px-5 h-10 shadow-sm" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t('orders.create_task')}
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">{t('orders.title')}</h1>
        <p className="text-sm font-medium text-[#91918E] mt-1 tracking-wide uppercase">{format(new Date(), 'MMM d, yyyy')}</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pt-2 min-h-[500px]">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {COLUMNS.map((colId) => {
              const columnOrders = filteredOrders.filter(o => o.status === colId);
              
              return (
                <div key={colId} className="flex-shrink-0 w-[340px] flex flex-col h-full max-h-full pb-4">
                  <div className="flex items-center mb-4 px-2 tracking-wider">
                    <h3 className="text-xs font-bold text-[#505050] uppercase">
                      {STATUS_LABELS[colId]}
                    </h3>
                    <span className="ml-3 text-[#91918E] text-[11px] font-bold px-2 py-0.5 bg-white/50 backdrop-blur-md rounded-md border border-white/60">
                      {columnOrders.length}
                    </span>
                  </div>
                  
                  <Droppable droppableId={colId}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto no-scrollbar px-1 py-2 min-h-[150px] transition-colors rounded-2xl bg-transparent`}
                      >
                        {columnOrders.map((order, index) => (
                          <Draggable key={order.id} draggableId={order.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 outline-none ${snapshot.isDragging ? 'scale-[1.03] shadow-2xl z-50 ring-2 ring-[#37352F] rounded-2xl bg-white' : ''}`}
                                onClick={() => router.push('/dashboard/orders/' + order.id)}
                              >
                                <Card className={`cursor-pointer transition-all duration-200 hover:bg-white/90 p-5 group ${snapshot.isDragging ? 'border-[#37352F] ring-1 ring-[#37352F]' : ''}`}>
                                  <div className="flex flex-col gap-3">
                                    <h4 className="font-semibold text-[15px] leading-snug text-[#37352F] group-hover:text-black">{order.title}</h4>
                                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] font-bold tracking-wider uppercase text-[#91918E]">
                                      <span>{format(new Date(order.created_at || new Date()), 'MMM d')}</span>
                                      <span className="w-1 h-1 rounded-full bg-black/20 shrink-0"></span>
                                      <span>{order.content_type.replace('_', ' ')}</span>
                                      <span className="w-1 h-1 rounded-full bg-black/20 shrink-0"></span>
                                      <span>{order.word_count} {t('orders.words')}</span>
                                      {order.priority && order.priority !== 'Normal' && (
                                        <>
                                          <span className="w-1 h-1 rounded-full bg-black/20 shrink-0"></span>
                                          <span className="text-red-500">{t(`priority.${order.priority}`)}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      <Modal isOpen={isNewOrderOpen} onClose={() => setIsNewOrderOpen(false)} title={t('new_order.title')}>
        {isNewOrderOpen && <NewOrderForm onClose={() => setIsNewOrderOpen(false)} />}
      </Modal>
    </div>
  );
}
