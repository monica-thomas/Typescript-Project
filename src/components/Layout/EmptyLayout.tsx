import React from 'react';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  center?: boolean;
  width?: number | string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  center = false, 
  width = 'md',
  className = '',
  ...rest 
}) => {
  const centerClass = center ? 'flex justify-center items-center' : '';
  const widthClass = typeof width === 'string' ? `max-w-${width}` : `max-w-[${width}px]`;
  
  return (
    <div 
      className={`w-full ${widthClass} space-y-8 ${centerClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const EmptyLayout: React.FC<EmptyLayoutProps> & { Section: typeof Section } = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

EmptyLayout.Section = Section;

export default EmptyLayout;