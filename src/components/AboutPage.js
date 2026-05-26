function AboutPage() {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <span class="text-xs font-semibold text-tata-500 uppercase tracking-widest">Our Legacy</span>
          <h1 class="font-heading font-extrabold text-4xl text-slate-900 dark:text-white leading-tight">
            Pioneering Sourcing Transparency in the Paint & Coating Industry
          </h1>
          <p class="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Tata Colours is a pioneer in manufacturing high-grade industrial pigments, decorative paints, and performance coatings. For decades, we have partnered with hundreds of raw material suppliers to ensure chemical stability, sustainability, and quality.
          </p>
          <p class="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            This digital procurement and HR gateway represents our initiative to make bidding operations 100% auditable, transparent, and fair, cutting down procurement cycle delays by over 40%.
          </p>
        </div>
        
        {/* Interactive Image Frame mockup */}
        <div class="relative flex justify-center">
          <div class="w-full max-w-[28rem] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800 bg-slate-900">
            <div class="absolute inset-0 bg-gradient-to-br from-tata-600/35 to-indigo-900/60 z-10"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-slate-900 to-slate-950 z-0"></div>
            <div class="absolute bottom-6 left-6 z-20 space-y-1">
              <span class="text-[10px] tracking-[0.2em] font-semibold text-tata-300 uppercase">Chemical Sourcing Facility</span>
              <span class="block font-heading font-bold text-white text-lg">Mundra Petrochemical Hub, Gujarat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values grid */}
      <div class="pt-12 border-t border-slate-200/50 dark:border-slate-800/50 space-y-8">
        <h3 class="font-heading font-bold text-center text-2xl text-slate-900 dark:text-white">Our Procurement Values</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-2">
            <span class="block font-bold text-slate-900 dark:text-white">1. Integrity</span>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Sealed bids remain strictly confidential until the official closing date to ensure authentic competitive pricing.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-2">
            <span class="block font-bold text-slate-900 dark:text-white">2. Quality Assurance</span>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every vendor must fulfill strict safety inspections and supply quality test certifications before participating in auctions.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-2">
            <span class="block font-bold text-slate-900 dark:text-white">3. Fast-Track Approvals</span>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Dedicated HR and Procurement panels review comparisons and issue work orders within 24 hours of tender closing.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-2">
            <span class="block font-bold text-slate-900 dark:text-white">4. Local Partnerships</span>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Support domestic chemical manufacturers and packaging businesses under India's local sourcing schemes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
