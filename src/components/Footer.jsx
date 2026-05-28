import React from 'react';

export default function Footer({ setCurrentPage, setAuthRole, setAuthMode }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800/80 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-tata-700 font-heading font-extrabold text-lg rounded-xl flex items-center justify-center">T</div>
            <span className="font-heading font-bold text-white text-base tracking-tight">TATA STEEL COLORS</span>
          </div>
          <p className="leading-relaxed font-light text-slate-500">
            Tata Steel Colors provides coated steel, roofing and wall cladding, smart building, solar mounting, and pre-engineered building solutions across India.
          </p>
        </div>

        <div>
          <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Portal Directories</h5>
          <ul className="space-y-2">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Corporate Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Sourcing</button></li>
            <li><button onClick={() => { setAuthRole('vendor'); setAuthMode('login'); setCurrentPage('auth'); }} className="hover:text-white transition-colors">Vendor Sourcing Gate</button></li>
            <li><button onClick={() => { setAuthRole('hr'); setAuthMode('login'); setCurrentPage('auth'); }} className="hover:text-white transition-colors">Sourcing Administration</button></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">procurement Help</h5>
          <ul className="space-y-2 text-slate-500">
            <li>Helpdesk: contact@tatasteelcolors.com</li>
            <li>Toll Free: 1800 270 8333</li>
            <li>GSTIN Verification: gst.gov.in</li>
            <li>Corporate Office: Pune, Maharashtra</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="text-white font-bold uppercase tracking-wider text-[10px]">Regulatory Certification</h5>
          <p className="text-slate-500 leading-relaxed font-light">
            Tata Steel Colors bidding portals adhere to central e-procurement guidelines and ISO-certified digital tender protocols.
          </p>
          <div className="flex gap-4 text-slate-500">
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">Facebook</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-center text-slate-600">
        &copy; {new Date().getFullYear()} Tata Steel Colors Private Limited. All rights reserved. Tata group trademark policies apply.
      </div>
    </footer>
  );
}
