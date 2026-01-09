
import React, { useState } from 'react';

interface PasswordWallProps {
  onUnlock: () => void;
}

const PasswordWall: React.FC<PasswordWallProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const upiId = 'mandaleganesh73427-3@oksbi';
  const amount = '1799';
  const telegramNumber = '9284313613';
  
  const upiLink = `upi://pay?pa=${upiId}&pn=NiftyPredictPro&am=${amount}&cu=INR&tn=LifetimeAccess`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '7472') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleAppPayment = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start relative z-10 py-6">
        
        {/* Payment Info Side */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-left-8 duration-500">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-xl text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 shadow-xl shadow-yellow-500/5">
              <i className="fas fa-crown"></i> Lifetime Access: ₹1799
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">प्रीमियम एक्सेस अनलॉक करें</h2>
          </div>

          <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
            लाइफ टाइम प्रेडिक्शन और एनालिसिस के लिए पेमेंट करें।
          </p>
          
          <div className="flex flex-col items-center gap-4 bg-slate-950/50 p-4 md:p-6 rounded-3xl border border-slate-800 mb-6">
            <div className="bg-white p-3 rounded-xl shadow-2xl flex items-center justify-center">
              <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-40 h-40 md:w-56 md:h-56 object-contain"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                style={{ opacity: 0, transition: 'opacity 0.3s' }}
              />
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1">QR कोड स्कैन करें या नीचे क्लिक करें</p>
              <p className="text-blue-400 font-mono font-bold text-xs md:text-sm tracking-tight">{upiId}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button 
              onClick={handleAppPayment}
              className="w-full py-4 bg-white text-black rounded-xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
            >
              <img src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg" className="w-6 h-6" alt="UPI" />
              Pay with any UPI App
            </button>
            
            <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">OR</p>

            <a 
              href={`https://t.me/+91${telegramNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#229ED9] hover:bg-[#1e8dbf] text-white rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-sky-500/10"
            >
              <i className="fab fa-telegram text-xl"></i>
              पेमेंट स्क्रीनशॉट टेलीग्राम पर भेजें
            </a>
          </div>

          <div className="flex items-center gap-3 text-slate-500 border-t border-slate-800/50 pt-4">
            <div className="flex -space-x-1.5">
               {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-800"></div>)}
            </div>
            <p className="text-[9px] font-bold uppercase tracking-tight">1,200+ traders joined today</p>
          </div>
        </div>

        {/* Password Side */}
        <div className={`bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-right-8 ${error ? 'border-red-500/50 shake' : ''}`}>
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-3xl md:text-4xl mx-auto mb-4 shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]">N</div>
            <h1 className="text-2xl md:text-3xl font-black mb-1 tracking-tight text-white">NiftyPredict<span className="text-blue-500">Pro</span></h1>
            <p className="text-slate-400 text-sm font-medium">टेलीग्राम से मिला कोड डालें</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="XXXX"
                className={`w-full bg-slate-950 border-2 rounded-xl p-5 text-center text-3xl tracking-[0.4em] text-white placeholder-slate-900 focus:outline-none transition-all ${error ? 'border-red-500/50' : 'border-slate-800 focus:border-blue-500/50'}`}
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs font-bold mt-3 text-center animate-pulse">
                   गलत कोड! कृपया सही पासवर्ड डालें।
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] rounded-xl font-black text-lg transition-all active:scale-95 text-white"
            >
              अनलॉक करें <i className="fas fa-unlock-alt ml-2"></i>
            </button>
          </form>

          <div className="mt-8 p-3 bg-slate-950/50 rounded-xl border border-slate-800/50">
             <p className="text-slate-500 text-[8px] text-center uppercase tracking-[0.1em] font-bold leading-relaxed">
                Authorized Terminal <br/> 
                <span className="text-blue-500/50">Payment Verification Active</span>
             </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .shake { animation: shake 0.2s ease-in-out both; }
      `}</style>
    </div>
  );
};

export default PasswordWall;
