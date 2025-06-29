export interface LoanApplication {
  gender: 'Male' | 'Female';
  married: 'Yes' | 'No';
  dependents: '0' | '1' | '2' | '3+';
  education: 'Graduate' | 'Not Graduate';
  selfEmployed: 'Yes' | 'No';
  applicantIncome: number;
  coapplicantIncome: number;
  loanAmount: number;
  loanAmountTerm: number;
  creditHistory: 0 | 1;
  propertyArea: 'Urban' | 'Semiurban' | 'Rural';
}

export interface PredictionFactor {
  factor: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  description: string;
}

export interface PredictionResponse {
  approved: boolean;
  confidence: number;
  factors: PredictionFactor[];
  riskLevel: 'Low' | 'Medium' | 'High';
}