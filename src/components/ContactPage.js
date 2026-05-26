function ContactPage({ triggerToast }) {
  const { useState } = React;
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    triggerToast('Message received. Representative will reach out shortly.');
    setEmail('');
    setMsg('');
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Form */}
        <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
          <h2 class="font-heading font-extrabold text-2xl text-slate-900 dark:text-white uppercase tracking-tight">Direct Query</h2>
          <form onSubmit={handleContactSubmit} class="space-y-4">
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Company Name</label>
              <input type="text" required placeholder="Aura Fine Chem" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none" />
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Corporate Email</label>
              <input type="email" required placeholder="procure@aurachem.in" value={email} onChange={e => setEmail(e.target.value)} class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none" />
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Describe your procurement inquiry</label>
              <textarea required rows="4" placeholder="Enter specifications..." value={msg} onChange={e => setMsg(e.target.value)} class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"></textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-tata-600 to-tata-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md">Submit Message</button>
          </form>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div class="space-y-6">
          <h2 class="font-heading font-extrabold text-2xl text-slate-900 dark:text-white uppercase tracking-tight">Frequently Asked Questions</h2>
          <div class="space-y-4">
            {[
              { q: 'How do I enroll as an official Tata Colours vendor?', a: 'Click Vendor Sign Up, fill in your GSTIN and representative details. Upon entering OTP verification, your profile will be registered in our sourcing logs pending document approval.' },
              { q: 'How does the sealed-bidding simulation operate?', a: 'Bids remain strictly private until the timer runs down. The Lowest Bid field is dynamically evaluated by our platform to encourage competitive bids without revealing competitor names.' },
              { q: 'What quality certifications are required?', a: 'Chemical and Solvent suppliers must attach active ISO certifications and MSDS clearance sheets within the quotation PDF upload box.' }
            ].map((faq, idx) => (
              <div key={idx} class="p-5 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 space-y-2">
                <span class="block font-bold text-sm text-slate-900 dark:text-white">{faq.q}</span>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
