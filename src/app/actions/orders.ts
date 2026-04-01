'use server';

import { createClient } from '@/lib/supabase/server';
import { Order, OrderStatus } from '@/types';
import { revalidatePath } from 'next/cache';
import { newOrderSchema } from '@/lib/validations';
import { z } from 'zod';

const orderStatusSchema = z.enum(['pending', 'in_progress', 'review', 'completed', 'cancelled']);

export async function getOrders() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Failed to load orders');

  return data as Order[];
}

export async function createOrder(orderData: Omit<Order, 'id' | 'client_id' | 'created_at' | 'updated_at'>) {
  // Server-side validation using existing Zod schema
  const validated = newOrderSchema.parse(orderData);

  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        ...validated,
        client_id: user.id,
      }
    ])
    .select()
    .single();

  if (error) throw new Error('Failed to create order');

  revalidatePath('/dashboard/orders');
  return data as Order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  // Validate status is a known enum value
  const validatedStatus = orderStatusSchema.parse(status);

  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('orders')
    .update({ status: validatedStatus, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('client_id', user.id);

  if (error) throw new Error('Failed to update order status');

  revalidatePath('/dashboard/orders');
}

export async function updateOrderDetails(id: string, updates: Partial<Order>) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  // Strip id, created_at, and client_id to prevent ownership transfer
  const { id: _id, created_at: _created_at, client_id: _client_id, ...safeUpdates } = updates as Partial<Order> & Record<string, unknown>;

  const { error } = await supabase
    .from('orders')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('client_id', user.id);

  if (error) throw new Error('Failed to update order');

  revalidatePath('/dashboard/orders');
  revalidatePath('/dashboard');
}

export async function deleteOrder(id: string) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .eq('client_id', user.id);

  if (error) throw new Error('Failed to delete order');

  revalidatePath('/dashboard/orders');
}
