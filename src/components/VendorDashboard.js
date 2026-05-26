function VendorDashboard({ currentUser, tenders, setTenders, submissions, setSubmissions, notifications, setNotifications, setSelectedTenderId, setCurrentPage, triggerToast, onBidSubmit }) {
  const { useState, useRef, useMemo } = React;

  const [filterCategory, setFilterCategory] = useState('All');
  const [uploadingTenderId, setUploadingTenderId] = useState(null);
  const [bidPriceInput, setBidPriceInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef();

  // Filtered Open Tenders
  const filteredTenders = useMemo(() => {
    return tenders.filter(t => {
      const catMatch = filterCategory === 'All' || t.category === filterCategory;
      const openMatch = t.status === 'Open';
      return catMatch && openMatch;
    });
  }, [tenders, filterCategory]);

  // Vendor's personal bidding history list
  const vendorBids = useMemo(() => {
    return submissions.filter(sub => sub.vendorName === currentUser.companyName);
  }, [submissions, currentUser]);

  // Analytics data calculated for Vendor
  const stats = useMemo(() => {
    const totalBids = vendorBids.length;
    const approvedBids = vendorBids.filter(b => b.status === 'Approved').length;
    const pendingBids = vendorBids.filter(b => b.status === 'Pending').length;
    return { totalBids, approvedBids, pendingBids };
  }, [vendorBids]);

  // Handle custom Drag & Drop mock uploader
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleMockUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleMockUpload(file);
  };

  const handleMockUpload = (file) => {
    if (!file.name.endsWith('.pdf')) {
      triggerToast('Only PDF documents are allowed.', 'error');
      return;
    }
    setUploadedFile(file);
    setUploadProgress(10);
    
    // Simulating upload increments
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerToast(`Uploaded ${file.name} successfully.`);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  // Placing a bid
  const handlePlaceBidSubmit = (e, tender) => {
    e.preventDefault();
    const price = parseFloat(bidPriceInput);
    if (!price || price <= 0) {
      triggerToast('Please provide a valid bid price.', 'error');
      return;
    }
    if (!uploadedFile) {
      triggerToast('Please upload your quotation PDF.', 'error');
      return;
    }

    // Add to Submissions array
    const newSubId = `SUB-${Math.floor(100 + Math.random() * 900)}`;
    const newSubmission = {
      id: newSubId,
      tenderId: tender.id,
      vendorName: currentUser.companyName,
      companyGst: currentUser.gstNumber,
      price: price,
      deliveryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      remarks: 'Bid submitted via Tata Colours Vendor Panel.'
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    // Persist to backend (fire-and-forget — optimistic update already applied)
    if (onBidSubmit) {
      onBidSubmit({
        tenderId: tender.id,
        vendorName: currentUser.companyName,
        companyGst: currentUser.gstNumber,
        price: price,
        deliveryDate: newSubmission.deliveryDate,
        fileName: uploadedFile.name,
        fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        remarks: 'Bid submitted via Tata Colours Vendor Panel.'
      });
    }

    // If price is lower than the current lowest bid, update the tender's lowest bid
    if (price < tender.lowestBid) {
      setTenders(prev => prev.map(t => {
        if (t.id === tender.id) {
          return { ...t, lowestBid: price, lowestBidder: currentUser.companyName };
        }
        return t;
      }));
      triggerToast('Success! You are now the lowest bidder on this tender.');
    } else {
      triggerToast('Bid submitted. (Note: A competitor has a lower bid on this tender.)');
    }

    // Reset state
    setUploadingTenderId(null);
    setBidPriceInput('');
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Dashboard section */}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">{currentUser.companyName}</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">GSTIN: {currentUser.gstNumber} • Account Rep: {currentUser.vendorName}</p>
        </div>
        
        {/* Quick Filter buttons */}
        <div class="flex flex-wrap gap-2">
          {['All', 'Chemicals', 'Pigments', 'Packaging Materials', 'Industrial Solvents'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              class={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${filterCategory === cat ? 'bg-tata-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stat widgets / cards */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center justify-between">
          <div>
            <span class="block text-2xl font-bold text-slate-900 dark:text-white">{stats.totalBids}</span>
            <span class="text-xs text-slate-500 uppercase tracking-widest font-semibold">Tenders Bid</span>
          </div>
          <div class="p-3.5 bg-tata-500/10 text-tata-500 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center justify-between">
          <div>
            <span class="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.approvedBids}</span>
            <span class="text-xs text-slate-500 uppercase tracking-widest font-semibold">Approved Bids</span>
          </div>
          <div class="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center justify-between">
          <div>
            <span class="block text-2xl font-bold text-amber-500">{stats.pendingBids}</span>
            <span class="text-xs text-slate-500 uppercase tracking-widest font-semibold">Pending Audits</span>
          </div>
          <div class="p-3.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ACTIVE BIDDING OPPORTUNITIES */}
        <div class="lg:col-span-8 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              Active procurement Tenders ({filteredTenders.length})
            </h3>
          </div>

          {filteredTenders.length === 0 ? (
            <div class="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
              <p class="text-slate-500">No active tenders found under this category.</p>
            </div>
          ) : (
            <div class="space-y-4">
              {filteredTenders.map(tnd => {
                const isBiddingOpen = tnd.status === 'Open';
                const hasSubmitted = submissions.some(sub => sub.tenderId === tnd.id && sub.vendorName === currentUser.companyName);
                
                // Countdown formatting helper local to map
                const getTimerValue = (sec) => {
                  if (sec <= 0) return "Closed";
                  const h = Math.floor(sec / 3600);
                  const m = Math.floor((sec % 3600) / 60);
                  const s = sec % 60;
                  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                };

                return (
                  <div 
                    key={tnd.id}
                    class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div class="flex items-center gap-2.5 flex-wrap">
                          <span class="text-[10px] bg-tata-500/10 text-tata-600 dark:bg-tata-500/20 dark:text-tata-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tnd.category}</span>
                          <span class="text-xs text-slate-400 font-medium">Tender Ref: {tnd.id}</span>
                        </div>
                        <h4 class="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1">{tnd.name}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">{tnd.description}</p>
                      </div>
                      
                      {/* Live Ticker and status */}
                      <div class="text-right flex flex-col items-end gap-1">
                        <span class="text-[10px] text-slate-400 uppercase font-semibold">Tender Closes In</span>
                        <span class="font-mono text-sm font-bold text-red-500 px-3 py-1 rounded bg-red-500/10 border border-red-500/10 tracking-widest">
                          {getTimerValue(tnd.closingSeconds)}
                        </span>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-slate-800/50">
                      <div>
                        <span class="block text-[10px] text-slate-400 uppercase font-semibold">Required Qty</span>
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{tnd.quantity.toLocaleString()} {tnd.unit}</span>
                      </div>
                      <div>
                        <span class="block text-[10px] text-slate-400 uppercase font-semibold">Base Price limit</span>
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200">₹{tnd.basePrice} / {tnd.unit}</span>
                      </div>
                      <div>
                        <span class="block text-[10px] text-slate-400 uppercase font-semibold">Lowest Bid (Low)</span>
                        <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">₹{tnd.lowestBid} / {tnd.unit}</span>
                      </div>
                      <div>
                        <span class="block text-[10px] text-slate-400 uppercase font-semibold">Delivery Target</span>
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{new Date(tnd.requiredDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Bid Placement Controls */}
                    {uploadingTenderId === tnd.id ? (
                      <form onSubmit={(e) => handlePlaceBidSubmit(e, tnd)} class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 space-y-4">
                        <h5 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Place Quotation Proposal</h5>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div class="space-y-1">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase">Your Price (per {tnd.unit})</label>
                            <input 
                              type="number" required placeholder={`Max ₹${tnd.basePrice}`}
                              value={bidPriceInput}
                              onChange={e => setBidPriceInput(e.target.value)}
                              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
                            />
                          </div>
                          
                          {/* Drag & Drop File area */}
                          <div class="space-y-1">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase">Quotation PDF Doc</label>
                            <div 
                              onDragOver={e => e.preventDefault()}
                              onDrop={handleFileDrop}
                              onClick={() => fileInputRef.current.click()}
                              class="w-full px-3 py-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-center cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-center flex-col gap-1 min-h-[56px]"
                            >
                              <input type="file" ref={fileInputRef} class="hidden" accept=".pdf" onChange={handleFileSelect} />
                              {uploadedFile ? (
                                <span class="text-[10px] text-emerald-600 font-bold max-w-xs truncate">{uploadedFile.name} ({(uploadedFile.size/1024).toFixed(0)}KB)</span>
                              ) : (
                                <span class="text-[9px] text-slate-400 font-semibold">Click to upload quotation PDF</span>
                              )}
                            </div>
                            {uploadProgress > 0 && (
                              <div class="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded overflow-hidden mt-1">
                                <div class="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div class="flex justify-end gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                          <button 
                            type="button" onClick={() => { setUploadingTenderId(null); setUploadedFile(null); }}
                            class="px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            class="px-4 py-1.5 bg-gradient-to-r from-tata-600 to-tata-500 text-white text-xs font-bold rounded-lg shadow-sm"
                          >
                            Submit Bid Quotation
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <button
                          onClick={() => { setSelectedTenderId(tnd.id); setCurrentPage('bid-details'); }}
                          class="text-xs font-bold text-tata-600 hover:text-tata-800 dark:text-tata-400 dark:hover:text-tata-300 flex items-center gap-1"
                        >
                          View Bid Activity & History
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>

                        <button
                          onClick={() => setUploadingTenderId(tnd.id)}
                          class={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${hasSubmitted ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:bg-tata-500/10 hover:text-tata-500 border border-slate-200/40 dark:border-slate-700/40' : 'bg-gradient-to-r from-tata-600 to-tata-500 hover:from-tata-700 hover:to-tata-600 text-white'}`}
                        >
                          {hasSubmitted ? 'Modify Active Bid' : 'Place Bid Offer'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: VENDOR ACTIONS & LOGS */}
        <div class="lg:col-span-4 space-y-6">
          
          {/* Sleek SVG Chart representation for Bid Competitiveness */}
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Pricing Competitiveness</h4>
              <span class="text-[9px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-bold uppercase">Mock Trend</span>
            </div>
            <div class="h-40 relative flex items-end justify-between px-2 pt-8">
              {/* Custom SVG Line Chart */}
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0066b2" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#0066b2" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="#cbd5e1" stroke-dasharray="1 3" stroke-width="0.25" class="dark:stroke-slate-800" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" stroke-dasharray="1 3" stroke-width="0.25" class="dark:stroke-slate-800" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="#cbd5e1" stroke-dasharray="1 3" stroke-width="0.25" class="dark:stroke-slate-800" />
                
                {/* Area path */}
                <path d="M 0 35 Q 25 15 50 25 T 100 5 L 100 40 L 0 40 Z" fill="url(#chartGradient)"></path>
                {/* Stroke path */}
                <path d="M 0 35 Q 25 15 50 25 T 100 5" fill="none" stroke="#0066b2" stroke-width="0.75" class="dark:stroke-tata-400"></path>
                
                {/* Pulsing Dot */}
                <circle cx="100" cy="5" r="1.5" fill="#10b981" class="animate-pulse"></circle>
              </svg>
              <span class="text-[9px] text-slate-400 absolute left-1 bottom-1">May 1</span>
              <span class="text-[9px] text-slate-400 absolute right-1 bottom-1 font-bold">Live Bid</span>
            </div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              The chart tracks your average deviation from the lowest bid. Green indicators suggest that your quotation is highly competitive.
            </p>
          </div>

          {/* Bidding History List */}
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Your Quotation Logs</h4>
            
            {vendorBids.length === 0 ? (
              <p class="text-xs text-slate-500 text-center py-4">You have not submitted any bids yet.</p>
            ) : (
              <div class="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {vendorBids.map(b => {
                  const associatedTender = tenders.find(t => t.id === b.tenderId);
                  const statusStyles = b.status === 'Approved' 
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10' 
                    : b.status === 'Rejected' 
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/10' 
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/10';

                  return (
                    <div key={b.id} class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div class="min-w-0">
                        <span class="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{associatedTender?.name || b.tenderId}</span>
                        <span class="text-[9px] text-slate-400 block">Submitted: {b.submittedAt}</span>
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200">₹{b.price}</span>
                      </div>
                      
                      <span class={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusStyles}`}>
                        {b.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive notification logs panel */}
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">System Broadcasts</h4>
              <button onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))} class="text-[9px] text-tata-500 font-bold hover:underline">Mark all read</button>
            </div>

            <div class="space-y-3">
              {notifications.map(n => (
                <div key={n.id} class={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${n.read ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-900' : 'bg-tata-500/5 dark:bg-tata-500/10 border-tata-500/10 dark:border-tata-500/25'}`}>
                  <span class={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-tata-500 animate-pulse'}`}></span>
                  <div>
                    <span class="block text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">{n.message}</span>
                    <span class="text-[9px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
