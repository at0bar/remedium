import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'gold' | 'neutral' | 'red';
export type ButtonSize = 'sm' | 'md';

export function Button({
  variant = 'neutral',
  size = 'md',
  iconOnly = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; iconOnly?: boolean }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}${iconOnly ? ' btn-icon' : ''}${className ? ` ${className}` : ''}`}
      {...rest}
    />
  );
}
