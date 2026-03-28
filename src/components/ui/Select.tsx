import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  renderTrigger?: (selectedOption: SelectOption | undefined) => React.ReactNode;
}

export function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '', renderTrigger }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

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
    <div className={`relative ${className}`} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {renderTrigger ? (
          renderTrigger(selectedOption)
        ) : (
          <div className="flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
            <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[150px] rounded-lg border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 py-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
            >
              <span className={option.value === value ? 'font-medium text-gray-900' : ''}>{option.label}</span>
              {option.value === value && <Check className="h-4 w-4 text-gray-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
