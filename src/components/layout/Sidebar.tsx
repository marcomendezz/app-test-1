'use client';

import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';
import { LayoutDashboard, ShoppingCart, Settings, CreditCard, Bell, ChevronDown, Command, LogOut } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/app/actions/auth';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  CreditCard,
};

export function Sidebar() {
  const { profile } = useProfile();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications] = useState(false);

  return (
    <aside className="w-[260px] flex-shrink-0 flex flex-col h-screen text-[14px] text-[#37352F]">
      
      {/* Logo Area */}
      <Link href="/dashboard" className="px-6 py-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full border border-[#37352F] flex items-center justify-center shrink-0">
          <Command className="w-4 h-4 text-[#37352F]" />
        </div>
        <span className="font-semibold text-base tracking-wide uppercase">QuantumCraft</span>
      </Link>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <nav className="flex flex-col space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-black/5 font-medium text-black' 
                    : 'text-[#505050] hover:bg-black/5 border border-transparent hover:border-black/5'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-black' : 'text-[#91918E]'}`} />
                <span>{item.label === 'Dashboard' ? t('nav.dashboard') : item.label === 'Orders' ? t('nav.orders') : item.label === 'Settings' ? t('nav.settings') : item.label === 'Billing' ? t('nav.billing') : item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Notifications */}
      <div className="p-4 mt-auto border-t border-black/5 relative">
        <div className="flex items-center gap-1 px-2 py-2 rounded-xl hover:bg-black/5 text-[#37352F] transition-all group">
          <Link href="/dashboard/settings" className="w-8 h-8 rounded-full border border-black/10 overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar_url || 'https://i.pravatar.cc/150'} alt="Avatar" className="w-full h-full object-cover" />
          </Link>
          
          <div className="flex-1" />
          
          <button 
            className="p-1.5 hover:bg-black/10 rounded-md transition-colors relative"
            onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); }}
          >
            <Bell className="h-4 w-4 text-[#91918E] hover:text-[#37352F]" />
            {hasNotifications && <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>}
          </button>
          
          <form action={logout}>
            <button type="submit" className="p-1.5 hover:bg-black/10 rounded-md transition-colors flex items-center justify-center">
              <LogOut className="h-4 w-4 text-[#91918E] hover:text-[#37352F]" />
            </button>
          </form>
        </div>

        {showNotifications && (
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowNotifications(false)} />
            <div className="absolute bottom-4 left-full ml-4 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.1)] border border-white/60 z-50 overflow-hidden">
              <div className="p-3 border-b border-black/5 flex items-center justify-between">
                <span className="text-sm font-semibold">{t('nav.inbox')}</span>
              </div>
              <div className="p-8 text-center text-[#91918E] text-sm font-medium">
                {t('nav.caught_up')}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
