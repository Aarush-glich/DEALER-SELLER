function Footer({ setCurrentPage, setAuthRole, setAuthMode }) {
  return (
    <footer class="bg-slate-900 text-slate-400 text-xs border-t border-slate-800/80 py-12 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-white text-tata-700 font-heading font-extrabold text-lg rounded-xl flex items-center justify-center">T</div>
            <span class="font-heading font-bold text-white text-base tracking-tight">TATA COLOURS</span>
          </div>
          <p class="leading-relaxed font-light text-slate-500">
            Tata Colours is a premium subsidiary of the Tata group, specializing in industrial chemical, pigment, solvent, and coating manufacturing facilities across India.
          </p>
        </div>

        <div>
          <h5 class="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Portal Directories</h5>
          <ul class="space-y-2">
            <li><button onClick={() => setCurrentPage('home')} class="hover:text-white transition-colors">Corporate Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} class="hover:text-white transition-colors">About Sourcing</button></li>
            <li><button onClick={() => { setAuthRole('vendor'); setAuthMode('login'); setCurrentPage('auth'); }} class="hover:text-white transition-colors">Vendor Sourcing Gate</button></li>
            <li><button onClick={() => { setAuthRole('hr'); setAuthMode('login'); setCurrentPage('auth'); }} class="hover:text-white transition-colors">HR Administration</button></li>
          </ul>
        </div>

        <div>
          <h5 class="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">procurement Help</h5>
          <ul class="space-y-2 text-slate-500">
            <li>Helpdesk: support@tatacolours.com</li>
            <li>Toll Free: 1800-419-8282</li>
            <li>GSTIN Verification: gst.gov.in</li>
            <li>Headquarters: Bombay House, Mumbai</li>
          </ul>
        </div>

        <div class="space-y-4">
          <h5 class="text-white font-bold uppercase tracking-wider text-[10px]">Regulatory Certification</h5>
          <p class="text-slate-500 leading-relaxed font-light">
            Tata Colours bidding portals adhere to central e-procurement guidelines and ISO-certified digital tender protocols.
          </p>
          <div class="flex gap-4 text-slate-500">
            <span class="hover:text-white cursor-pointer">LinkedIn</span>
            <span class="hover:text-white cursor-pointer">Twitter</span>
            <span class="hover:text-white cursor-pointer">Facebook</span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-center text-slate-600">
        &copy; {new Date().getFullYear()} Tata Colours Ltd. All rights reserved. Tata group trademark policies apply.
      </div>
    </footer>
  );
}
