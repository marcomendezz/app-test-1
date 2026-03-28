'use server';

import { createClient } from '@/lib/supabase/server';
import { Order, OrderStatus } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return data as Order[];
}

export async function createOrder(orderData: Omit<Order, 'id' | 'client_id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        ...orderData,
        client_id: user.id,
      }
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard/orders');
  return data as Order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard/orders');
}

export async function updateOrderDetails(id: string, updates: Partial<Order>) {
  const supabase = await createClient();

  // Strip id and created_at if they exist in updates
  const { id: _, created_at, ...safeUpdates } = updates as any;

  const { error } = await supabase
    .from('orders')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard/orders');
  revalidatePath('/dashboard');
}

export async function deleteOrder(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard/orders');
}
