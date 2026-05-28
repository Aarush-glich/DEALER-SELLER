import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import AuthPortal from './components/AuthPortal.jsx';
import VendorDashboard from './components/VendorDashboard.jsx';
import HRDashboard from './components/HRDashboard.jsx';
import BidDetailsPage from './components/BidDetailsPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

<<<<<<< HEAD
const API_BASE = 'http://localhost:5000/api';
=======
const API_BASE = 'http://localhost:3001/api';
>>>>>>> 3d70e01be78667d6be6c177f2842b4d6a453aceb

// ==========================================
// INITIAL DUMMY DATABASE STATE
// ==========================================
const INITIAL_TENDERS = [
  {
    id: 'TND-2026-001',
    category: 'Coated Steel',
    name: 'AZ150 Al-Zn Coated Steel Coils',
    description: 'ZINCALUME grade aluminium-zinc alloy coated coils for roof and wall cladding production.',
    quantity: 1200,
    unit: 'MT',
    requiredDate: '2026-07-15',
    basePrice: 86500,
    lowestBid: 85200,
    lowestBidder: 'Maharashtra Steel Service Centre',
    closingSeconds: 43200,
    status: 'Open'
  },
  {
    id: 'TND-2026-002',
    category: 'Coated Steel',
    name: 'Pre-Painted COLORBOND Coil Stock',
    description: 'Durable colour-coated Al-Zn steel feedstock for premium roofing and wall cladding applications.',
    quantity: 850,
    unit: 'MT',
    requiredDate: '2026-06-30',
    basePrice: 96500,
    lowestBid: 94800,
    lowestBidder: 'Western Coil Coaters',
    closingSeconds: 86400,
    status: 'Open'
  },
  {
    id: 'TND-2026-003',
    category: 'Building Products',
    name: 'High Tensile Steel for LYSAGHT Purlins',
    description: 'Cold rolled high tensile sections for purlins, girts, decking systems, and industrial buildings.',
    quantity: 620,
    unit: 'MT',
    requiredDate: '2026-08-01',
    basePrice: 74200,
    lowestBid: 73100,
    lowestBidder: 'Precision Rollform Components',
    closingSeconds: 172800,
    status: 'Open'
  },
  {
    id: 'TND-2026-004',
    category: 'Accessories',
    name: 'DURASHINE Roofing Fastener Kits',
    description: 'Corrosion-resistant fasteners with EPDM washers for roof and wall sheet installation.',
    quantity: 150000,
    unit: 'PCS',
    requiredDate: '2026-07-10',
    basePrice: 18,
    lowestBid: 16,
    lowestBidder: 'Surya Fasteners',
    closingSeconds: 15000,
    status: 'Open'
  },
  {
    id: 'TND-2026-005',
    category: 'Solar Mounting',
    name: 'Zn-Al Coated Sections for ILIOS Solar Mounts',
    description: 'Custom cold rolled coated steel sections for ground and rooftop solar module mounting systems.',
    quantity: 420,
    unit: 'MT',
    requiredDate: '2026-07-01',
    basePrice: 78500,
    lowestBid: 77200,
    lowestBidder: 'SolarMount Fabricators',
    closingSeconds: 5200,
    status: 'Open'
  },
  {
    id: 'TND-2026-006',
    category: 'Pre-Engineered Buildings',
    name: 'ECOBUILD Structural Steel Plate Lots',
    description: 'Certified structural steel lots for pre-engineered industrial and commercial building systems.',
    quantity: 540,
    unit: 'MT',
    requiredDate: '2026-07-22',
    basePrice: 71500,
    lowestBid: 70400,
    lowestBidder: 'Apex Structural Systems',
    closingSeconds: 2200,
    status: 'Open'
  }
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'SUB-401',
    tenderId: 'TND-2026-001',
    vendorName: 'Maharashtra Steel Service Centre',
    companyGst: '27AAAAA1234B1Z5',
    price: 85200,
    deliveryDate: '2026-07-10',
    fileName: 'MSSC_ZINCALUME_AZ150_Quote.pdf',
    fileSize: '1.2 MB',
    submittedAt: '2026-05-25 09:12',
    status: 'Pending',
    remarks: 'Includes coil test certificates and dispatch plan.'
  },
  {
    id: 'SUB-402',
    tenderId: 'TND-2026-001',
    vendorName: 'Western Coil Coaters',
    companyGst: '27BBBBB5678C1Z6',
    price: 85800,
    deliveryDate: '2026-07-12',
    fileName: 'Western_Coil_AZ150_Bid.pdf',
    fileSize: '850 KB',
    submittedAt: '2026-05-25 08:34',
    status: 'Pending',
    remarks: 'Guaranteed delivery before 12th July.'
  },
  {
    id: 'SUB-403',
    tenderId: 'TND-2026-002',
    vendorName: 'Western Coil Coaters',
    companyGst: '27CCCCC9012D1Z7',
    price: 94800,
    deliveryDate: '2026-06-25',
    fileName: 'COLORBOND_Coil_Proposal.pdf',
    fileSize: '2.1 MB',
    submittedAt: '2026-05-25 09:50',
    status: 'Pending',
    remarks: 'Includes paint system compliance and colour shade batch plan.'
  },
  {
    id: 'SUB-404',
    tenderId: 'TND-2026-004',
    vendorName: 'Surya Fasteners',
    companyGst: '27DDDDD3456E1Z8',
    price: 16,
    deliveryDate: '2026-07-05',
    fileName: 'Durashine_Fastener_Kit_Tender.pdf',
    fileSize: '1.7 MB',
    submittedAt: '2026-05-25 10:02',
    status: 'Approved',
    remarks: 'Includes EPDM washer quality certificate and corrosion test report.'
  }
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New Tender Published', message: 'TND-2026-006: ECOBUILD Structural Steel Plate Lots is now open for bidding.', time: 'Just now', read: false },
  { id: 2, title: 'Bid Approved', message: 'Your quotation for DURASHINE Roofing Fastener Kits has been APPROVED by Procurement Team.', time: '30 mins ago', read: false },
  { id: 3, title: 'Price Competitiveness Alert', message: 'A competitor submitted a lower bid for AZ150 Al-Zn Coated Steel Coils.', time: '1 hour ago', read: true }
];
// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  // Global States
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [currentPage, setCurrentPage] = useState('home'); // home, about, auth, vendor-dashboard, hr-dashboard, bid-details, contact
  const [authMode, setAuthMode] = useState('login'); // login, signup, forgot, otp
  const [authRole, setAuthRole] = useState('vendor'); // vendor, hr
  const [currentUser, setCurrentUser] = useState(null); // stores active user object
  const [tenders, setTenders] = useState(INITIAL_TENDERS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedTenderId, setSelectedTenderId] = useState(null);
  const [toast, setToast] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [apiError, setApiError] = useState(false);

  // UI Control States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Tata Steel Colors Support Chat. How can I assist you with vendor enrollment, coated-steel sourcing, bidding procedures, or portals today?', time: '10:30 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Sync Theme Class on Root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global Toast Notification Helper
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ──────────────────────────────────────────────────────────────
  // API: INITIAL DATA LOAD + 4-SECOND SYNC POLL
  // Fetches tenders, submissions, notifications from backend.
  // Falls back to INITIAL_* constants if backend is offline.
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const fetchAll = () => {
      Promise.all([
        fetch(`${API_BASE}/tenders`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
        fetch(`${API_BASE}/submissions`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
        fetch(`${API_BASE}/notifications`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      ])
      .then(([tendersData, subsData, notifsData]) => {
        if (!mounted) return;
        setTenders(tendersData);
        setSubmissions(subsData);
        setNotifications(notifsData);
        setApiReady(true);
        setApiError(false);
      })
      .catch(() => {
        if (!mounted) return;
        setApiError(true); // Backend offline — initial fallback data stays
      });
    };
    fetchAll();
    const pollId = setInterval(fetchAll, 4000);
    return () => { mounted = false; clearInterval(pollId); };
  }, []);

  // ──────────────────────────────────────────────────────────────
  // FRONTEND COUNTDOWN (smooth 1-second ticks between API polls)
  // Backend simulation handles bot bids and authoritative timers.
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setTenders(prev => prev.map(tnd => {
        if (tnd.status === 'Open') {
          const nextSec = tnd.closingSeconds - 1;
          return {
            ...tnd,
            closingSeconds: nextSec,
            status: nextSec <= 0 ? 'Closed' : 'Open'
          };
        }
        return tnd;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ──────────────────────────────────────────────────────────────
  // API HELPERS — passed as props to child components
  // ──────────────────────────────────────────────────────────────
  const apiSubmitBid = async (submissionData) => {
    try {
      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      return await res.json();
    } catch { return { success: false }; }
  };

  const apiApproveBid = async (subId, tenderId) => {
    try {
      await fetch(`${API_BASE}/submissions/${subId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      });
      const toReject = submissions.filter(s => s.tenderId === tenderId && s.id !== subId);
      await Promise.all(toReject.map(s =>
        fetch(`${API_BASE}/submissions/${s.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Rejected' })
        })
      ));
      await fetch(`${API_BASE}/tenders/${tenderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Closed', closingSeconds: 0 })
      });
    } catch { /* Silent fail — local state already updated optimistically */ }
  };

  const apiRejectBid = async (subId) => {
    try {
      await fetch(`${API_BASE}/submissions/${subId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' })
      });
    } catch { /* Silent fail */ }
  };

  const apiCreateTender = async (tenderData) => {
    try {
      const res = await fetch(`${API_BASE}/tenders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenderData)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Server connection failed' };
    }
  };

  const apiLogin = async (role, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, email, password })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Server connection failed' };
    }
  };

  const apiRegister = async (vendorData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Server connection failed' };
    }
  };

  // Dynamic Toast Renderer
  const ToastContainer = () => {
    if (!toast) return null;
    const colorStyles = toast.type === 'success' 
      ? 'bg-emerald-600 text-white' 
      : toast.type === 'warning' 
        ? 'bg-amber-600 text-white' 
        : 'bg-rose-600 text-white';

    return (
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-toast ${colorStyles}`}>
        <span>
          {toast.type === 'success' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
          {toast.type === 'warning' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
        </span>
        <span className="font-medium tracking-wide">{toast.message}</span>
      </div>
    );
  };

  // Handler for user sign out
  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    triggerToast('Logged out successfully.');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -left-20 w-[45rem] h-[45rem] rounded-full bg-tata-500/10 dark:bg-tata-500/5 blur-[120px] animate-mesh-1"></div>
        <div className="absolute bottom-20 -right-20 w-[35rem] h-[35rem] rounded-full bg-indigo-500/10 dark:bg-indigo-950/20 blur-[100px] animate-mesh-2"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04]"></div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="relative w-11 h-11 bg-gradient-to-tr from-tata-700 to-tata-500 rounded-xl flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-lg shadow-tata-500/20">
                T
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div>
<<<<<<< HEAD
                <span className="font-heading font-bold text-xl tracking-tight text-tata-700 dark:text-tata-300">TATA STEEL COLORS</span>
=======
                <span className="font-heading font-bold text-xl tracking-tight text-tata-700 dark:text-tata-300">TATA COLOURS</span>
>>>>>>> 3d70e01be78667d6be6c177f2842b4d6a453aceb
                <span className="block text-[10px] tracking-[0.2em] font-semibold text-slate-500 uppercase dark:text-slate-400">Procurement</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
              <button onClick={() => setCurrentPage('home')} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'home' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>Home</button>
              <button onClick={() => setCurrentPage('about')} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'about' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>About Us</button>
              
              {currentUser && authRole === 'vendor' ? (
                <button onClick={() => setCurrentPage('vendor-dashboard')} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'vendor-dashboard' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>Vendor Dashboard</button>
              ) : (
                <button onClick={() => { setAuthRole('vendor'); setAuthMode('login'); setCurrentPage('auth'); }} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'auth' && authRole === 'vendor' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>Vendor Portal</button>
              )}

              {currentUser && authRole === 'hr' ? (
                <button onClick={() => setCurrentPage('hr-dashboard')} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'hr-dashboard' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>HR Portal</button>
              ) : (
                <button onClick={() => { setAuthRole('hr'); setAuthMode('login'); setCurrentPage('auth'); }} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'auth' && authRole === 'hr' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>HR Portal</button>
              )}
              
              <button onClick={() => setCurrentPage('contact')} className={`transition-colors py-2 px-1 border-b-2 ${currentPage === 'contact' ? 'text-tata-600 dark:text-tata-400 border-tata-600 dark:border-tata-400' : 'text-slate-600 hover:text-tata-600 dark:text-slate-300 dark:hover:text-tata-400 border-transparent'}`}>Contact</button>
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              {/* API Status Indicator */}
              <div
                title={apiReady ? `Backend connected: ${API_BASE}` : 'Backend offline — start backend/start.bat to connect'}
                className={`hidden sm:flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full border cursor-default select-none transition-all ${apiReady ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${apiReady ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                {apiReady ? 'API Online' : 'Demo Mode'}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                aria-label="Toggle dark/light mode"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
              </button>

              {/* Auth Action */}
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <span className="block font-semibold text-xs text-slate-800 dark:text-slate-200">{currentUser.vendorName || currentUser.username || currentUser.email}</span>
                    <span className="text-[10px] bg-tata-500/20 text-tata-700 dark:text-tata-300 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">{authRole}</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 border border-rose-500/40 hover:bg-rose-500/10 text-rose-500 font-semibold text-xs rounded-xl transition-all tracking-wider uppercase"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthRole('vendor'); setAuthMode('login'); setCurrentPage('auth'); }}
                  className="px-5 py-2.5 bg-gradient-to-r from-tata-600 to-tata-500 hover:from-tata-700 hover:to-tata-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-tata-500/20 hover:shadow-tata-500/35 hover:-translate-y-0.5 transition-all tracking-wider uppercase"
                >
                  Portal Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Router */}
      <main className="flex-grow relative z-10">
        {currentPage === 'home' && (
          <LandingPage 
            setCurrentPage={setCurrentPage} 
            setAuthRole={setAuthRole} 
            setAuthMode={setAuthMode}
            tenders={tenders}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'auth' && (
          <AuthPortal 
            authMode={authMode} 
            setAuthMode={setAuthMode} 
            authRole={authRole} 
            setAuthRole={setAuthRole} 
            setCurrentUser={setCurrentUser} 
            setCurrentPage={setCurrentPage}
            triggerToast={triggerToast}
            onLogin={apiLogin}
            onRegister={apiRegister}
          />
        )}
        {currentPage === 'vendor-dashboard' && (
          <VendorDashboard 
            currentUser={currentUser} 
            tenders={tenders} 
            setTenders={setTenders}
            submissions={submissions}
            setSubmissions={setSubmissions}
            notifications={notifications}
            setNotifications={setNotifications}
            setSelectedTenderId={setSelectedTenderId}
            setCurrentPage={setCurrentPage}
            triggerToast={triggerToast}
            onBidSubmit={apiSubmitBid}
          />
        )}
        {currentPage === 'hr-dashboard' && (
          <HRDashboard 
            currentUser={currentUser}
            tenders={tenders}
            setTenders={setTenders}
            submissions={submissions}
            setSubmissions={setSubmissions}
            notifications={notifications}
            setNotifications={setNotifications}
            triggerToast={triggerToast}
            onApproveBid={apiApproveBid}
            onRejectBid={apiRejectBid}
            onCreateTender={apiCreateTender}
          />
        )}
        {currentPage === 'bid-details' && (
          <BidDetailsPage 
            tenderId={selectedTenderId}
            tenders={tenders}
            submissions={submissions}
            setSubmissions={setSubmissions}
            currentUser={currentUser}
            authRole={authRole}
            setCurrentPage={setCurrentPage}
            triggerToast={triggerToast}
          />
        )}
        {currentPage === 'contact' && <ContactPage triggerToast={triggerToast} />}
      </main>

      {/* Footer Component */}
      <Footer setCurrentPage={setCurrentPage} setAuthRole={setAuthRole} setAuthMode={setAuthMode} />

      {/* Interactive Chat Support Widget */}
      <ChatWidget 
        chatOpen={chatOpen} 
        setChatOpen={setChatOpen} 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages} 
        chatInput={chatInput} 
        setChatInput={setChatInput} 
      />

      {/* Toast Alert Notification */}
      <ToastContainer />
    </div>
  );
}
