import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Container health check for Google Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

import { INITIAL_PRODUCTS } from './src/data/financialProducts.ts';

// Persistent data directory
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read products
function getProductsData(): any[] {
  if (fs.existsSync(PRODUCTS_FILE)) {
    try {
      const content = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
  } catch {}
  return INITIAL_PRODUCTS;
}

// Helper to save products
function saveProductsData(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving products:", e);
  }
}

// Credentials configuration as requested:
// PIN: 6991
// Account: admin / duchai168
const ADMIN_CONFIG = {
  pin: '6991',
  username: 'admin',
  password: 'duchai168',
  displayName: 'Phạm Đức Hải (Quản Trị Viên)',
  role: 'super_admin'
};

// In-memory active session tokens
const activeSessions = new Set<string>();

// Predefined mock leads if file doesn't exist
const initialLeads = [
  {
    id: "LEAD-10921",
    fullName: "Nguyễn Văn Hưng",
    phoneNumber: "0912345678",
    email: "hung.nguyen88@gmail.com",
    province: "Hà Nội",
    productId: "vpbank-fast",
    productName: "Vay Tiêu Dùng Tín Chấp VPBank Online",
    productCategory: "loan",
    loanAmount: "50.000.000 đ",
    monthlyIncome: "Từ 10 - 20 triệu / tháng",
    employmentType: "Đi làm hưởng lương (Công ty/Cơ quan)",
    hasBadDebt: "none",
    status: "contacted",
    notes: "Đã gọi lần 1 lúc 09:30. Khách hàng cần hỗ trợ thủ tục eKYC chụp ảnh CCCD. Hẹn chiều gọi lại gửi link.",
    activities: [
      { id: "act-1", timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString(), type: "call", note: "Gọi điện lần 1: Đã liên hệ, khách đang bận hẹn gọi lại chiều." },
      { id: "act-2", timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), type: "zalo", note: "Đã nhắn tin qua Zalo gửi hướng dẫn chụp ảnh CCCD 2 mặt." }
    ],
    createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    affiliateClicked: true
  },
  {
    id: "LEAD-10922",
    fullName: "Trần Thị Mai Anh",
    phoneNumber: "0987654321",
    email: "maianh.tran@gmail.com",
    province: "Hồ Chí Minh",
    productId: "vib-cashback",
    productName: "Thẻ Tín Dụng VIB Cash Back Hoàn Tiền",
    productCategory: "card",
    loanAmount: "Hạn mức 30 - 50 triệu",
    monthlyIncome: "Từ 10 - 20 triệu / tháng",
    employmentType: "Đi làm hưởng lương (Công ty/Cơ quan)",
    hasBadDebt: "none",
    status: "new",
    notes: "Khách hàng muốn mở thẻ để hoàn tiền chi tiêu Grab và siêu thị",
    activities: [
      { id: "act-3", timestamp: new Date(Date.now() - 3600 * 1000 * 1).toISOString(), type: "system", note: "Khách hàng tự đăng ký từ Landing Page." }
    ],
    createdAt: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
    affiliateClicked: true
  },
  {
    id: "LEAD-10923",
    fullName: "Lê Hoàng Long",
    phoneNumber: "0903456789",
    email: "long.le@yahoo.com",
    province: "Đà Nẵng",
    productId: "mcredit-fast",
    productName: "MCredit Vay Tiền Nhanh Tiêu Dùng",
    productCategory: "loan",
    loanAmount: "30.000.000 đ",
    monthlyIncome: "Từ 5 - 10 triệu / tháng",
    employmentType: "Kinh doanh cá thể / Hộ kinh doanh",
    hasBadDebt: "cic_low",
    status: "disbursed",
    notes: "Hồ sơ đã được MCredit duyệt thành công, giải ngân 30 triệu về tài khoản MB Bank.",
    activities: [
      { id: "act-4", timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), type: "system", note: "Khách hàng đăng ký trên web." },
      { id: "act-5", timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(), type: "call", note: "Hướng dẫn bổ sung thêm BHYT để được duyệt nhanh." },
      { id: "act-6", timestamp: new Date(Date.now() - 3600 * 1000 * 6).toISOString(), type: "success", note: "Đối soát thành công: Đã giải ngân. Hoa hồng tạm tính 350.000đ." }
    ],
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    affiliateClicked: true
  },
  {
    id: "LEAD-10924",
    fullName: "Vũ Hải Nam",
    phoneNumber: "0934112233",
    email: "hainam.vu@gmail.com",
    province: "Bình Dương",
    productId: "shinhan-finance",
    productName: "Shinhan Finance Vay Tiêu Dùng Lãi Thấp",
    productCategory: "loan",
    loanAmount: "70.000.000 đ",
    monthlyIncome: "Trên 20 triệu / tháng",
    employmentType: "Đi làm hưởng lương (Công ty/Cơ quan)",
    hasBadDebt: "none",
    status: "appointment",
    notes: "Khách hàng hẹn gọi lại sau 17h khi tan ca làm việc để tư vấn kỹ về sao kê.",
    activities: [
      { id: "act-7", timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(), type: "call", note: "Đã liên hệ, hẹn gọi lại 17h." }
    ],
    createdAt: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
    affiliateClicked: true
  }
];

// Helper to read leads
function getLeads(): any[] {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      return initialLeads;
    }
  }
  return initialLeads;
}

// Helper to save leads
function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving leads:", e);
  }
}

// Auth middleware for admin endpoints
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Yêu cầu đăng nhập quản trị' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!activeSessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Phiên làm việc đã hết hạn hoặc không hợp lệ' });
  }

  next();
}

// --- AUTHENTICATION ROUTES ---

// Login endpoint: supports PIN (6991) or Credentials (admin / duchai168)
app.post('/api/auth/login', (req, res) => {
  const { type, method, pin, username, password } = req.body;
  const loginType = type || method;

  let isValid = false;

  if (loginType === 'pin' || pin) {
    if (String(pin).trim() === ADMIN_CONFIG.pin) {
      isValid = true;
    }
  } else if (loginType === 'account' || loginType === 'credentials' || username) {
    if (
      String(username).trim() === ADMIN_CONFIG.username &&
      String(password).trim() === ADMIN_CONFIG.password
    ) {
      isValid = true;
    }
  }

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: (loginType === 'pin' || pin) ? 'Mã PIN 4 số không chính xác' : 'Tên tài khoản hoặc mật khẩu không đúng'
    });
  }

  // Generate secure token
  const token = 'vn247_admin_' + crypto.randomBytes(24).toString('hex');
  activeSessions.add(token);

  res.json({
    success: true,
    message: 'Đăng nhập thành công',
    token,
    user: {
      username: ADMIN_CONFIG.username,
      displayName: ADMIN_CONFIG.displayName,
      role: ADMIN_CONFIG.role
    }
  });
});

// Verify current token
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (activeSessions.has(token)) {
    return res.json({
      authenticated: true,
      user: {
        username: ADMIN_CONFIG.username,
        displayName: ADMIN_CONFIG.displayName,
        role: ADMIN_CONFIG.role
      }
    });
  }
  res.json({ authenticated: false });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Đã đăng xuất' });
});

// --- LEADS MANAGEMENT API ---

// Public / Customer Lead Submission (from Landing page)
app.post('/api/leads', (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    province,
    productId,
    productName,
    productCategory,
    loanAmount,
    monthlyIncome,
    employmentType,
    hasBadDebt,
    notes
  } = req.body;

  if (!fullName || !phoneNumber) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp họ tên và số điện thoại' });
  }

  const leads = getLeads();
  const newLead = {
    id: `LEAD-${Math.floor(10000 + Math.random() * 90000)}`,
    fullName: String(fullName).trim(),
    phoneNumber: String(phoneNumber).trim(),
    email: email ? String(email).trim() : '',
    province: province || 'Toàn quốc',
    productId: productId || 'general',
    productName: productName || 'Gói vay chung',
    productCategory: productCategory || 'loan',
    loanAmount: loanAmount || '30.000.000 đ',
    monthlyIncome: monthlyIncome || 'Chưa cập nhật',
    employmentType: employmentType || 'Đi làm hưởng lương',
    hasBadDebt: hasBadDebt || 'none',
    status: 'new',
    notes: notes || 'Khách hàng đăng ký tư vấn trực tuyến từ web',
    activities: [
      {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'system',
        note: `Khách hàng nộp hồ sơ trực tuyến cho gói ${productName || 'Vay'}.`
      }
    ],
    createdAt: new Date().toISOString(),
    affiliateClicked: false
  };

  leads.unshift(newLead);
  saveLeads(leads);

  res.status(201).json({ success: true, data: newLead });
});

// GET all leads (with advanced filters, search, and pagination)
app.get('/api/leads', (req, res) => {
  const { search, status, category, sortBy } = req.query;
  let leads = getLeads();

  // Search filter
  if (search) {
    const q = String(search).toLowerCase().trim();
    leads = leads.filter(l => 
      l.fullName.toLowerCase().includes(q) ||
      l.phoneNumber.includes(q) ||
      l.province.toLowerCase().includes(q) ||
      l.productName.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q)
    );
  }

  // Status filter
  if (status && status !== 'all') {
    leads = leads.filter(l => l.status === status);
  }

  // Category filter
  if (category && category !== 'all') {
    leads = leads.filter(l => l.productCategory === category);
  }

  // Sorting
  if (sortBy === 'oldest') {
    leads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    // Default newest first
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Summary counts
  const allLeads = getLeads();
  const summary = {
    total: allLeads.length,
    newCount: allLeads.filter(l => l.status === 'new').length,
    contactedCount: allLeads.filter(l => l.status === 'contacted').length,
    appointmentCount: allLeads.filter(l => l.status === 'appointment').length,
    disbursedCount: allLeads.filter(l => l.status === 'disbursed').length,
    rejectedCount: allLeads.filter(l => l.status === 'rejected').length
  };

  res.json({
    success: true,
    count: leads.length,
    summary,
    data: leads
  });
});

// GET single lead detail
app.get('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const leads = getLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
  }
  res.json({ success: true, data: lead });
});

// PATCH lead: update status, notes, or info
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes, affiliateClicked, loanAmount, fullName, phoneNumber, province } = req.body;
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
  }

  const oldStatus = leads[index].status;

  if (status !== undefined && status !== oldStatus) {
    leads[index].status = status;
    if (!leads[index].activities) leads[index].activities = [];
    leads[index].activities.push({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'status_change',
      note: `Thay đổi trạng thái từ [${oldStatus}] sang [${status}] bởi quản trị viên.`
    });
  }

  if (notes !== undefined) leads[index].notes = notes;
  if (affiliateClicked !== undefined) leads[index].affiliateClicked = affiliateClicked;
  if (loanAmount !== undefined) leads[index].loanAmount = loanAmount;
  if (fullName !== undefined) leads[index].fullName = fullName;
  if (phoneNumber !== undefined) leads[index].phoneNumber = phoneNumber;
  if (province !== undefined) leads[index].province = province;

  saveLeads(leads);
  res.json({ success: true, data: leads[index] });
});

// POST add activity / call log to a lead
app.post('/api/leads/:id/activity', (req, res) => {
  const { id } = req.params;
  const { type, note } = req.body;

  if (!note) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập nội dung ghi chú cuộc gọi' });
  }

  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
  }

  if (!leads[index].activities) leads[index].activities = [];
  const newActivity = {
    id: `act-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: type || 'call',
    note: String(note).trim()
  };

  leads[index].activities.unshift(newActivity);
  saveLeads(leads);

  res.json({ success: true, data: leads[index] });
});

// DELETE single lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  let leads = getLeads();
  const initialLen = leads.length;
  leads = leads.filter(l => l.id !== id);

  if (leads.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ cần xóa' });
  }

  saveLeads(leads);
  res.json({ success: true, message: 'Đã xóa hồ sơ thành công' });
});

// POST batch update status
app.post('/api/leads/batch-status', (req, res) => {
  const { ids, status } = req.body;
  if (!Array.isArray(ids) || !status) {
    return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
  }

  const leads = getLeads();
  let updatedCount = 0;

  leads.forEach(l => {
    if (ids.includes(l.id)) {
      l.status = status;
      if (!l.activities) l.activities = [];
      l.activities.push({
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'batch_update',
        note: `Cập nhật hàng loạt trạng thái sang [${status}].`
      });
      updatedCount++;
    }
  });

  saveLeads(leads);
  res.json({ success: true, updatedCount });
});

// POST batch delete
app.post('/api/leads/batch-delete', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
  }

  let leads = getLeads();
  const beforeCount = leads.length;
  leads = leads.filter(l => !ids.includes(l.id));
  saveLeads(leads);

  res.json({ success: true, deletedCount: beforeCount - leads.length });
});

// Export leads CSV endpoint
app.get('/api/leads/export/csv', (req, res) => {
  const leads = getLeads();

  const headers = [
    'Mã hồ sơ',
    'Họ và tên',
    'Số điện thoại',
    'Email',
    'Khu vực',
    'Gói quan tâm',
    'Phân loại',
    'Số tiền / Hạn mức',
    'Thu nhập hàng tháng',
    'Nghề nghiệp',
    'Tình trạng CIC',
    'Trạng thái chăm sóc',
    'Ghi chú',
    'Ngày đăng ký'
  ];

  const statusMap: Record<string, string> = {
    new: 'Mới đăng ký',
    contacted: 'Đang gọi tư vấn',
    appointment: 'Hẹn gọi lại sau',
    disbursed: 'Đã giải ngân / Đã mở thẻ',
    rejected: 'Không đủ điều kiện / Từ chối'
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
    `"${l.hasBadDebt === 'none' ? 'Không nợ xấu' : (l.hasBadDebt === 'cic_low' ? 'Chậm nhẹ' : 'Nợ xấu')}"`,
    `"${statusMap[l.status] || l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${new Date(l.createdAt).toLocaleString('vi-VN')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename=leads_sosanhkhoanvay_com_${new Date().toISOString().slice(0, 10)}.csv`);
  res.send(csvContent);
});

// Detailed Analytics Endpoint
app.get('/api/analytics', (req, res) => {
  const leads = getLeads();
  const total = leads.length;
  const disbursed = leads.filter(l => l.status === 'disbursed').length;
  const contacted = leads.filter(l => l.status === 'contacted' || l.status === 'appointment').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const rejected = leads.filter(l => l.status === 'rejected').length;

  // Group by category
  const loansCount = leads.filter(l => l.productCategory === 'loan').length;
  const cardsCount = leads.filter(l => l.productCategory === 'card').length;

  // Breakdown by provider/bank
  const bankBreakdown: Record<string, number> = {};
  leads.forEach(l => {
    const bank = l.productName.split(' ')[0] || 'Khác';
    bankBreakdown[bank] = (bankBreakdown[bank] || 0) + 1;
  });

  // Estimated affiliate commission earned (approx 450.000đ per disbursed loan/card)
  const estimatedCommission = disbursed * 450000;

  res.json({
    success: true,
    data: {
      total,
      disbursed,
      contacted,
      newLeads,
      rejected,
      conversionRate: total > 0 ? ((disbursed / total) * 100).toFixed(1) + '%' : '0%',
      loansCount,
      cardsCount,
      estimatedCommission,
      bankBreakdown
    }
  });
});

// --- PRODUCTS & APPLICATION GUIDE MANAGEMENT API ---

// GET all products (including custom application steps & requirements)
app.get('/api/products', (req, res) => {
  const products = getProductsData();
  res.json({ success: true, count: products.length, data: products });
});

// GET single product details
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const products = getProductsData();
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  res.json({ success: true, data: product });
});

// PUT update product details, applicationSteps, requirements, or affiliate link
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const products = getProductsData();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  products[index] = { ...products[index], ...updates };
  saveProductsData(products);
  res.json({
    success: true,
    message: `Đã lưu cập nhật hướng dẫn và thông tin cho ${products[index].name}`,
    data: products[index]
  });
});

// POST reset products to system default
app.post('/api/products/reset', (req, res) => {
  saveProductsData(INITIAL_PRODUCTS);
  res.json({ success: true, message: 'Đã khôi phục danh sách và hướng dẫn ban đầu', data: INITIAL_PRODUCTS });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const distPath = path.join(__dirname, 'dist');

  if (!isDev && fs.existsSync(distPath)) {
    // Production: serve built static files
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Development or fallback: Vite SSR middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  const HOST = '0.0.0.0';
  app.listen(PORT, HOST, () => {
    console.log(`Professional Financial Affiliate Server running at http://${HOST}:${PORT} (NODE_ENV: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
