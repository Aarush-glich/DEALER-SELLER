/**
 * Tata Steel Colors Procurement Portal — Node.js / Express Backend
 * ============================================================
 * Install dependencies first:
 *   npm install express cors
 *
 * Then run:
 *   node server.js
 *
 * Mirrors the same API contract as server.py
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const PORT    = 5000;
const DB_FILE = path.join(__dirname, 'db.json');

const BOT_VENDORS = [
  'Western Coil Coaters', 'Maharashtra Steel Service Centre', 'Surya Fasteners',
  'Precision Rollform Components', 'Apex Structural Systems', 'SolarMount Fabricators'
];

const DEFAULT_TENDER_CATEGORY = 'Coated Steel';
const DEFAULT_TENDER_UNIT = 'MT';

// ─── DATABASE HELPERS ─────────────────────────────────────────────────────────
function loadDB()      { return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')); }
function saveDB(db)    { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8'); }

// ─── APP SETUP ────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─── HEALTH ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// ─── STATS ────────────────────────────────────────────────────────────────────
app.get('/api/stats', (_, res) => {
  const db = loadDB();
  const open   = db.tenders.filter(t => t.status === 'Open').length;
  const closed = db.tenders.filter(t => t.status === 'Closed').length;
  res.json({
    activeVendors:    (db.vendors || []).length + 847,
    liveBids:         open,
    materialsProcured: 42 + closed
  });
});

// ─── TENDERS ──────────────────────────────────────────────────────────────────
app.get('/api/tenders', (_, res) => res.json(loadDB().tenders));

app.get('/api/tenders/:id', (req, res) => {
  const t = loadDB().tenders.find(x => x.id === req.params.id);
  t ? res.json(t) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/tenders', (req, res) => {
  const db   = loadDB();
  const year = new Date().getFullYear();
  const id   = `TND-${year}-${String(db.tenders.length + 1).padStart(3, '0')}`;
  const t = {
    id,
    category:      req.body.category || DEFAULT_TENDER_CATEGORY,
    name:          req.body.name || '',
    description:   req.body.description || '',
    quantity:      Number(req.body.quantity) || 0,
    unit:          req.body.unit || DEFAULT_TENDER_UNIT,
    requiredDate:  req.body.requiredDate || '',
    basePrice:     Number(req.body.basePrice) || 0,
    lowestBid:     Number(req.body.basePrice) || 0,
    lowestBidder:  '-',
    closingSeconds: (Number(req.body.closingHours) || 24) * 3600,
    status:        'Open',
    createdAt:     new Date().toISOString()
  };
  db.tenders.push(t);
  saveDB(db);
  res.json({ success: true, tender: t });
});

app.put('/api/tenders/:id', (req, res) => {
  const db = loadDB();
  const t  = db.tenders.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: 'Tender not found' });
  ['status', 'lowestBid', 'lowestBidder', 'closingSeconds'].forEach(k => {
    if (req.body[k] !== undefined) t[k] = req.body[k];
  });
  saveDB(db);
  res.json({ success: true, tender: t });
});

// ─── SUBMISSIONS ──────────────────────────────────────────────────────────────
app.get('/api/submissions', (_, res) => res.json(loadDB().submissions));

app.get('/api/submissions/:id', (req, res) => {
  const s = loadDB().submissions.find(x => x.id === req.params.id);
  s ? res.json(s) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/submissions', (req, res) => {
  const db   = loadDB();
  const id   = `SUB-${500 + db.submissions.length + 1}`;
  const now  = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const sub  = {
    id,
    tenderId:    req.body.tenderId,
    vendorName:  req.body.vendorName,
    companyGst:  req.body.companyGst  || '',
    price:       Number(req.body.price),
    deliveryDate:req.body.deliveryDate || '',
    fileName:    req.body.fileName    || 'Quotation.pdf',
    fileSize:    req.body.fileSize    || '1.0 MB',
    submittedAt: now,
    status:      'Pending',
    remarks:     req.body.remarks || 'Bid submitted via Tata Steel Colors Vendor Sourcing Panel.'
  };
  db.submissions.unshift(sub);

  // Update lowest bid
  const tender = db.tenders.find(t => t.id === sub.tenderId);
  if (tender && sub.price < (tender.lowestBid || Infinity)) {
    tender.lowestBid    = sub.price;
    tender.lowestBidder = sub.vendorName;
  }

  // Notification
  db.notifications = db.notifications || [];
  db.notifications.unshift({
    id:      Date.now(),
    title:   'New Bid Received',
    message: `${sub.vendorName} placed INR ${sub.price} on ${sub.tenderId}.`,
    time:    'Just now',
    read:    false
  });
  db.notifications = db.notifications.slice(0, 50);
  saveDB(db);
  res.json({ success: true, submission: sub });
});

app.put('/api/submissions/:id', (req, res) => {
  const db  = loadDB();
  const sub = db.submissions.find(s => s.id === req.params.id);
  if (!sub) return res.status(404).json({ error: 'Submission not found' });
  ['status', 'remarks'].forEach(k => {
    if (req.body[k] !== undefined) sub[k] = req.body[k];
  });
  saveDB(db);
  res.json({ success: true, submission: sub });
});

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
app.get('/api/notifications', (_, res) =>
  res.json((loadDB().notifications || []).slice(0, 30))
);

// ─── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { role = 'vendor', email = '', password = '' } = req.body;
  const db   = loadDB();
  const pool = role === 'hr' ? (db.hr_users || []) : (db.vendors || []);
  const user = pool.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (user) {
    const { password: _, ...safe } = user;
    res.json({ success: true, user: safe });
  } else {
    res.json({ success: false, error: 'Invalid email or password' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const db      = loadDB();
  const vendors = db.vendors || [];
  const email   = (req.body.email || '').toLowerCase();

  if (vendors.some(v => v.email.toLowerCase() === email)) {
    return res.status(409).json({ success: false, error: 'Email already registered' });
  }
  const newV = {
    id:           `VND-${1000 + vendors.length + 1}`,
    vendorName:   req.body.vendorName || '',
    companyName:  req.body.companyName || req.body.vendorName || '',
    email,
    password:     req.body.password || '',
    gstNumber:    req.body.gstNumber || '',
    phone:        req.body.phone || '',
    registeredAt: new Date().toISOString()
  };
  vendors.push(newV);
  db.vendors = vendors;
  saveDB(db);
  const { password: _, ...safe } = newV;
  res.json({ success: true, user: safe });
});

// ─── SIMULATION ENGINE ────────────────────────────────────────────────────────
function runSimulation() {
  setInterval(() => {
    try {
      const db      = loadDB();
      let   changed = false;

      // 1. Tick countdowns
      for (const t of db.tenders) {
        if (t.status === 'Open') {
          t.closingSeconds = Math.max(0, (t.closingSeconds || 0) - 1);
          if (t.closingSeconds === 0) t.status = 'Closed';
          changed = true;
        }
      }

      // 2. Random bot bid (~7% per second ≈ every 14s)
      if (Math.random() < 0.072) {
        const open = db.tenders.filter(t => t.status === 'Open');
        if (open.length > 0) {
          const target   = open[Math.floor(Math.random() * open.length)];
          const drop     = Math.ceil(Math.random() * 4) + 1;
          const newPrice = Math.round((target.lowestBid - drop) * 100) / 100;
          const floor    = target.basePrice * 0.70;

          if (newPrice > floor) {
            const bot = BOT_VENDORS[Math.floor(Math.random() * BOT_VENDORS.length)];
            target.lowestBid    = newPrice;
            target.lowestBidder = bot;

            db.submissions = db.submissions || [];
            db.submissions.unshift({
              id:          `SUB-BOT-${Date.now() % 999999}`,
              tenderId:    target.id,
              vendorName:  bot,
              companyGst:  `27BOT${Math.floor(1000 + Math.random() * 9000)}Z1Z2`,
              price:       newPrice,
              deliveryDate:target.requiredDate || '',
              fileName:    `Quotation_${bot.replace(/ /g,'_')}.pdf`,
              fileSize:    '1.1 MB',
              submittedAt: new Date().toISOString().replace('T',' ').slice(0,16),
              status:      'Pending',
              remarks:     'Competitive quote via Tata Steel Colors auto-tender gateway.'
            });
            db.submissions = db.submissions.slice(0, 200);

            db.notifications = db.notifications || [];
            db.notifications.unshift({
              id:      Date.now(),
              title:   'Competitor Bid Alert',
              message: `${bot} placed INR ${newPrice}/${target.unit} on ${target.name}.`,
              time:    'Just now',
              read:    false
            });
            db.notifications = db.notifications.slice(0, 50);
            changed = true;
          }
        }
      }

      if (changed) saveDB(db);
    } catch (e) {
      console.error('[SIM ERROR]', e.message);
    }
  }, 1000);
}

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ============================================================
   Tata Steel Colors Procurement API Server
  ============================================================
   API                 : http://localhost:${PORT}/api
   App                 : http://localhost:8000
   Demo Vendor         : vendor@demo.com / demo123
   Demo Sourcing Desk  : sourcing@tatasteelcolors.com / hr123
  ============================================================
  `);
  runSimulation();
  console.log('  Simulation engine started\n');
});