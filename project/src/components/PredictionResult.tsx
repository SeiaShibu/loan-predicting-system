import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { PredictionResponse } from '../types/loan';

interface PredictionResultProps {
  prediction: PredictionResponse;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, onReset }) => {
  const { approved, confidence, factors, riskLevel } = prediction;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFactorIcon = (impact: string) => {
    switch (impact) {
      case 'Positive': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'Negative': return <TrendingDown className="h-5 w-5 text-red-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getFactorColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'border-green-200 bg-green-50';
      case 'Negative': return 'border-red-200 bg-red-50';
      default: return 'border-yellow-200 bg-yellow-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Result Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {approved ? (
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            ) : (
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Loan {approved ? 'Approved' : 'Rejected'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            {approved 
              ? 'Congratulations! Your loan application has been approved.'
              : 'Unfortunately, your loan application has been rejected.'
            }
          </p>
          
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{confidence}%</div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
            
            <div className="text-center">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Factors Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Decision Factors</h3>
        
        <div className="space-y-4">
          {factors.map((factor, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getFactorColor(factor.impact)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start space-x-3">
                {getFactorIcon(factor.impact)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{factor.factor}</h4>
                  <p className="text-gray-700 text-sm">{factor.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  factor.impact === 'Positive' 
                    ? 'bg-green-200 text-green-800' 
                    : factor.impact === 'Negative'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {factor.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {approved ? 'Next Steps' : 'Recommendations'}
        </h3>
        
        <div className="space-y-4">
          {approved ? (
            <>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Contact Our Loan Officer</h4>
                  <p className="text-blue-700 text-sm">Schedule an appointment to finalize your loan terms and documentation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Prepare Documentation</h4>
                  <p className="text-blue-700 text-sm">Gather required documents including income proof, property papers, and identity verification.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Improve Credit Score</h4>
                  <p className="text-yellow-700 text-sm">Work on improving your credit history by paying bills on time and reducing existing debt.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Increase Income or Add Co-applicant</h4>
                  <p className="text-yellow-700 text-sm">Consider increasing your income or adding a co-applicant to strengthen your application.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Reduce Loan Amount</h4>
                  <p className="text-yellow-700 text-sm">Consider applying for a smaller loan amount that better matches your income capacity.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <RotateCcw className="h-5 w-5" />
          <span>New Application</span>
        </button>
      </div>
    </div>
  );
};