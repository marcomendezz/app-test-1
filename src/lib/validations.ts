import { z } from 'zod';

export const newOrderSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content_type: z.enum(['blog_post', 'article', 'social_media', 'email', 'landing_page', 'product_description', 'other']),
  word_count: z.number().min(100, 'Minimum word count is 100'),
  brief: z.string().min(10, 'Please provide more details in the brief'),
  due_date: z.string().refine((date) => {
    // Treat any time today as valid, even if it's "earlier" than right now.
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, {
    message: 'Due date cannot be in the past',
  }),
  priority: z.enum(['Normal', 'Important', 'Urgent']),
  status: z.enum(['pending', 'in_progress', 'review', 'completed']),
});

export type NewOrderInput = z.infer<typeof newOrderSchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  notify_email: z.boolean(),
  notify_browser: z.boolean(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
