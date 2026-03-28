'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus } from '@/types';
import { createOrder as createDbOrder, updateOrderStatus as updateDbStatus, deleteOrder as deleteDbOrder } from '@/app/actions/orders';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'client_id' | 'created_at' | 'updated_at'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderDetails: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children, initialOrders = [] }: { children: ReactNode, initialOrders?: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const addOrder = async (orderData: Omit<Order, 'id' | 'client_id' | 'created_at' | 'updated_at'>) => {
    try {
      // Create in DB
      const newOrder = await createDbOrder(orderData);
      // Update local state
      setOrders((prev) => [newOrder, ...prev]);
    } catch (error) {
      console.error('Failed to create order', error);
      alert('Failed to create order');
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status, updated_at: new Date().toISOString() } : order
      )
    );
    try {
      await updateDbStatus(id, status);
    } catch (error) {
      console.error('Failed to update status', error);
      // Revert could be handled here if needed
    }
  };

  const updateOrderDetails = async (id: string, updates: Partial<Order>) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, ...updates, updated_at: new Date().toISOString() } : order
      )
    );
    try {
      const { updateOrderDetails: updateDbDetails } = await import('@/app/actions/orders');
      await updateDbDetails(id, updates);
    } catch (error) {
      console.error('Failed to update details', error);
    }
  };

  const deleteOrder = async (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    try {
      await deleteDbOrder(id);
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, updateOrderDetails, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
