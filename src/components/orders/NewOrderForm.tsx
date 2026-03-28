'use client';

import React from 'react';
import { CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { CustomSelect } from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newOrderSchema, NewOrderInput } from '@/lib/validations';
import { useOrders } from '@/context/OrdersContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_TYPE_OPTIONS = [
  { label: 'Blog Post', value: 'blog_post' },
  { label: 'Article', value: 'article' },
  { label: 'Social Media', value: 'social_media' },
  { label: 'Landing Page', value: 'landing_page' },
  { label: 'Email', value: 'email' },
];

const PRIORITY_OPTIONS = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Important', value: 'Important' },
  { label: 'Urgent', value: 'Urgent' },
];

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'In Review', value: 'review' },
  { label: 'Completed', value: 'completed' },
];

export function NewOrderForm({ onClose }: { onClose: () => void }) {
  const { addOrder } = useOrders();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<NewOrderInput>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      title: '',
      content_type: 'blog_post',
      priority: 'Normal',
      word_count: 500,
      brief: '',
      // Default to today
      due_date: new Date(Date.now()).toISOString().split('T')[0],
    }
  });

  const onSubmit = (data: NewOrderInput) => {
    addOrder({
      title: data.title,
      content_type: data.content_type,
      status: data.status as any,
      priority: data.priority as any,
      word_count: data.word_count,
      brief: data.brief,
      due_date: new Date(data.due_date).toISOString(),
    });
    addToast({
      title: 'Order created',
      description: 'Your new order has been submitted successfully.',
      type: 'success',
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <CardContent className="space-y-4 p-0">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">{t('new_order.title')}</label>
          <Input id="title" placeholder="e.g. Q4 Website Redesign Copy" {...register('title')} />
          {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 relative z-50">
            <label className="text-sm font-medium text-gray-700">{t('new_order.content_type')}</label>
            <Controller
              control={control}
              name="content_type"
              render={({ field }) => (
                <CustomSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={CONTENT_TYPE_OPTIONS}
                />
              )}
            />
            {errors.content_type && <p className="text-xs text-red-600">{errors.content_type.message}</p>}
          </div>

          <div className="space-y-2 relative z-40">
            <label className="text-sm font-medium text-gray-700">{t('new_order.priority')}</label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <CustomSelect
                  value={field.value || 'Normal'}
                  onChange={field.onChange}
                  options={PRIORITY_OPTIONS}
                />
              )}
            />
          </div>

          <div className="space-y-2 relative z-40">
            <label className="text-sm font-medium text-gray-700">{t('new_order.status')}</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CustomSelect
                  value={field.value || 'pending'}
                  onChange={field.onChange}
                  options={STATUS_OPTIONS}
                />
              )}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="word_count" className="text-sm font-medium text-gray-700">{t('new_order.word_count')}</label>
            <Input id="word_count" type="number" {...register('word_count', { valueAsNumber: true })} />
            {errors.word_count && <p className="text-xs text-red-600">{errors.word_count.message}</p>}
          </div>
        </div>

        <div className="space-y-2 relative z-0">
          <label htmlFor="brief" className="text-sm font-medium text-gray-700">{t('new_order.brief')}</label>
          <Textarea 
            id="brief" 
            placeholder="Provide details about the target audience, tone of voice, key takeaways, etc." 
            className="min-h-[150px]"
            {...register('brief')}
          />
          {errors.brief && <p className="text-xs text-red-600">{errors.brief.message}</p>}
        </div>

        <div className="space-y-2 relative z-50">
          <label className="text-sm font-medium text-gray-700">{t('new_order.due_date')}</label>
          <Controller
            control={control}
            name="due_date"
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date?.toISOString())}
                disabled={[{ before: new Date() }]}
                placeholder="Select due date"
              />
            )}
          />
          {errors.due_date && <p className="text-xs text-red-600">{errors.due_date.message}</p>}
        </div>
      </CardContent>
      <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
        <Button variant="ghost" type="button" onClick={onClose}>{t('new_order.cancel')}</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '...' : t('new_order.submit')}
        </Button>
      </div>
    </form>
  );
}
