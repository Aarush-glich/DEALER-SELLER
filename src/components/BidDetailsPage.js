function BidDetailsPage({ tenderId, tenders, submissions, setSubmissions, currentUser, authRole, setCurrentPage, triggerToast }) {
  const currentTender = tenders.find(t => t.id === tenderId);
  
  if (!currentTender) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center">
        <p class="text-slate-500">Tender not found.</p>
        <button onClick={() => setCurrentPage(authRole === 'hr' ? 'hr-dashboard' : 'vendor-dashboard')} class="mt-4 px-4 py-2 bg-tata-600 text-white rounded">Back</button>
      </div>
    );
  }

  const tenderSubmissions = submissions.filter(sub => sub.tenderId === tenderId);

  // Time remaining formatting
  const getTimerValue = (sec) => {
    if (sec <= 0) return "Closed";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div class="max-w-4xl mx-auto px-4 py-12 space-y-8 relative z-10">
      {/* Top navigation back button */}
      <button
        onClick={() => setCurrentPage(authRole === 'hr' ? 'hr-dashboard' : 'vendor-dashboard')}
        class="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-tata-600 dark:text-slate-400 dark:hover:text-tata-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </button>

      {/* Tender Specifications card */}
      <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-[10px] bg-tata-500/10 text-tata-600 dark:bg-tata-500/20 dark:text-tata-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{currentTender.category}</span>
          <span class="font-mono text-xs text-slate-400">Ref: {currentTender.id}</span>
        </div>
        <h1 class="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">{currentTender.name}</h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{currentTender.description}</p>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <div>
            <span class="block text-[10px] text-slate-400 uppercase font-semibold">Tender Qty</span>
            <span class="text-sm font-bold text-slate-900 dark:text-white">{currentTender.quantity.toLocaleString()} {currentTender.unit}</span>
          </div>
          <div>
            <span class="block text-[10px] text-slate-400 uppercase font-semibold">Base Price cap</span>
            <span class="text-sm font-bold text-slate-900 dark:text-white">₹{currentTender.basePrice} / {currentTender.unit}</span>
          </div>
          <div>
            <span class="block text-[10px] text-slate-400 uppercase font-semibold">Current Lowest Bid</span>
            <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹{currentTender.lowestBid} / {currentTender.unit}</span>
          </div>
          <div>
            <span class="block text-[10px] text-slate-400 uppercase font-semibold">Time Remaining</span>
            <span class="text-sm font-bold text-red-500 font-mono tracking-wider">{getTimerValue(currentTender.closingSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Activity Logs timeline */}
      <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
        <h3 class="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Live Sourcing Schedulers & Timeline</h3>
        <div class="space-y-4 pt-2">
          {tenderSubmissions.length === 0 ? (
            <p class="text-xs text-slate-500 text-center py-4">No bidding submissions logged for this material.</p>
          ) : (
            <div class="relative border-l border-slate-200 dark:border-slate-800 pl-5 space-y-6">
              {tenderSubmissions.map((sub, idx) => (
                <div key={idx} class="relative">
                  {/* Timeline dot */}
                  <span class="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-tata-500 border-2 border-white dark:border-slate-900"></span>
                  
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-bold text-slate-900 dark:text-white">{sub.vendorName}</span>
                      <span class="text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-500 px-2 py-0.5 rounded">Bid Placed</span>
                      <span class="text-[9px] text-slate-400 ml-auto">{sub.submittedAt}</span>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400">
                      Submitted pricing quotation at <strong class="text-emerald-600 dark:text-emerald-400">₹{sub.price}</strong> per {currentTender.unit}. Delivery ETA set before {new Date(sub.deliveryDate).toLocaleDateString()}.
                    </p>
                    <span class="block text-[10px] text-slate-400 italic">Remarks: "{sub.remarks}"</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
