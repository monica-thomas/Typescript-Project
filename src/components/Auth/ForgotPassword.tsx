// src/components/Auth/ForgotPassword.tsx

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MoveLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Add backend API call for password reset
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-500 flex items-center mb-4 hover:text-green-600 transition"
        >
          <MoveLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-sm text-gray-500">Enter your email to reset your password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          >
            Reset Password
          </button>

          {submitted && (
            <div className="text-green-600 text-sm text-center mt-2">
              If this email exists, a reset link has been sent.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
