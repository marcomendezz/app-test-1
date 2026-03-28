import { Profile, Order, OrderUpdate } from '@/types';

const now = new Date();
const subtractDays = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const addDays = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

export const mockProfile: Profile = {
  id: 'user-1',
  email: 'jane@quantumcraftlabs.com',
  full_name: 'Jane Cooper',
  company: 'QuantumCraft Labs',
  avatar_url: 'https://i.pravatar.cc/150?u=jane',
  plan: 'pro',
  notify_email: true,
  notify_browser: true,
  created_at: subtractDays(30),
  updated_at: subtractDays(2),
};

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    client_id: 'user-1',
    title: 'Financial Services Summit Blog',
    content_type: 'blog_post',
    word_count: 1200,
    status: 'in_progress',
    priority: 'Normal',
    brief: 'Draft a recap blog post about our recent demo at the Financial Services Summit.\n\nTarget Audience: B2B decision-makers.\nTone: Professional but approachable.',
    due_date: addDays(5),
    created_at: subtractDays(2),
    updated_at: subtractDays(1),
  }
];

export const mockOrderUpdates: OrderUpdate[] = [
  {
    id: 'upd-1',
    order_id: 'ord-1',
    message: 'Brief reviewed and outline created. Proceeding to first draft.',
    status_snapshot: 'in_progress',
    created_by: 'system',
    created_at: subtractDays(1),
  }
];
