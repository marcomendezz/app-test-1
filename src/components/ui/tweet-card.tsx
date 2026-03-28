import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

export function TweetCard({
  authorName,
  authorUsername,
  authorImage,
  content,
  className
}: {
  authorName: string;
  authorUsername: string;
  authorImage?: string;
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center space-x-3 mb-3">
        <Avatar 
          className="h-10 w-10" 
          src={authorImage || `https://api.dicebear.com/7.x/notionists/svg?seed=${authorUsername}`}
          fallback={authorName[0]} 
        />
        <div>
          <p className="font-semibold text-sm text-gray-900 leading-tight">{authorName}</p>
          <p className="text-sm text-gray-500">@{authorUsername}</p>
        </div>
      </div>
      <p className="text-gray-800 text-sm mb-4 leading-relaxed">{content}</p>
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex items-center space-x-1.5 hover:text-blue-500 cursor-pointer transition-colors"><MessageCircle className="h-4 w-4" /><span className="text-xs">24</span></div>
        <div className="flex items-center space-x-1.5 hover:text-green-500 cursor-pointer transition-colors"><Repeat2 className="h-4 w-4" /><span className="text-xs">12</span></div>
        <div className="flex items-center space-x-1.5 hover:text-red-500 cursor-pointer transition-colors"><Heart className="h-4 w-4" /><span className="text-xs">148</span></div>
        <div className="flex items-center space-x-1.5 hover:text-blue-500 cursor-pointer transition-colors"><Share className="h-4 w-4" /></div>
      </div>
    </div>
  );
}
