import React, { useState, useMemo } from 'react';

export default function HRDashboard({ currentUser, tenders, setTenders, submissions, setSubmissions, notifications, setNotifications, triggerToast, onApproveBid, onRejectBid, onCreateTender }) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeSubTab, setActiveSubTab] = useState('bidding-matrix'); // bidding-matrix, vendor-ranks, performance-reports
  const [selectedTenderCompareId, setSelectedTenderCompareId] = useState(tenders[0]?.id || '');
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Category filter matching tenders
  const hrTenders = useMemo(() => {
    return tenders.filter(t => selectedCategoryFilter === 'All' || t.category === selectedCategoryFilter);
  }, [tenders, selectedCategoryFilter]);

  // Submissions associated with the selected comparison tender
  const selectedTenderSubmissions = useMemo(() => {
    return submissions.filter(sub => sub.tenderId === selectedTenderCompareId);
  }, [submissions, selectedTenderCompareId]);

  // Selected tender details
  const currentCompareTender = useMemo(() => {
    return tenders.find(t => t.id === selectedTenderCompareId);
  }, [tenders, selectedTenderCompareId]);

  // Approve a vendor's bid quotation
  const handleApproveBid = (subId, tenderId) => {
    // Approve target submission, reject all other submissions for this tender
    setSubmissions(prev => prev.map(sub => {
      if (sub.tenderId === tenderId) {
        return {
          ...sub,
          status: sub.id === subId ? 'Approved' : 'Rejected'
        };
      }
      return sub;
    }));

    // Close the tender as status Closed
    setTenders(prev => prev.map(t => {
      if (t.id === tenderId) {
        return { ...t, status: 'Closed', closingSeconds: 0 };
      }
      return t;
    }));

    triggerToast(`Quotation approved. Work order generated for bidder.`);
    // Persist decision to backend (fire-and-forget)
    if (onApproveBid) onApproveBid(subId, tenderId);
  };

  // Reject a single bid
  const handleRejectBid = (subId) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === subId) {
        return { ...sub, status: 'Rejected' };
      }
      return sub;
    }));
    triggerToast('Quotation rejected.');
    // Persist decision to backend (fire-and-forget)
    if (onRejectBid) onRejectBid(subId);
  };

  // Mock PDF report generator download
  const triggerReportDownload = (reportName) => {
    triggerToast(`Generating spreadsheet/PDF for: ${reportName}`);
    setTimeout(() => {
      triggerToast(`${reportName} downloaded successfully!`);
    }, 1000);
  };

  // Mock AI Recommender Engine Math
  const recommendedVendors = useMemo(() => {
    if (!currentCompareTender) return [];
    return [
      { name: 'Western Coil Coaters', rating: 4.8, compatibility: 96, matchReason: 'Lowest delivery lead time (5 days), ISO 9001 certified supplier.' },
      { name: 'Maharashtra Steel Service Centre', rating: 4.6, compatibility: 91, matchReason: 'Historically lowest pricing trends with 98% quality compliance.' },
      { name: 'Precision Rollform Components', rating: 4.2, compatibility: 84, matchReason: 'Roll-forming capacity and regional dispatch network reduce freight variance.' }
    ];
  }, [currentCompareTender]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Dashboard Title & Top sourcing navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/50 dark:border-slate-800/50 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">Procurement & Sourcing Desk</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Authenticated: {currentUser?.username || currentUser?.email} ({currentUser?.role})</p>
        </div>

        {/* Inner Dashboard Tabs */}
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40">
          <button
            onClick={() => setActiveSubTab('bidding-matrix')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all tracking-wider ${activeSubTab === 'bidding-matrix' ? 'bg-white dark:bg-slate-800 text-tata-600 dark:text-tata-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Bid Comparison Matrix
          </button>
          <button
            onClick={() => setActiveSubTab('vendor-ranks')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all tracking-wider ${activeSubTab === 'vendor-ranks' ? 'bg-white dark:bg-slate-800 text-tata-600 dark:text-tata-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Vendor Performance
          </button>
          <button
            onClick={() => setActiveSubTab('performance-reports')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all tracking-wider ${activeSubTab === 'performance-reports' ? 'bg-white dark:bg-slate-800 text-tata-600 dark:text-tata-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Analytics & Reports
          </button>
        </div>
      </div>

      {/* TAB 1: BID COMPARISON MATRIX & LIVE BID CONTROLS */}
      {activeSubTab === 'bidding-matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Tender Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Select Bidding Tender</h3>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {tenders.map(tnd => {
                  const count = submissions.filter(s => s.tenderId === tnd.id).length;
                  return (
                    <button
                      key={tnd.id}
                      onClick={() => setSelectedTenderCompareId(tnd.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex flex-col gap-1 ${selectedTenderCompareId === tnd.id ? 'border-tata-500 bg-tata-500/5 dark:bg-tata-950/20' : 'border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20'}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{tnd.category}</span>
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${tnd.status === 'Open' ? 'bg-red-500/10 text-red-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                          {tnd.status}
                        </span>
                      </div>
                      <span className="font-heading font-bold text-xs text-slate-900 dark:text-white truncate">{tnd.name}</span>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>Bids Submitted: <strong className="text-slate-800 dark:text-slate-200">{count}</strong></span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">Low: ₹{tnd.lowestBid}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Grid & Decision Module */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Selected Tender Overview Card */}
            {currentCompareTender && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] bg-tata-500/10 text-tata-600 dark:bg-tata-500/20 dark:text-tata-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{currentCompareTender.category}</span>
                    <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mt-1.5">{currentCompareTender.name}</h2>
                    <span className="text-xs text-slate-400">Tender Reference: {currentCompareTender.id}</span>
                  </div>
                  
                  {/* AI Matching Button */}
                  <button
                    onClick={() => setShowRecommendation(!showRecommendation)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    AI Vendor Match Mockup
                  </button>
                </div>

                {/* AI Recommendation Panel Overlay */}
                {showRecommendation && (
                  <div className="p-5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 dark:border-indigo-500/10 space-y-3 animate-pulse-once">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      <span>AI Procurement Recommendation</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {recommendedVendors.map((rec, idx) => (
                        <div key={idx} className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200/50 dark:border-slate-800/50 space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{rec.name}</span>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded font-bold">{rec.compatibility}%</span>
                          </div>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400">{rec.matchReason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Table comparing quotations side-by-side */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Received Quotations Comparison</h4>
                  {selectedTenderSubmissions.length === 0 ? (
                    <p className="text-xs text-slate-500 py-8 text-center bg-slate-50 dark:bg-slate-950 rounded-xl">No quotations submitted by vendors yet.</p>
                  ) : (
                    <div className="overflow-x-auto border border-slate-200/40 dark:border-slate-800/40 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/40 dark:border-slate-800/40">
                            <th className="p-4 font-semibold">Vendor Name</th>
                            <th className="p-4 font-semibold">Quoted Price</th>
                            <th className="p-4 font-semibold">Delivery Target</th>
                            <th className="p-4 font-semibold">Quotation Doc</th>
                            <th className="p-4 font-semibold text-center">Audit Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
                          {selectedTenderSubmissions.map(sub => {
                            const isLowest = sub.price === currentCompareTender.lowestBid;
                            const statusStyles = sub.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'
                              : sub.status === 'Rejected'
                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/10'
                                : 'bg-amber-500/10 text-amber-600 border-amber-500/10';

                            return (
                              <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                  {sub.vendorName}
                                  {isLowest && (
                                    <span className="text-[8px] bg-emerald-500 text-white font-bold px-1 py-0.5 rounded tracking-wider uppercase">Lowest</span>
                                  )}
                                </td>
                                <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-200">
                                  ₹{sub.price} / {currentCompareTender.unit}
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">
                                  {new Date(sub.deliveryDate).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                  <button 
                                    onClick={() => triggerReportDownload(sub.fileName)}
                                    className="text-tata-500 dark:text-tata-400 hover:underline flex items-center gap-1 font-semibold text-[11px] truncate max-w-[120px]"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    {sub.fileName}
                                  </button>
                                </td>
                                <td className="p-4 text-center">
                                  {sub.status === 'Pending' && currentCompareTender.status === 'Open' ? (
                                    <div className="flex justify-center gap-1.5">
                                      <button
                                        onClick={() => handleApproveBid(sub.id, currentCompareTender.id)}
                                        className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase rounded"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleRejectBid(sub.id)}
                                        className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] uppercase rounded"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  ) : (
                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusStyles}`}>
                                      {sub.status}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: VENDOR PERFORMANCE RATINGS & METRICS */}
      {activeSubTab === 'vendor-ranks' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Vendor Performance Scorecard</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Historical performance rankings based on delivery speed, quality checks, and pricing consistency.</p>
            </div>
            <button 
              onClick={() => triggerReportDownload('Vendor_Performance_Audit_2026')}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Export Ranking Sheet
            </button>
          </div>

          {/* Vendor ranks table */}
          <div className="overflow-x-auto border border-slate-200/40 dark:border-slate-800/40 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/40 dark:border-slate-800/40">
                  <th className="p-4 font-semibold">Vendor Name</th>
                  <th className="p-4 font-semibold">Procurement Contracts</th>
                  <th className="p-4 font-semibold">On-Time Delivery Rate</th>
                  <th className="p-4 font-semibold">Quality Pass Index</th>
                  <th className="p-4 font-semibold">Enterprise Rating</th>
                  <th className="p-4 font-semibold">Sourcing Eligibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
                {[
                  { name: 'Western Coil Coaters', contracts: 28, delivery: '98.4%', quality: '99.1%', stars: 5, status: 'Elite Tier' },
                  { name: 'Maharashtra Steel Service Centre', contracts: 19, delivery: '94.2%', quality: '97.8%', stars: 4.5, status: 'Premium Tier' },
                  { name: 'Surya Fasteners', contracts: 14, delivery: '96.0%', quality: '95.5%', stars: 4.2, status: 'Premium Tier' },
                  { name: 'Precision Rollform Components', contracts: 22, delivery: '89.5%', quality: '94.0%', stars: 3.8, status: 'Eligible Tier' },
                  { name: 'SolarMount Fabricators', contracts: 7, delivery: '92.1%', quality: '98.0%', stars: 4.0, status: 'Eligible Tier' }
                ].map((v, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{v.name}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">{v.contracts} Successful Deals</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">{v.delivery}</td>
                    <td className="p-4 font-semibold text-tata-500">{v.quality}</td>
                    <td className="p-4 text-amber-500 font-bold flex items-center gap-1">
                      {'★'.repeat(Math.floor(v.stars))}
                      {v.stars % 1 !== 0 ? '½' : ''}
                      <span className="text-[10px] text-slate-400 ml-1">({v.stars})</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${v.status === 'Elite Tier' ? 'bg-indigo-500/10 text-indigo-600' : v.status === 'Premium Tier' ? 'bg-tata-500/10 text-tata-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROCUREMENT TRENDS & STATS */}
      {activeSubTab === 'performance-reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sourcing Category Chart representation */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Procurement Share by Category</h3>
            <div className="h-56 relative flex items-center justify-center pt-4">
              {/* SVG Pie Chart Mockup */}
              <svg className="w-40 h-40" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-800"></circle>
                
                {/* Segment 1: Coated Steel (45%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0066b2" strokeWidth="4.2" strokeDasharray="45 55" strokeDashoffset="100"></circle>
                {/* Segment 2: Building Products (25%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="55"></circle>
                {/* Segment 3: Solar Mounting (20%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="30"></circle>
                {/* Segment 4: Accessories (10%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="3.5" strokeDasharray="10 90" strokeDashoffset="10"></circle>
              </svg>
              
              {/* Legend inside pie mockup */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2 text-[10px]">
                <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 rounded bg-tata-500"></span> Coated Steel (45%)</div>
                <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Building Products (25%)</div>
                <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Solar Mounting (20%)</div>
                <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 rounded bg-indigo-500"></span> Accessories (10%)</div>
              </div>
            </div>
          </div>

          {/* Monthly Savings Report panel */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Procurement Cost Reduction Reports</h3>
              <p className="text-xs text-slate-400">Comparison of base tender price caps versus actual awarded bid rates.</p>
            </div>
            
            {/* SVG Bar Chart representing monthly savings */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-slate-200/30 dark:border-slate-800/30 px-2 relative">
              <div className="flex flex-col items-center gap-1 flex-grow">
                <span className="text-[9px] font-bold text-emerald-500">-12%</span>
                <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t h-20 relative flex items-end justify-center"><div className="bg-emerald-500 w-1/2 h-14 rounded-t"></div></div>
                <span className="text-[9px] text-slate-400">Jan</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-grow">
                <span className="text-[9px] font-bold text-emerald-500">-18%</span>
                <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t h-20 relative flex items-end justify-center"><div className="bg-emerald-500 w-1/2 h-18 rounded-t"></div></div>
                <span className="text-[9px] text-slate-400">Feb</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-grow">
                <span className="text-[9px] font-bold text-emerald-500">-15%</span>
                <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t h-20 relative flex items-end justify-center"><div className="bg-emerald-500 w-1/2 h-16 rounded-t"></div></div>
                <span className="text-[9px] text-slate-400">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-grow">
                <span className="text-[9px] font-bold text-emerald-500">-22%</span>
                <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t h-20 relative flex items-end justify-center"><div className="bg-emerald-500 w-1/2 h-20 rounded-t"></div></div>
                <span className="text-[9px] text-slate-400">Apr</span>
              </div>
              
              {/* Axis values */}
              <div className="absolute left-1 top-2 text-[8px] text-slate-400 uppercase font-semibold">Avg Savings rate</div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">YTD Sourcing Cost Savings: <strong className="text-slate-800 dark:text-slate-200">₹14.2 Lakhs</strong></span>
              <button
                onClick={() => triggerReportDownload('Annual_Savings_Summary_Q1_2026')}
                className="text-xs font-bold text-tata-500 hover:underline"
              >
                Download Q1 Financial Report
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
