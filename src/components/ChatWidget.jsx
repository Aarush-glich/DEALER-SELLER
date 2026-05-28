import React, { useEffect, useRef } from 'react';

export default function ChatWidget({ chatOpen, setChatOpen, chatMessages, setChatMessages, chatInput, setChatInput }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Automated responses mockup based on keyword queries
    setTimeout(() => {
      let botReply = 'I apologize, I did not catch that. For urgent support, email contact@tatasteelcolors.com.';
      const inputLower = chatInput.toLowerCase();

      if (inputLower.includes('otp') || inputLower.includes('code')) {
        botReply = 'Namaste. If you are experiencing delays in OTP codes, use the mock code "1234" to bypass verification.';
      } else if (inputLower.includes('gst') || inputLower.includes('enroll')) {
        botReply = 'To register your enterprise, complete the Vendor Sign Up page. Provide a valid 15-character GSTIN number.';
      } else if (inputLower.includes('bid') || inputLower.includes('tender')) {
        botReply = 'Open tenders are visible in the Vendor Dashboard. Once you upload a quotation PDF, your price bid is registered.';
      } else if (inputLower.includes('hr') || inputLower.includes('admin')) {
        botReply = 'The sourcing desk login is restricted to Tata Steel Colors administrative personnel. Use email "sourcing@tatasteelcolors.com" and password "hr123" to view the sourcing dashboard.';
      }

      const botMsg = { sender: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChatMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {chatOpen ? (
        <div className="w-80 h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-fade-in">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-tata-600 to-tata-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider">Tata Steel Colors Bot</span>
            </div>
            <button onClick={() => setChatOpen(false)}>
              <svg className="w-4 h-4 text-white/80 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-tata-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/40 rounded-tl-none'}`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Chat Footer */}
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask a question..." 
              value={chatInput} 
              onChange={e => setChatInput(e.target.value)} 
              className="flex-grow px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-tata-500 focus:outline-none" 
            />
            <button type="submit" className="p-2 bg-tata-500 text-white rounded-xl hover:bg-tata-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      ) : null}

      {/* Trigger Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-tata-600 to-tata-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all relative"
        aria-label="Open support chat"
      >
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
      </button>
    </div>
  );
}
