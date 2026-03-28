import { OrderStatus } from '@/types';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  review: 'In Review',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  review: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Orders', href: '/dashboard/orders', icon: 'ShoppingCart' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  { label: 'Billing', href: '/dashboard/billing', icon: 'CreditCard' },
];

export const PLAN_LIMITS = {
  free: { words: 5000, max_orders: 2 },
  starter: { words: 20000, max_orders: 10 },
  pro: { words: 100000, max_orders: 50 },
  enterprise: { words: -1, max_orders: -1 }, 
};
