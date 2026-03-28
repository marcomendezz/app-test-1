'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500">View recent updates and alerts about your account.</p>
      </div>

      <div className="grid gap-4 max-w-2xl">
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
              <Bell className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
              <p className="text-sm text-gray-500 mt-1">You don&apos;t have any new notifications right now.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
