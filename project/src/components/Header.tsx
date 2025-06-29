import React from 'react';
import { TrendingUp, Shield, Award } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LoanPredict AI</h1>
              <p className="text-sm text-gray-600">Smart Loan Decisions</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="h-4 w-4 text-blue-600" />
              <span>95% Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};