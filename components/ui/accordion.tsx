'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type AccordionContextValue = {
  value: string[];
  onItemClick: (itemValue: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
}

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

export function Accordion({
  children,
  type = 'single',
  defaultValue = [],
  value: controlledValue,
  onValueChange,
  className,
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );

  const handleItemClick = React.useCallback(
    (itemValue: string) => {
      if (type === 'single') {
        handleValueChange(value.includes(itemValue) ? [] : [itemValue]);
      } else {
        handleValueChange(
          value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue]
        );
      }
    },
    [type, value, handleValueChange]
  );

  return (
    <AccordionContext.Provider value={{ value, onItemClick: handleItemClick }}>
      <div className={cn('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AccordionItem({ children, value, className, style }: AccordionItemProps) {
  const { value: accordionValue } = useAccordion();
  const isOpen = accordionValue.includes(value);

  return (
    <div
      className={cn('group', className)}
      style={style}
      data-state={isOpen ? 'open' : 'closed'}
      data-value={value}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { onItemClick } = useAccordion();
  const itemElement = React.useContext(AccordionItemContext);

  if (!itemElement) {
    throw new Error('AccordionTrigger must be used within AccordionItem');
  }

  const handleClick = () => {
    onItemClick(itemElement.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onItemClick(itemElement.value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={itemElement.isOpen}
      className={cn(
        'w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl',
        className
      )}
    >
      {children}
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const itemElement = React.useContext(AccordionItemContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);

  if (!itemElement) {
    throw new Error('AccordionContent must be used within AccordionItem');
  }

  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use borderBoxSize for more accurate measurements
        const newHeight = entry.target.scrollHeight;
        setHeight(newHeight);
      }
    });

    resizeObserver.observe(element);

    // Set initial height
    setHeight(element.scrollHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn('overflow-hidden transition-all duration-300 ease-out', className)}
      style={{
        height: itemElement.isOpen ? `${height}px` : '0px',
        opacity: itemElement.isOpen ? 1 : 0,
      }}
      aria-hidden={!itemElement.isOpen}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
} | null>(null);

// Enhanced AccordionItem that provides context to children
export function AccordionItemWithContext({ children, value, className, style }: AccordionItemProps) {
  const { value: accordionValue } = useAccordion();
  const isOpen = accordionValue.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={cn('group', className)}
        style={style}
        data-state={isOpen ? 'open' : 'closed'}
        data-value={value}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// Export with better naming
export { AccordionItemWithContext as Item };
export { AccordionTrigger as Trigger };
export { AccordionContent as Content };
