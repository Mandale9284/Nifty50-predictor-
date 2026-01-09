
import React from 'react';

interface ActionPlanData {
  type: 'BUY' | 'SELL';
  entry: string;
  target: string;
  stop_loss: string;
  option_strike: string;
}

const ActionPlanCard: React.FC<{ data: ActionPlanData }> = ({ data }) => {
  const isBuy = data.type === 'BUY';
  const accentColor = isBuy ? 'text-emerald-400' : 'text-rose-500';
  const badgeColor = isBuy ? 'bg-emerald-500' : 'bg-rose-500';
  const label = isBuy ? 'खरीदें (BUY)' : 'बेचें (SELL)';

  return (
    <div className="bg-[#050b1a] border-2 border-slate-800 rounded-[2.5rem] p-8 shadow-2xl mb-8 relative overflow-hidden group">
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${isBuy ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
      
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-slate-400 font-bold tracking-[0.2em] text-sm">ACTION PLAN</h2>
        <span className={`${badgeColor} text-white px-6 py-2 rounded-full font-black text-sm shadow-lg`}>
          {label}
        </span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
          <span className="text-slate-400 font-medium">एंट्री लेवल (Entry):</span>
          <span className="text-2xl font-bold text-white tracking-tight">{data.entry}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
          <span className="text-slate-400 font-medium">टारगेट (Target):</span>
          <span className={`text-3xl font-black ${accentColor} tracking-tight`}>{data.target}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
          <span className="text-slate-400 font-medium">स्टॉप लॉस (Stop Loss):</span>
          <span className="text-2xl font-bold text-rose-400 tracking-tight">{data.stop_loss}</span>
        </div>
      </div>

      <div className="mt-10 bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 transition-all hover:bg-blue-500/15">
        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">BEST OPTION STRIKE</p>
        <h3 className="text-blue-400 text-3xl font-black tracking-tight">{data.option_strike}</h3>
      </div>
    </div>
  );
};

export default ActionPlanCard;
