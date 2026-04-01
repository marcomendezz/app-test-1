'use client';

import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker, type Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: Matcher | Matcher[];
  placeholder?: string;
}

export function DatePicker({ value, onChange, disabled, placeholder = 'Pick a date' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? format(value, 'PPP') : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 bottom-full mb-2 right-0 rounded-xl border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            disabled={disabled}
            modifiersClassNames={{
              selected: 'bg-[#37352F] text-white font-medium hover:bg-[#2A2B2E] rounded-md',
              today: 'font-bold text-[#37352F]',
              disabled: 'opacity-40 text-[#91918E]'
            }}
            styles={{
              caption: { color: '#37352F', fontWeight: 600 },
              head_cell: { color: '#91918E', fontWeight: 500 },
              cell: { padding: '2px' },
              day: { borderRadius: '6px', color: '#91918E', fontWeight: '500' },
              nav_button_previous: { color: '#91918E', fill: '#91918E' },
              nav_button_next: { color: '#91918E', fill: '#91918E' }
            }}
          />
        </div>
      )}
    </div>
  );
}
