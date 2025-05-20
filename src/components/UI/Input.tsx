import React from 'react';

interface InputProps {
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  className?: string;
  required?: boolean;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  invalid = false,
  className = '',
  required = false,
  autoComplete
}) => {
  
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200';
  const validClass = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  const invalidClass = 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50';
  
  const inputClasses = `${baseClasses} ${invalid ? invalidClass : validClass} ${className}`;
  
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={inputClasses}
      required={required}
      autoComplete={autoComplete}
    />
  );
};

export default Input;