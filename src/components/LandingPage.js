function LandingPage({ setCurrentPage, setAuthRole, setAuthMode, tenders }) {
  const liveBidsCount = tenders.filter(t => t.status === 'Open').length;
  
  return (
    <div class="w-full">
      {/* Hero Section */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tata-500/10 text-tata-600 dark:bg-tata-500/20 dark:text-tata-400 border border-tata-500/10 dark:border-tata-500/20 text-xs font-semibold uppercase tracking-wider">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Next-Gen Procurement System v2.6
          </div>
          <h1 class="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight tracking-tight">
            Smart Raw Material Bidding Platform for <span class="text-transparent bg-clip-text bg-gradient-to-r from-tata-600 to-tata-400 dark:from-tata-400 dark:to-tata-300">Tata Colours</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Secure digital ecosystem for chemical, pigment, solvent, and packaging procurement. Ensure fair competition, real-time bid updates, transparent rankings, and automated HR approvals.
          </p>
          
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => { setAuthRole('vendor'); setAuthMode('signup'); setCurrentPage('auth'); }}
              class="px-8 py-3.5 bg-gradient-to-r from-tata-600 to-tata-500 hover:from-tata-700 hover:to-tata-600 text-white font-bold rounded-xl shadow-lg shadow-tata-500/25 hover:shadow-tata-500/35 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide flex items-center gap-2"
            >
              Vendor Sign Up
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <button 
              onClick={() => { setAuthRole('vendor'); setAuthMode('login'); setCurrentPage('auth'); }}
              class="px-8 py-3.5 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl shadow-sm transition-all text-sm uppercase tracking-wide"
            >
              Vendor Login
            </button>
            <button 
              onClick={() => { setAuthRole('hr'); setAuthMode('login'); setCurrentPage('auth'); }}
              class="px-6 py-3.5 border border-indigo-500/20 hover:border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl transition-all text-sm uppercase tracking-wide"
            >
              HR Portal Login
            </button>
          </div>
        </div>

        {/* Industrial Visual Mockup */}
        <div class="lg:col-span-5 relative flex justify-center">
          <div class="w-full max-w-[28rem] aspect-square relative rounded-3xl p-1 bg-gradient-to-tr from-tata-500/20 via-slate-200 to-tata-500/10 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 shadow-2xl flex items-center justify-center overflow-hidden border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-slate-900/20 dark:from-slate-950/20 dark:to-slate-950/60 z-0"></div>
            
            {/* SVG Gears Animation */}
            <div class="absolute top-[10%] left-[10%] opacity-20 dark:opacity-10 text-tata-500">
              <svg class="w-32 h-32 animate-gear-slow" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 34c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-38c-1.7 0-3 1.3-3 3v4.2c-2.4.5-4.7 1.5-6.8 2.8l-3-3c-1.2-1.2-3.1-1.2-4.2 0l-4.2 4.2c-1.2 1.2-1.2 3.1 0 4.2l3 3c-1.3 2.1-2.3 4.4-2.8 6.8H25c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3h4.2c.5 2.4 1.5 4.7 2.8 6.8l-3 3c-1.2 1.2-1.2 3.1 0 4.2l4.2 4.2c1.2 1.2 3.1 1.2 4.2 0l3-3c2.1 1.3 4.4 2.3 6.8 2.8V75c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-4.2c2.4-.5 4.7-1.5 6.8-2.8l3 3c1.2 1.2 3.1 1.2 4.2 0l4.2-4.2c1.2-1.2 1.2-3.1 0-4.2l-3-3c1.3-2.1 2.3-4.4 2.8-6.8H75c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3h-4.2c-.5-2.4-1.5-4.7-2.8-6.8l3-3c1.2-1.2 1.2-3.1 0-4.2l-4.2-4.2c-1.2-1.2-3.1-1.2-4.2 0l-3 3c-2.1-1.3-4.4-2.3-6.8-2.8V25c0-1.7-1.3-3-3-3h-6z"/>
              </svg>
            </div>
            <div class="absolute bottom-[10%] right-[10%] opacity-20 dark:opacity-10 text-tata-300">
              <svg class="w-40 h-40 animate-gear-slow-reverse" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 34c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-38c-1.7 0-3 1.3-3 3v4.2c-2.4.5-4.7 1.5-6.8 2.8l-3-3c-1.2-1.2-3.1-1.2-4.2 0l-4.2 4.2c-1.2 1.2-1.2 3.1 0 4.2l3 3c-1.3 2.1-2.3 4.4-2.8 6.8H25c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3h4.2c.5 2.4 1.5 4.7 2.8 6.8l-3 3c-1.2 1.2-1.2 3.1 0 4.2l4.2 4.2c1.2 1.2 3.1 1.2 4.2 0l3-3c2.1 1.3 4.4 2.3 6.8 2.8V75c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-4.2c2.4-.5 4.7-1.5 6.8-2.8l3 3c1.2 1.2 3.1 1.2 4.2 0l4.2-4.2c1.2-1.2 1.2-3.1 0-4.2l-3-3c1.3-2.1 2.3-4.4 2.8-6.8H75c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3h-4.2c-.5-2.4-1.5-4.7-2.8-6.8l3-3c1.2-1.2 1.2-3.1 0-4.2l-4.2-4.2c-1.2-1.2-3.1-1.2-4.2 0l-3 3c-2.1-1.3-4.4-2.3-6.8-2.8V25c0-1.7-1.3-3-3-3h-6z"/>
              </svg>
            </div>

            {/* Floating Glass Dashboard Panel */}
            <div class="relative z-10 w-[90%] p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border border-white/20 dark:border-slate-800/40 shadow-xl space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-tata-600 dark:text-tata-400">Live Auction Stream</span>
                <span class="flex items-center gap-1.5 text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  SIMULATED LIVE
                </span>
              </div>
              
              {/* Dynamic bid card list inside visual mockup */}
              <div class="space-y-3">
                <div class="p-3 bg-white/40 dark:bg-slate-950/40 rounded-xl flex items-center justify-between border border-white/10">
                  <div>
                    <span class="block text-xs font-bold text-slate-800 dark:text-slate-100">Titanium Dioxide</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">TND-001 • 12,000 KG</span>
                  </div>
                  <div class="text-right">
                    <span class="block text-xs font-bold text-emerald-600 dark:text-emerald-400">₹{tenders[0].lowestBid}/KG</span>
                    <span class="text-[9px] text-slate-400">{tenders[0].lowestBidder}</span>
                  </div>
                </div>
                <div class="p-3 bg-white/40 dark:bg-slate-950/40 rounded-xl flex items-center justify-between border border-white/10">
                  <div>
                    <span class="block text-xs font-bold text-slate-800 dark:text-slate-100">Butyl Acetate</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">TND-005 • 8,000 Liters</span>
                  </div>
                  <div class="text-right">
                    <span class="block text-xs font-bold text-emerald-600 dark:text-emerald-400">₹{tenders[4].lowestBid}/Ltr</span>
                    <span class="text-[9px] text-slate-400">{tenders[4].lowestBidder}</span>
                  </div>
                </div>
              </div>

              {/* Glassmorphic Chart Simulation */}
              <div class="h-20 flex items-end gap-2 pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
                <div class="flex-grow bg-tata-500/20 dark:bg-tata-500/10 rounded-t h-[40%] animate-pulse"></div>
                <div class="flex-grow bg-tata-500/45 dark:bg-tata-500/25 rounded-t h-[75%]"></div>
                <div class="flex-grow bg-gradient-to-t from-tata-600 to-tata-400 rounded-t h-[95%]"></div>
                <div class="flex-grow bg-tata-500/30 dark:bg-tata-500/15 rounded-t h-[55%] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section class="bg-white/40 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50 py-10 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div class="space-y-2">
            <span class="block font-heading font-extrabold text-4xl text-tata-600 dark:text-tata-400">142+</span>
            <span class="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">Active Verified Vendors</span>
          </div>
          <div class="space-y-2 border-y sm:border-y-0 sm:border-x border-slate-200/50 dark:border-slate-800/50 py-6 sm:py-0">
            <span class="block font-heading font-extrabold text-4xl text-tata-600 dark:text-tata-400">{liveBidsCount}</span>
            <span class="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">Live Bids Open Now</span>
          </div>
          <div class="space-y-2">
            <span class="block font-heading font-extrabold text-4xl text-tata-600 dark:text-tata-400">18,500 MT</span>
            <span class="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">Materials Procured (YTD)</span>
          </div>
        </div>
      </section>

      {/* Achievements / Features Section */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-semibold text-tata-500 uppercase tracking-widest">Enterprise Features</span>
          <h2 class="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">Built for High-Stakes Industrial Sourcing</h2>
          <p class="text-slate-500 dark:text-slate-400 font-light">Tata Colours Procurement Hub utilizes state-of-the-art bidding workflows modeled after global ERP standards.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all space-y-4">
            <div class="w-12 h-12 rounded-xl bg-tata-500/10 text-tata-600 dark:bg-tata-500/20 dark:text-tata-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Real-Time Tickers</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Bids are updated instantly in our database. Live countdown timers ensure that vendors submit final quotations before market close.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all space-y-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Transparent Rankings</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Dynamic sorting highlighting the current lowest bidding vendors, encouraging competitive raw material quotations and cost-efficient sourcing.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all space-y-4">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Secure Procurement</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Encryption-ready authentication, GSTIN validation checks, and verified OTP flows prevent fraudulent listings or bid manipulation.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-slate-200/50 dark:border-slate-800/50">
        <h3 class="font-heading font-bold text-center text-2xl text-slate-900 dark:text-white mb-10">Trusted by India's Top Material Vendors</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-4">
            <p class="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
              "Sourcing logistics with Tata Colours has never been this smooth. The live bidding timers keep the ecosystem highly transparent, and we are able to manage and upload bulk quotations effortlessly."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-tata-500 flex items-center justify-center text-white font-bold text-sm">
                AG
              </div>
              <div>
                <span class="block text-xs font-bold text-slate-900 dark:text-white">Amit Goenka</span>
                <span class="text-[10px] text-slate-400">Managing Director, Aura Fine Chem</span>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-4">
            <p class="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
              "The HR & Procurement portal allows our team to check bid rankings and submit revised prices instantly. The automated notifications ensure we never miss a paint chemical tender."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                RM
              </div>
              <div>
                <span class="block text-xs font-bold text-slate-900 dark:text-white">Rajesh Mehta</span>
                <span class="text-[10px] text-slate-400">Head Sourcing, Elite Plastics Inc</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
