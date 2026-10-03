import { forwardRef, type ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
  }, ref) => {
    const classNames = [
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      fullWidth && 'btn-full',
      loading && 'btn-loading',
      disabled && 'btn-disabled',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className="btn-spinner" aria-hidden="true" />}
        {!loading && iconLeft && <span className="btn-icon btn-icon-left" aria-hidden="true">{iconLeft}</span>}
        <span className="btn-text">{children}</span>
        {!loading && iconRight && <span className="btn-icon btn-icon-right" aria-hidden="true">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';