
import React from 'react';

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, colorClass }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4 hover:border-slate-700 transition-colors">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <i className={`fas ${icon} text-xl text-white`}></i>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
