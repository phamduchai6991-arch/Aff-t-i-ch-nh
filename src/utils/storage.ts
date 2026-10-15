import { FinancialProduct, Lead } from '../types';
import { INITIAL_PRODUCTS } from '../data/financialProducts';

const STORAGE_KEY_LEADS = 'vaynhanh247_leads_v1';
const STORAGE_KEY_PRODUCTS = 'vaynhanh247_products_v1';

// Format currency VND
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format short date
export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

// Load products
export async function getProducts(): Promise<FinancialProduct[]> {
  // Check local overrides first
  const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  return INITIAL_PRODUCTS;
}

// Save product update (e.g. customized affiliate link)
export function saveCustomProduct(product: FinancialProduct) {
  const current = getLocalProducts();
  const index = current.findIndex(p => p.id === product.id);
  if (index !== -1) {
    current[index] = product;
  } else {
    current.push(product);
  }
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(current));
  return current;
}

// Helper synchronous getter
export function getLocalProducts(): FinancialProduct[] {
  const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_PRODUCTS;
}

// Load leads from API with fallback to localStorage
export async function getLeads(): Promise<Lead[]> {
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // sync to local storage for offline backup
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch {
    // API not reachable or client-only
  }

  // Fallback to localStorage
  const stored = localStorage.getItem(STORAGE_KEY_LEADS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return [];
}

// Submit a new lead
export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'affiliateClicked'>): Promise<Lead> {
  let createdLead: Lead | null = null;

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        createdLead = json.data;
      }
    }
  } catch (e) {
    console.warn('Backend API unavailable, saving to browser storage:', e);
  }

  if (!createdLead) {
    createdLead = {
      ...leadData,
      id: `LEAD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      affiliateClicked: false
    };
  }

  // Update local storage
  const localLeads = getLocalLeads();
  localLeads.unshift(createdLead);
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(localLeads));

  return createdLead;
}

// Get local leads
export function getLocalLeads(): Lead[] {
  const stored = localStorage.getItem(STORAGE_KEY_LEADS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return [];
}

// Update Lead status or notes
export async function updateLead(id: string, updates: Partial<Lead>): Promise<boolean> {
  try {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch (e) {
    console.warn('API error updating lead:', e);
  }

  const localLeads = getLocalLeads();
  const idx = localLeads.findIndex(l => l.id === id);
  if (idx !== -1) {
    localLeads[idx] = { ...localLeads[idx], ...updates };
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(localLeads));
    return true;
  }
  return false;
}

// Delete Lead
export async function deleteLead(id: string): Promise<boolean> {
  try {
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
  } catch {}

  let localLeads = getLocalLeads();
  localLeads = localLeads.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(localLeads));
  return true;
}

// Track click on affiliate button
export function recordAffiliateClick(productId: string) {
  const products = getLocalProducts();
  const prod = products.find(p => p.id === productId);
  if (prod) {
    prod.clicksCount = (prod.clicksCount || 0) + 1;
    saveCustomProduct(prod);
  }
}

// Export leads to CSV file
export function exportLeadsToCsv(leads: Lead[]) {
  const headers = [
    'Mã hồ sơ',
    'Họ và tên',
    'Số điện thoại',
    'Email',
    'Khu vực',
    'Gói quan tâm',
    'Hình thức',
    'Số tiền / Hạn mức',
    'Thu nhập hàng tháng',
    'Hình thức công việc',
    'Tình trạng CIC',
    'Trạng thái chăm sóc',
    'Ghi chú telesale',
    'Thời gian đăng ký'
  ];

  const statusMap: Record<string, string> = {
    new: 'Mới đăng ký',
    contacted: 'Đang liên hệ',
    appointment: 'Hẹn gọi lại',
    disbursed: 'Đã giải ngân / Đã mở thẻ',
    rejected: 'Không đủ điều kiện'
  };

  const cicMap: Record<string, string> = {
    none: 'Không nợ xấu (Chuẩn)',
    cic_low: 'Từng chậm nhẹ (Nhóm 1-2)',
    cic_bad: 'Nợ xấu (Nhóm 3+)',
    unknown: 'Chưa rõ'
  };

  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.phoneNumber}"`,
    `"${l.email || ''}"`,
    `"${l.province}"`,
    `"${l.productName.replace(/"/g, '""')}"`,
    `"${l.productCategory === 'loan' ? 'Vay tín chấp' : 'Thẻ tín dụng'}"`,
    `"${l.loanAmount}"`,
    `"${l.monthlyIncome}"`,
    `"${l.employmentType}"`,
    `"${cicMap[l.hasBadDebt] || l.hasBadDebt}"`,
    `"${statusMap[l.status] || l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${formatDateTime(l.createdAt)}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `danh_sach_khach_hang_vay_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
