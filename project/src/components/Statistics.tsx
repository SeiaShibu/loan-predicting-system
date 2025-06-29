import React from 'react';
import { BarChart3, Users, TrendingUp, Award } from 'lucide-react';

export const Statistics: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      label: 'Applications Processed',
      value: '50,000+',
      description: 'Loan applications analyzed'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      label: 'Accuracy Rate',
      value: '95.2%',
      description: 'Prediction accuracy'
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      label: 'Approval Rate',
      value: '68%',
      description: 'Average approval rate'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      label: 'Processing Time',
      value: '< 2 min',
      description: 'Average prediction time'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Statistics</h3>
        
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                {stat.icon}
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3">How It Works</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="bg-white/20 rounded-full p-1 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Advanced ML algorithms analyze your application</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-white/20 rounded-full p-1 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Multiple factors are weighted and scored</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-white/20 rounded-full p-1 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Instant prediction with detailed explanation</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Key Factors</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Credit History</span>
            <span className="font-medium text-green-600">High Impact</span>
          </div>
          <div className="flex justify-between">
            <span>Income Level</span>
            <span className="font-medium text-green-600">High Impact</span>
          </div>
          <div className="flex justify-between">
            <span>Loan Amount</span>
            <span className="font-medium text-yellow-600">Medium Impact</span>
          </div>
          <div className="flex justify-between">
            <span>Education</span>
            <span className="font-medium text-yellow-600">Medium Impact</span>
          </div>
          <div className="flex justify-between">
            <span>Property Area</span>
            <span className="font-medium text-gray-500">Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};