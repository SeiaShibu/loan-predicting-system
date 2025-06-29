import React, { useState } from 'react';
import { Send, User, DollarSign, Home, GraduationCap } from 'lucide-react';
import { LoanApplication } from '../types/loan';

interface LoanFormProps {
  onSubmit: (application: LoanApplication) => void;
  isLoading: boolean;
}

export const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LoanApplication>({
    gender: 'Male',
    married: 'No',
    dependents: '0',
    education: 'Graduate',
    selfEmployed: 'No',
    applicantIncome: 0,
    coapplicantIncome: 0,
    loanAmount: 0,
    loanAmountTerm: 360,
    creditHistory: 1,
    propertyArea: 'Urban'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof LoanApplication, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Application</h2>
          <p className="text-gray-600">Fill in your details for instant prediction</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              <select
                value={formData.married}
                onChange={(e) => handleInputChange('married', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="No">Single</option>
                <option value="Yes">Married</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
              <select
                value={formData.dependents}
                onChange={(e) => handleInputChange('dependents', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Self Employed</label>
              <select
                value={formData.selfEmployed}
                onChange={(e) => handleInputChange('selfEmployed', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Education & Credit */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Education & Credit
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
              <select
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit History</label>
              <select
                value={formData.creditHistory}
                onChange={(e) => handleInputChange('creditHistory', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value={1}>Good (No defaults)</option>
                <option value={0}>Poor (Previous defaults)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
            Financial Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Income (Monthly)</label>
              <input
                type="number"
                value={formData.applicantIncome || ''}
                onChange={(e) => handleInputChange('applicantIncome', parseInt(e.target.value) || 0)}
                placeholder="Enter monthly income"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coapplicant Income (Monthly)</label>
              <input
                type="number"
                value={formData.coapplicantIncome || ''}
                onChange={(e) => handleInputChange('coapplicantIncome', parseInt(e.target.value) || 0)}
                placeholder="Enter coapplicant income"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
              <input
                type="number"
                value={formData.loanAmount || ''}
                onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value) || 0)}
                placeholder="Enter loan amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Months)</label>
              <select
                value={formData.loanAmountTerm}
                onChange={(e) => handleInputChange('loanAmountTerm', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value={120}>10 years (120 months)</option>
                <option value={180}>15 years (180 months)</option>
                <option value={240}>20 years (240 months)</option>
                <option value={300}>25 years (300 months)</option>
                <option value={360}>30 years (360 months)</option>
                <option value={480}>40 years (480 months)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-600" />
            Property Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Area</label>
            <select
              value={formData.propertyArea}
              onChange={(e) => handleInputChange('propertyArea', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Urban">Urban</option>
              <option value="Semiurban">Semi-urban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Application...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Get Loan Prediction</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};