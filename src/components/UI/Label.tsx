import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ 
  htmlFor, 
  children, 
  className = ''
}) => {
  const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${className}`;
  
  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  );
};

export default Label;