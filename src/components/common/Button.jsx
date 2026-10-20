/**
 * @file Button.jsx
 * @description Componente de botón estandarizado para NexoSQL.
 * Aplica el sistema estricto de 3 niveles de jerarquía visual (Primary, Secondary, Ghost)
 * más la variante Destructive/Danger para acciones críticas.
 */

import React from 'react';

export function Button({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full-width' : '';

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={iconSize} className="btn-icon" />}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && <Icon size={iconSize} className="btn-icon" />}
    </button>
  );
}

export default Button;
