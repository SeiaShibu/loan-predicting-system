import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoanForm } from './components/LoanForm';
import { PredictionResult } from './components/PredictionResult';
import { Statistics } from './components/Statistics';
import { Footer } from './components/Footer';
import { LoanApplication, PredictionResponse } from './types/loan';

function App() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoanSubmit = async (application: LoanApplication) => {
    setIsLoading(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction logic based on the provided model insights
    const mockPrediction = generateMockPrediction(application);
    setPrediction(mockPrediction);
    setIsLoading(false);
  };

  const generateMockPrediction = (app: LoanApplication): PredictionResponse => {
    // Simple scoring algorithm based on common loan approval factors
    let score = 0.5; // Base score
    
    // Income factors
    const totalIncome = app.applicantIncome + app.coapplicantIncome;
    if (totalIncome > 10000) score += 0.2;
    else if (totalIncome > 5000) score += 0.1;
    else if (totalIncome < 2000) score -= 0.2;
    
    // Credit history
    if (app.creditHistory === 1) score += 0.25;
    else score -= 0.3;
    
    // Education
    if (app.education === 'Graduate') score += 0.1;
    
    // Loan amount vs income ratio
    const loanToIncomeRatio = app.loanAmount / totalIncome;
    if (loanToIncomeRatio > 10) score -= 0.2;
    else if (loanToIncomeRatio < 3) score += 0.1;
    
    // Property area
    if (app.propertyArea === 'Urban') score += 0.05;
    else if (app.propertyArea === 'Semiurban') score += 0.02;
    
    // Marriage status
    if (app.married === 'Yes') score += 0.05;
    
    const approved = score > 0.6;
    const confidence = Math.min(Math.max(Math.abs(score - 0.5) * 2, 0.6), 0.95);
    
    return {
      approved,
      confidence: Math.round(confidence * 100),
      factors: generateFactors(app, approved),
      riskLevel: approved ? (confidence > 0.8 ? 'Low' : 'Medium') : 'High'
    };
  };

  const generateFactors = (app: LoanApplication, approved: boolean) => {
    const factors = [];
    
    if (app.creditHistory === 1) {
      factors.push({
        factor: 'Credit History',
        impact: 'Positive',
        description: 'Good credit history significantly improves approval chances'
      });
    } else {
      factors.push({
        factor: 'Credit History',
        impact: 'Negative',
        description: 'Poor credit history reduces approval probability'
      });
    }
    
    const totalIncome = app.applicantIncome + app.coapplicantIncome;
    if (totalIncome > 8000) {
      factors.push({
        factor: 'Total Income',
        impact: 'Positive',
        description: 'High combined income supports loan repayment capacity'
      });
    } else if (totalIncome < 3000) {
      factors.push({
        factor: 'Total Income',
        impact: 'Negative',
        description: 'Low income may affect repayment ability'
      });
    }
    
    if (app.education === 'Graduate') {
      factors.push({
        factor: 'Education Level',
        impact: 'Positive',
        description: 'Graduate education indicates stable career prospects'
      });
    }
    
    const loanToIncomeRatio = app.loanAmount / totalIncome;
    if (loanToIncomeRatio > 8) {
      factors.push({
        factor: 'Loan-to-Income Ratio',
        impact: 'Negative',
        description: 'High loan amount relative to income increases risk'
      });
    } else if (loanToIncomeRatio < 4) {
      factors.push({
        factor: 'Loan-to-Income Ratio',
        impact: 'Positive',
        description: 'Reasonable loan amount relative to income'
      });
    }
    
    return factors;
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!prediction ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Smart Loan Approval System
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get instant loan approval predictions powered by advanced machine learning. 
                  Our AI analyzes multiple factors to provide accurate assessments.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <LoanForm onSubmit={handleLoanSubmit} isLoading={isLoading} />
                </div>
                <div className="lg:col-span-1">
                  <Statistics />
                </div>
              </div>
            </>
          ) : (
            <PredictionResult 
              prediction={prediction} 
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;