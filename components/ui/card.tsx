import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = true, children, ...props }, ref) => {
    const baseClasses = 'bg-background rounded-[0.75rem] shadow-md p-6';
    const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
