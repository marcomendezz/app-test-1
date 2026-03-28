import { Sidebar } from '@/components/layout/Sidebar';
import { Providers } from '@/components/Providers';
import { getOrders } from '@/app/actions/orders';
import { getProfile } from '@/app/actions/profile';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orders, profile] = await Promise.all([
    getOrders().catch(() => []),
    getProfile().catch(() => null)
  ]);

  return (
    <Providers initialOrders={orders} initialProfile={profile}>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden text-[#37352F] relative font-sans">
        {/* Subtle Background Mesh for Glassmorphism base */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gray-200/50 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gray-300/30 blur-[150px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-gray-200/40 blur-[120px]" />
        </div>
      {/* Sidebar is fixed on desktop */}
      <div className="hidden md:flex relative z-10 bg-white/60 backdrop-blur-2xl border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <Sidebar />
      </div>
      
      {/* Mobile Header could go here */}
      
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="w-full py-8 px-6 md:px-10">
          {children}
        </div>
      </main>
    </div>
    </Providers>
  );
}
