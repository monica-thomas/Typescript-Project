import React from 'react';
// import { ShieldCheck } from 'lucide-react';

interface HeaderAuthProps {
  title: string;
}

const HeaderAuth: React.FC<HeaderAuthProps> = ({ title }) => {
  return (
    <div className="text-left mb-6">
      <div className="flex justify-center mb-2">
        {/* <ShieldCheck className="h-10 w-10 text-blue-600" /> */}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

export default HeaderAuth;