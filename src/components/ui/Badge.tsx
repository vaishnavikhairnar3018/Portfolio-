import { forwardRef, type HTMLAttributes } from 'react';
import './Badge.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'muted' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, children, className = '', ...props }, ref) => {
    const classNames = [
      'badge',
      `badge-${variant}`,
      `badge-${size}`,
      dot && 'badge-dot',
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {dot && <span className="badge-dot-indicator" aria-hidden="true" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';