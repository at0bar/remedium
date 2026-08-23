import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'gold' | 'neutral' | 'red';
export type ButtonSize = 'sm' | 'md';

export function Button({
  variant = 'neutral',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}${className ? ` ${className}` : ''}`}
      {...rest}
    />
  );
}
