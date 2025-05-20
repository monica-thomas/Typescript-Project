import React from 'react';

interface FormFeedbackProps {
  children: React.ReactNode;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ children }) => {
  if (!children) return null;
  
  return (
    <div className="mt-1 text-sm text-red-600">
      {children}
    </div>
  );
};

export default FormFeedback;