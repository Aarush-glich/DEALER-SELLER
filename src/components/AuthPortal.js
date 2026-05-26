function AuthPortal({ authMode, setAuthMode, authRole, setAuthRole, setCurrentUser, setCurrentPage, triggerToast, onLogin, onRegister }) {
  const { useState, useRef } = React;

  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // OTP State
  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Temp state to store authenticated user/registration details prior to OTP verification
  const [tempUser, setTempUser] = useState(null);
  const [tempRegisterData, setTempRegisterData] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please fill in all credentials.', 'error');
      return;
    }

    if (authRole === 'hr') {
      // HR Admin Login via API
      const res = await onLogin('hr', email, password);
      if (res.success) {
        setCurrentUser(res.user);
        setCurrentPage('hr-dashboard');
        triggerToast('HR Administrative session authenticated.');
      } else {
        triggerToast(res.error || 'Invalid HR credentials. (Use hr@tatacolours.com / hr123)', 'error');
      }
    } else {
      // Vendor Login via API
      const res = await onLogin('vendor', email, password);
      if (res.success) {
        setTempUser(res.user);
        setTempRegisterData(null);
        setAuthMode('otp');
        triggerToast('Verification code sent to registered mobile & email.');
      } else {
        triggerToast(res.error || 'Invalid Vendor credentials. (Use vendor@demo.com / demo123)', 'error');
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !vendorName || !gstNumber || !email || !password || !phoneNumber) {
      triggerToast('Please complete all fields.', 'error');
      return;
    }
    
    // Stash registration info until OTP is confirmed
    setTempRegisterData({
      vendorName,
      companyName,
      email,
      password,
      gstNumber,
      phone: phoneNumber
    });
    setTempUser(null);
    setAuthMode('otp');
    triggerToast('OTP code sent for GST verification.');
  };

  // OTP Inputs handler
  const handleOtpChange = (index, val) => {
    if (/^[0-9]$/.test(val) || val === '') {
      const nextOtp = [...otpInput];
      nextOtp[index] = val;
      setOtpInput(nextOtp);

      // Focus next input box
      if (val !== '' && index < 3) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otpInput[index] === '' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpInput.join('');
    if (code === '1234' || code.length === 4) {
      if (tempRegisterData) {
        // Register the vendor via API
        const res = await onRegister(tempRegisterData);
        if (res.success) {
          setCurrentUser(res.user);
          setCurrentPage('vendor-dashboard');
          triggerToast('Vendor registration & authentication successful.');
        } else {
          triggerToast(res.error || 'Registration failed.', 'error');
          setAuthMode('signup');
        }
      } else if (tempUser) {
        // Finish vendor login
        setCurrentUser(tempUser);
        setCurrentPage('vendor-dashboard');
        triggerToast('Vendor authentication successful.');
      } else {
        // Mock fallback if states somehow are empty
        const newUser = {
          companyName: companyName || 'Aura Fine Chem',
          vendorName: vendorName || 'Amit Goenka',
          gstNumber: gstNumber || '27AAAAA1234B1Z5',
          email: email || 'procure@aurachem.in',
          phone: phoneNumber || '+91 99887 76655'
        };
        setCurrentUser(newUser);
        setCurrentPage('vendor-dashboard');
        triggerToast('Vendor authentication successful.');
      }
    } else {
      triggerToast('Incorrect OTP code. Try entering 1234.', 'error');
    }
  };

  return (
    <div class="max-w-md mx-auto px-4 py-16 relative z-10">
      <div class="p-8 rounded-3xl backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl space-y-6">
        
        {/* Header tab to switch roles (Vendor / HR) */}
        {authMode !== 'otp' && (
          <div class="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50">
            <button 
              onClick={() => { setAuthRole('vendor'); setAuthMode('login'); }}
              class={`flex-grow py-2 text-xs font-bold uppercase rounded-lg tracking-wider transition-all ${authRole === 'vendor' ? 'bg-white dark:bg-slate-900 text-tata-600 dark:text-tata-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Vendor Portal
            </button>
            <button 
              onClick={() => { setAuthRole('hr'); setAuthMode('login'); }}
              class={`flex-grow py-2 text-xs font-bold uppercase rounded-lg tracking-wider transition-all ${authRole === 'hr' ? 'bg-white dark:bg-slate-900 text-tata-600 dark:text-tata-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              HR Portal
            </button>
          </div>
        )}

        {/* Headline */}
        <div class="text-center space-y-1">
          <h2 class="font-heading font-extrabold text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : authMode === 'otp' ? 'Security Shield' : 'Reset Password'}
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {authRole === 'hr' 
              ? 'Access the internal administrative procurement desk.'
              : 'Tata Colours Secure Vendor Gateway.'}
          </p>
        </div>

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} class="space-y-4">
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder={authRole === 'hr' ? 'hr@tata.com' : 'vendor@aurachem.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-tata-500 text-sm"
              />
            </div>
            <div class="space-y-1">
              <div class="flex justify-between items-center">
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                <button type="button" onClick={() => setAuthMode('forgot')} class="text-[10px] font-semibold text-tata-500 hover:underline">Forgot Password?</button>
              </div>
              <input 
                type="password" 
                required 
                placeholder={authRole === 'hr' ? 'admin123' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-tata-500 text-sm"
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full py-3.5 bg-gradient-to-r from-tata-600 to-tata-500 hover:from-tata-700 hover:to-tata-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-tata-500/10"
            >
              Sign In
            </button>

            {authRole === 'vendor' && (
              <p class="text-center text-xs text-slate-500">
                New Vendor?{' '}
                <button type="button" onClick={() => setAuthMode('signup')} class="font-bold text-tata-500 hover:underline">Register Business</button>
              </p>
            )}
          </form>
        )}

        {/* SIGNUP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Company Name</label>
                <input 
                  type="text" required placeholder="e.g. Aura Fine Chem" value={companyName} onChange={e => setCompanyName(e.target.value)}
                  class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">GST Number</label>
                <input 
                  type="text" required placeholder="27AAAAA1234B1Z5" value={gstNumber} onChange={e => setGstNumber(e.target.value)}
                  class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Representative Name</label>
              <input 
                type="text" required placeholder="e.g. Amit Goenka" value={vendorName} onChange={e => setVendorName(e.target.value)}
                class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Official Email</label>
              <input 
                type="email" required placeholder="procure@aurachem.in" value={email} onChange={e => setEmail(e.target.value)}
                class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
                <input 
                  type="tel" required placeholder="9988776655" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                  class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                <input 
                  type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                  class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:ring-2 focus:ring-tata-500 focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full py-3 bg-gradient-to-r from-tata-600 to-tata-500 hover:from-tata-700 hover:to-tata-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Verify GST & Proceed
            </button>

            <p class="text-center text-xs text-slate-500">
              Already registered?{' '}
              <button type="button" onClick={() => setAuthMode('login')} class="font-bold text-tata-500 hover:underline">Sign In</button>
            </p>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <div class="space-y-4">
            <p class="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
              Enter your registered official email. We will send an authentication token to reset your credentials.
            </p>
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Official Email</label>
              <input 
                type="email" required placeholder="name@yourcompany.com"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-tata-500 text-sm"
              />
            </div>
            <button 
              onClick={() => { triggerToast('Password recovery instructions dispatched.'); setAuthMode('login'); }}
              class="w-full py-3 bg-gradient-to-r from-tata-600 to-tata-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Send Reset Link
            </button>
            <div class="text-center">
              <button onClick={() => setAuthMode('login')} class="text-xs font-bold text-slate-500 hover:underline">Back to Login</button>
            </div>
          </div>
        )}

        {/* OTP VERIFICATION VIEW */}
        {authMode === 'otp' && (
          <form onSubmit={handleOtpSubmit} class="space-y-6">
            <div class="text-center space-y-2">
              <p class="text-xs text-slate-500 dark:text-slate-400">
                A 4-digit code was dispatched to your mobile. Enter below to complete authorization.
              </p>
              <p class="text-xs font-semibold text-tata-500">(Enter 1234 or any 4 digits to bypass)</p>
            </div>

            <div class="flex justify-center gap-4">
              {otpInput.map((val, idx) => (
                <input 
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  maxLength="1"
                  value={val}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(idx, e)}
                  class="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:border-tata-500 focus:ring-2 focus:ring-tata-500/25 transition-all"
                />
              ))}
            </div>

            <button 
              type="submit" 
              class="w-full py-3.5 bg-gradient-to-r from-tata-600 to-tata-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Submit & Authenticate
            </button>

            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400">Didn't receive code?</span>
              <button type="button" onClick={() => triggerToast('OTP dispatched again.')} class="font-bold text-tata-500 hover:underline">Resend OTP</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
