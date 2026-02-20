
import { ButtonHTMLAttributes } from 'react';
import React from 'react';

// 1. Define the exact variations this button is allowed to have
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '', // Allow slight external positioning, but strictly control the core
  children,
  ...props
}: ButtonProps) {

  // 2. Lock the base styling that all buttons share
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // 3. Lock the specific variants
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500", // Will map to brand.DEFAULT later
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent hover:bg-white/10 text-current",
  };

  // 4. Lock the sizing
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "h-9 w-9",
  };

  // 5. Combine them cleanly
  const finalClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
}
