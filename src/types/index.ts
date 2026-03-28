export type OrderStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type ContentType = 'blog_post' | 'article' | 'social_media' | 'email' | 'landing_page' | 'product_description' | 'other';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  company?: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  notify_email: boolean;
  notify_browser: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  client_id: string;
  title: string;
  content_type: ContentType;
  word_count: number;
  status: OrderStatus;
  priority: 'Normal' | 'Important' | 'Urgent';
  brief: string;
  due_date: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderUpdate {
  id: string;
  order_id: string;
  message: string;
  status_snapshot: OrderStatus;
  created_by: string;
  created_at: string;
}
