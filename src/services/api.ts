import { Lead, FinancialProduct, AdminUser, AnalyticsData } from '../types';

const TOKEN_KEY = 'vn247_admin_token';
const USER_KEY = 'vn247_admin_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AdminUser | null {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    try {
      return JSON.parse(user);
    } catch {}
  }
  return null;
}

export function saveSession(token: string, user: AdminUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Authentication API
export async function loginWithPin(pin: string): Promise<{ success: boolean; message?: string; user?: AdminUser; token?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pin', pin })
    });
    const data = await res.json();
    if (data.success && data.token) {
      saveSession(data.token, data.user);
      return { success: true, user: data.user, token: data.token };
    }
    return { success: false, message: data.message || 'Mã PIN không đúng' };
  } catch (err) {
    // Fallback verification if backend is offline in preview
    if (pin.trim() === '6991') {
      const mockUser: AdminUser = {
        username: 'admin',
        displayName: 'Phạm Đức Hải (Quản Trị Viên)',
        role: 'super_admin'
      };
      saveSession('local_token_6991', mockUser);
      return { success: true, user: mockUser, token: 'local_token_6991' };
    }
    return { success: false, message: 'Lỗi kết nối máy chủ' };
  }
}

export async function loginWithCredentials(username: string, password: string): Promise<{ success: boolean; message?: string; user?: AdminUser; token?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'account', username, password })
    });
    const data = await res.json();
    if (data.success && data.token) {
      saveSession(data.token, data.user);
      return { success: true, user: data.user, token: data.token };
    }
    return { success: false, message: data.message || 'Tài khoản hoặc mật khẩu không đúng' };
  } catch (err) {
    if (username.trim() === 'admin' && password.trim() === 'duchai168') {
      const mockUser: AdminUser = {
        username: 'admin',
        displayName: 'Phạm Đức Hải (Quản Trị Viên)',
        role: 'super_admin'
      };
      saveSession('local_token_admin', mockUser);
      return { success: true, user: mockUser, token: 'local_token_admin' };
    }
    return { success: false, message: 'Lỗi kết nối máy chủ' };
  }
}

export async function verifyCurrentSession(): Promise<AdminUser | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data.authenticated && data.user) {
        return data.user;
      }
    }
  } catch {}

  // Fallback to stored user
  return getStoredUser();
}

export async function logoutAdmin(): Promise<void> {
  const token = getStoredToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {}
  }
  clearSession();
}

// Leads API
export async function fetchLeads(params?: { search?: string; status?: string; category?: string; sortBy?: string }): Promise<{ leads: Lead[]; summary?: any }> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('status', params.status);
  if (params?.category) query.append('category', params.category);
  if (params?.sortBy) query.append('sortBy', params.sortBy);

  try {
    const res = await fetch(`/api/leads?${query.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { leads: json.data, summary: json.summary };
      }
    }
  } catch {}

  // Fallback from localStorage
  const local = localStorage.getItem('vaynhanh247_leads_v1');
  if (local) {
    try {
      const parsed: Lead[] = JSON.parse(local);
      return { leads: parsed };
    } catch {}
  }

  return { leads: [] };
}

export async function updateLeadStatusAndNotes(id: string, updates: Partial<Lead>): Promise<boolean> {
  try {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) return true;
  } catch {}

  // Fallback update in local storage
  const local = localStorage.getItem('vaynhanh247_leads_v1');
  if (local) {
    try {
      const parsed: Lead[] = JSON.parse(local);
      const idx = parsed.findIndex(l => l.id === id);
      if (idx !== -1) {
        parsed[idx] = { ...parsed[idx], ...updates };
        localStorage.setItem('vaynhanh247_leads_v1', JSON.stringify(parsed));
        return true;
      }
    } catch {}
  }

  return false;
}

export async function addLeadActivity(id: string, type: 'call' | 'zalo' | 'system' | 'status_change', note: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/leads/${id}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, note })
    });
    if (res.ok) return true;
  } catch {}
  return false;
}

export async function deleteLeadById(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (res.ok) return true;
  } catch {}

  const local = localStorage.getItem('vaynhanh247_leads_v1');
  if (local) {
    try {
      let parsed: Lead[] = JSON.parse(local);
      parsed = parsed.filter(l => l.id !== id);
      localStorage.setItem('vaynhanh247_leads_v1', JSON.stringify(parsed));
      return true;
    } catch {}
  }
  return false;
}

export async function batchUpdateLeads(ids: string[], status: string): Promise<boolean> {
  try {
    const res = await fetch('/api/leads/batch-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status })
    });
    if (res.ok) return true;
  } catch {}
  return false;
}

export async function batchDeleteLeads(ids: string[]): Promise<boolean> {
  try {
    const res = await fetch('/api/leads/batch-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    if (res.ok) return true;
  } catch {}
  return false;
}

export async function fetchAnalytics(): Promise<AnalyticsData | null> {
  try {
    const res = await fetch('/api/analytics');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {}
  return null;
}
