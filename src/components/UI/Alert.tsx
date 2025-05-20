import React from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'info';
  color: 'success' | 'danger' | 'warning' | 'info'; // Restrict 'color' to valid keys
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  color,
  children,
  className = '',
  icon
}) => {
  const colorClasses: { [key in 'success' | 'danger' | 'warning' | 'info']: string } = {
    success: 'bg-green-50 text-green-800 border-green-400',
    danger: 'bg-red-50 text-red-800 border-red-400',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-400',
    info: 'bg-blue-50 text-blue-800 border-blue-400'
  };
  
  const alertClasses = `rounded-md p-4 border-l-4 ${colorClasses[color]} ${className}`;
  
  return (
    <div className={alertClasses} role="alert">
      <div className="flex">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Alert;
