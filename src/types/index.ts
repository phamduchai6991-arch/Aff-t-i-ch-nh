export type ProductCategory = 'loan' | 'card';

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface FinancialProduct {
  id: string;
  name: string;
  category: ProductCategory;
  provider: string;
  providerInitial: string;
  themeColor: string;
  badgeText?: string;
  tagline: string;
  highlightBenefit: string;
  interestRate: string;
  interestRateDetail: string;
  maxLimit: string;
  tenor: string;
  approvalSpeed: string;
  disbursementTime: string;
  minIncome: string;
  ageRange: string;
  requirements: string[];
  features: string[];
  applicationSteps: ApplicationStep[];
  affiliateUrl: string;
  commissionEstimate?: string;
  clicksCount: number;
  rating: number;
  totalReviews: number;
  isPopular?: boolean;
  featuredOrder?: number;
}

export interface LeadActivity {
  id: string;
  timestamp: string;
  type: 'call' | 'zalo' | 'status_change' | 'system' | 'success' | 'batch_update';
  note: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  province: string;
  productId: string;
  productName: string;
  productCategory: ProductCategory;
  loanAmount: string;
  monthlyIncome: string;
  employmentType: string;
  hasBadDebt: 'none' | 'cic_low' | 'cic_bad' | 'unknown';
  status: 'new' | 'contacted' | 'appointment' | 'disbursed' | 'rejected';
  notes: string;
  activities?: LeadActivity[];
  createdAt: string;
  affiliateClicked: boolean;
}

export interface QuickCheckResult {
  score: number;
  qualified: boolean;
  eligibilityLevel: 'Rất cao (98%)' | 'Cao (85%)' | 'Trung bình (65%)' | 'Cần tư vấn thêm';
  recommendedProductIds: string[];
  advice: string;
}

export interface AdminUser {
  username: string;
  displayName: string;
  role: string;
  token?: string;
}

export interface AnalyticsData {
  total: number;
  disbursed: number;
  contacted: number;
  newLeads: number;
  rejected: number;
  conversionRate: string;
  loansCount: number;
  cardsCount: number;
  estimatedCommission: number;
  bankBreakdown: Record<string, number>;
}
