'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OrderDetail } from '@/components/orders/OrderDetail';

export default function OrderDetailPageWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  return (
    <div className="max-w-4xl space-y-8">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-3 text-gray-500">
        <Link href="/dashboard/orders">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
      </Button>

      <OrderDetail id={id} />
    </div>
  );
}
