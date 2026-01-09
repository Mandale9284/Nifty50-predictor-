
import React, { useState, useRef, useEffect } from 'react';
import { analyzeMarket } from './services/geminiService';
import { PredictionResult } from './types';
import InfoCard from './components/InfoCard';
import ActionPlanCard from './components/ActionPlanCard';
import PasswordWall from './components/PasswordWall';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [query, setQuery] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('nifty_pro_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('nifty_pro_unlocked', 'true');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const prediction = await analyzeMarket({
        query,
        image: image || undefined
      });
      setResult(prediction);
    } catch (err: any) {
      console.error(err);
      setError("सिस्टम में एरर आया है। कृपया थोड़ी देर बाद फिर से कोशिश करें। " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setQuery('');
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const parseResponse = (rawText: string) => {
    const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
    let actionPlan = null;
    let markdown = rawText;

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        actionPlan = parsed.action_plan;
        markdown = rawText.replace(jsonMatch[0], '').trim();
      } catch (e) {
        console.error("Failed to parse action plan JSON", e);
      }
    }

    return { actionPlan, markdown };
  };

  const { actionPlan, markdown } = result ? parseResponse(result.text) : { actionPlan: null, markdown: '' };

  if (!isUnlocked) {
    return <PasswordWall onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">N</div>
            <span className="font-bold text-xl tracking-tight">NiftyPredict<span className="text-blue-500">Pro</span></span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 border border-emerald-400/20 px-4 py-1.5 rounded-full bg-emerald-400/5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            LIVE NSE FEED
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {!result ? (
          <>
            <section className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-br from-white via-blue-400 to-indigo-600 bg-clip-text text-transparent leading-tight">
                आज का निफ्टी <br/> प्रेडिक्शन
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                लाइव ऑप्शन चेन और चार्ट एनालिसिस के साथ हिंदी में सटीक ट्रेडिंग सिग्नल।
              </p>
            </section>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-8 mb-16 backdrop-blur-sm">
              <div className="space-y-3">
                <label className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 px-1">
                  <i className="fas fa-terminal text-blue-500"></i> मार्केट स्थिति (Market Outlook)
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="उदा. आज बाजार ऊपर जाएगा या नीचे? मुख्य सपोर्ट कहाँ है?"
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 text-white placeholder-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all resize-none min-h-[120px] text-lg"
                />
              </div>

              <div className="space-y-3">
                <label className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 px-1">
                  <i className="fas fa-camera text-blue-500"></i> चार्ट इमेज (Chart Upload)
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-800/30 transition-all group ${image ? 'border-blue-500/50 bg-blue-500/5' : ''}`}
                >
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  {image ? (
                    <div className="relative w-full max-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800">
                      <img src={image} alt="Chart" className="w-full h-full object-contain bg-slate-950" />
                      <button onClick={(e) => { e.stopPropagation(); setImage(null); }} className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"><i className="fas fa-times"></i></button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fas fa-chart-line text-2xl text-blue-500"></i>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-200 font-bold">अपना ट्रेडिंग चार्ट यहाँ डालें</p>
                        <p className="text-slate-500 text-xs mt-1">AI पैटर्न और लेवल्स को पहचानेगा</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading}
                className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all ${
                  loading ? 'bg-slate-800 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-[0_15px_60px_-10px_rgba(59,130,246,0.5)] active:scale-95'
                }`}
              >
                {loading ? <><i className="fas fa-circle-notch fa-spin"></i> एनालिसिस हो रहा है...</> : <><i className="fas fa-bolt"></i> प्रेडिक्शन देखें</>}
              </button>

              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center font-bold">{error}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon="fa-robot" title="AI विज़न" colorClass="bg-blue-600" description="चार्ट पैटर्न्स और कैंडलस्टिक्स का सटीक हिंदी विश्लेषण।" />
              <InfoCard icon="fa-database" title="लाइव डेटा" colorClass="bg-emerald-600" description="OI और PCR डेटा के साथ असली मार्केट ट्रेंड।" />
              <InfoCard icon="fa-bullseye" title="टारगेट लेवल्स" colorClass="bg-indigo-600" description="एंट्री, एग्जिट और स्टॉप-लॉस की पूरी जानकारी।" />
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
            <div className="flex items-center justify-between sticky top-20 z-40 bg-[#020617]/80 backdrop-blur-lg py-4 rounded-full px-6 border border-slate-800/50 shadow-xl">
              <h2 className="text-lg font-black flex items-center gap-3">
                <i className="fas fa-magic text-blue-500"></i> AI प्रेडिक्शन रिपोर्ट
              </h2>
              <button onClick={reset} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-full font-bold text-sm transition-all">नई प्रेडिक्शन</button>
            </div>

            {actionPlan && <ActionPlanCard data={actionPlan} />}

            <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="prose prose-invert prose-blue max-w-none relative z-10">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>

            {result.sources.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Data Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.sources.map((chunk, idx) => chunk.web && (
                    <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl hover:border-blue-500/30 transition-all flex items-center gap-4">
                      <i className="fas fa-link text-blue-500 text-xs"></i>
                      <span className="text-xs text-slate-400 truncate font-bold">{chunk.web.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center opacity-40 hover:opacity-100 transition-opacity">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 max-w-lg mx-auto leading-relaxed">
                  Disclaimer: Trading involves risk. Analysis is for educational purposes. Consult a SEBI registered advisor.
               </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
