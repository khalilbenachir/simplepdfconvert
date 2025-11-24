'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end sm:items-center justify-center',
        'animate-fade-in'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(from_var(--primary)_l_c_h/0.15),transparent_70%)] pointer-events-none" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-lg mx-4',
          'bg-background/95 backdrop-blur-2xl',
          'rounded-t-3xl sm:rounded-3xl',
          'border border-border/50',
          'shadow-2xl shadow-primary/20',
          'overflow-hidden',
          'animate-slide-up sm:animate-scale-in',
          className
        )}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

        {/* Header */}
        {title && (
          <div className="relative flex items-center justify-between px-6 py-5 border-b border-border/30">
            <h2 id="modal-title" className="text-lg font-bold text-foreground">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-foreground/60 hover:text-foreground hover:bg-accent/60 rounded-xl transition-all duration-300 hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="relative">{children}</div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// Add mobile-specific modal for full-screen experience
interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileMenuModal({ isOpen, onClose, children }: MobileMenuModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);

      setTimeout(() => {
        const firstFocusable = contentRef.current?.querySelector(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 100);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !contentRef.current) return;

      const focusableElements = contentRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        'fixed inset-0 z-50',
        'animate-fade-in'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      id="mobile-menu"
    >
      {/* Animated backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-3xl" />

      {/* Radial gradient that pulses */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(from_var(--primary)_l_c_h/0.2),transparent_60%)] pointer-events-none animate-pulse-slow" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 left-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col animate-slide-up z-10">
        {/* Header with close button */}
        <div className="relative flex items-center justify-between px-6 py-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-linear-to-br from-primary via-primary-mid to-primary/90 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="3" y="2" width="14" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                <line x1="6" y1="6" x2="14" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="10" x2="14" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="14" x2="11" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-2xl opacity-60" />
            </div>
            <span className="font-bold text-lg">
              SimplePDF<span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-mid">Convert</span>
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="relative z-10 p-3 text-foreground/70 hover:text-foreground hover:bg-accent/60 focus-visible:bg-accent/60 rounded-2xl transition-all duration-300 hover:rotate-90 focus-visible:rotate-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="relative flex-1 overflow-y-auto px-6 py-8">
          {children}
        </div>

        {/* Bottom accent */}
        <div className="relative h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>
    </div>
  );
}
