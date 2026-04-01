'use client';

import { createContext, useContext, useState, useRef, ReactNode } from 'react';
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
  const prevInitialRef = useRef(initialOrders);

  // Sync from server without useEffect (React recommended pattern)
  if (initialOrders !== prevInitialRef.current) {
    prevInitialRef.current = initialOrders;
    setOrders(initialOrders);
  }

  const addOrder = async (orderData: Omit<Order, 'id' | 'client_id' | 'created_at' | 'updated_at'>) => {
    try {
      // Create in DB
      const newOrder = await createDbOrder(orderData);
      // Update local state
      setOrders((prev) => [newOrder, ...prev]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error('Failed to create order', error);
      alert('Failed to create order');
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const snapshot = [...orders];
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status, updated_at: new Date().toISOString() } : order
      )
    );
    try {
      await updateDbStatus(id, status);
    } catch {
      setOrders(snapshot);
      if (process.env.NODE_ENV === 'development') console.error('Failed to update status — rolled back');
    }
  };

  const updateOrderDetails = async (id: string, updates: Partial<Order>) => {
    const snapshot = [...orders];
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, ...updates, updated_at: new Date().toISOString() } : order
      )
    );
    try {
      const { updateOrderDetails: updateDbDetails } = await import('@/app/actions/orders');
      await updateDbDetails(id, updates);
    } catch {
      setOrders(snapshot);
      if (process.env.NODE_ENV === 'development') console.error('Failed to update details — rolled back');
    }
  };

  const deleteOrder = async (id: string) => {
    const snapshot = [...orders];
    setOrders((prev) => prev.filter((order) => order.id !== id));
    try {
      await deleteDbOrder(id);
    } catch {
      setOrders(snapshot);
      if (process.env.NODE_ENV === 'development') console.error('Failed to delete — rolled back');
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
