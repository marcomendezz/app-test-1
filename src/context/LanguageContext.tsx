'use client';

import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.orders': 'Orders',
    'nav.settings': 'Settings',
    'nav.billing': 'Billing',
    'nav.inbox': 'Inbox',
    'nav.caught_up': "You're all caught up.",
    
    // Overview
    'overview.title': 'Welcome back',
    'overview.subtitle': 'Overview of your workspace.',
    'overview.total_words': 'Words Written',
    'overview.active_orders': 'Active Orders',
    'overview.draft_orders': 'Draft Orders',
    'overview.plan_limit': 'Plan Limit',
    'overview.completed': 'Completed',
    'overview.pending_review': 'Pending Review',
    'overview.recent_activity': 'Recent Activity',
    'overview.recent_orders': 'Recent Orders',
    'overview.view_all': 'View All',
    'overview.production_overview': 'Production Overview',
    'overview.words_produced': 'Words produced by month',
    
    // Orders / Kanban
    'orders.title': 'Orders',
    'orders.subtitle': 'Track and manage your content production.',
    'orders.search': 'Search orders...',
    'orders.results': 'Results',
    'orders.no_results': 'No results found for',
    'orders.new_order': 'New Order',
    'orders.create_task': 'Create task',
    'orders.col.pending': 'Pending',
    'orders.col.in_progress': 'In Progress',
    'orders.col.review': 'Review',
    'orders.col.completed': 'Completed',
    'orders.words': 'words',
    
    // New Order Form
    'new_order.title': 'Project Title',
    'new_order.content_type': 'Content Type',
    'new_order.priority': 'Priority',
    'new_order.status': 'Status',
    'new_order.word_count': 'Word Count',
    'new_order.brief': 'Content Brief',
    'new_order.due_date': 'Due Date',
    'new_order.cancel': 'Cancel',
    'new_order.submit': 'Submit Order',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account and profile settings.',
    'settings.profile_setup': 'Profile Setup',
    'settings.profile_desc': 'This information will be displayed publicly or used for notifications.',
    'settings.change_avatar': 'Change Avatar',
    'settings.full_name': 'Full Name',
    'settings.email': 'Email Address',
    'settings.company': 'Company Name',
    'settings.notifications': 'Notifications',
    'settings.notify_email': 'Email Notifications',
    'settings.notify_email_desc': 'Receive an email when your order status changes.',
    'settings.notify_browser': 'Browser Notifications',
    'settings.notify_browser_desc': 'Receive browser notifications for new messages.',
    'settings.save_changes': 'Save Changes',
    'settings.appearance': 'Appearance',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    
    // Order Detail
    'detail.content_brief': 'Content Brief',
    'detail.timeline': 'Timeline',
    'detail.details': 'Details',
    'detail.no_updates': 'No updates yet.',
    
    // Misc
    'priority.Normal': 'Normal',
    'priority.Important': 'Important',
    'priority.Urgent': 'Urgent',
  },
  es: {
    // Sidebar
    'nav.dashboard': 'Panel',
    'nav.orders': 'Órdenes',
    'nav.settings': 'Ajustes',
    'nav.billing': 'Facturación',
    'nav.inbox': 'Bandeja',
    'nav.caught_up': "Estás al día.",
    
    // Overview
    'overview.title': 'Bienvenido de nuevo',
    'overview.subtitle': 'Resumen de tu espacio de trabajo.',
    'overview.total_words': 'Palabras Escritas',
    'overview.active_orders': 'Órdenes Activas',
    'overview.draft_orders': 'Borradores',
    'overview.plan_limit': 'Límite del Plan',
    'overview.completed': 'Completadas',
    'overview.pending_review': 'Pendientes de Revisión',
    'overview.recent_activity': 'Actividad Reciente',
    'overview.recent_orders': 'Órdenes Recientes',
    'overview.view_all': 'Ver Todo',
    'overview.production_overview': 'Resumen de Producción',
    'overview.words_produced': 'Palabras producidas por mes',
    
    // Orders / Kanban
    'orders.title': 'Órdenes',
    'orders.subtitle': 'Rastrea y gestiona la producción de tu contenido.',
    'orders.search': 'Buscar órdenes...',
    'orders.results': 'Resultados',
    'orders.no_results': 'No se encontraron resultados para',
    'orders.new_order': 'Nueva Orden',
    'orders.create_task': 'Crear tarea',
    'orders.col.pending': 'Pendiente',
    'orders.col.in_progress': 'En Progreso',
    'orders.col.review': 'Revisión',
    'orders.col.completed': 'Completado',
    'orders.words': 'palabras',
    
    // New Order Form
    'new_order.title': 'Título del Proyecto',
    'new_order.content_type': 'Tipo de Contenido',
    'new_order.priority': 'Prioridad',
    'new_order.status': 'Estado',
    'new_order.word_count': 'Cantidad de Palabras',
    'new_order.brief': 'Resumen del Contenido',
    'new_order.due_date': 'Fecha de Entrega',
    'new_order.cancel': 'Cancelar',
    'new_order.submit': 'Enviar Orden',
    
    // Settings
    'settings.title': 'Ajustes',
    'settings.subtitle': 'Gestiona tu cuenta y ajustes de perfil.',
    'settings.profile_setup': 'Configuración de Perfil',
    'settings.profile_desc': 'Esta información se mostrará públicamente o se usará para notificaciones.',
    'settings.change_avatar': 'Cambiar Avatar',
    'settings.full_name': 'Nombre Completo',
    'settings.email': 'Correo Electrónico',
    'settings.company': 'Nombre de Empresa',
    'settings.notifications': 'Notificaciones',
    'settings.notify_email': 'Notificaciones por Correo',
    'settings.notify_email_desc': 'Recibe un correo cuando cambie el estado de tu orden.',
    'settings.notify_browser': 'Notificaciones del Navegador',
    'settings.notify_browser_desc': 'Recibe notificaciones en tu navegador por mensajes nuevos.',
    'settings.save_changes': 'Guardar Cambios',
    'settings.appearance': 'Apariencia',
    'settings.theme': 'Tema',
    'settings.language': 'Idioma',
    
    // Order Detail
    'detail.content_brief': 'Resumen del Contenido',
    'detail.timeline': 'Línea del Tiempo',
    'detail.details': 'Detalles',
    'detail.no_updates': 'Sin actualizaciones.',
    
    // Misc
    'priority.Normal': 'Normal',
    'priority.Important': 'Importante',
    'priority.Urgent': 'Urgente',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'es') return saved;
  if (navigator.language.startsWith('es')) return 'es';
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
