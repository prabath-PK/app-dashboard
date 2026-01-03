
import React from 'react';
import { AppEntry } from '../types';
import * as Icons from 'lucide-react';
import { PlayCircle, Info, Flame } from 'lucide-react';

interface StoreFrontProps {
  apps: AppEntry[];
  onDetails: (app: AppEntry) => void;
}

const StoreFront: React.FC<StoreFrontProps> = ({ apps, onDetails }) => {
  const topApps = apps.filter(a => a.status === 'Popular' || a.status === 'New').slice(0, 4);

  return (
    <div className="space-y-16 mt-8">
      {topApps.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Flame className="text-[#00C6A9]" fill="currentColor" size={24} /> Top Used Apps
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
            {topApps.map(app => (
              <div key={app.id} className="flex-shrink-0">
                <AppCard app={app} onDetails={onDetails} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Icons.LayoutGrid className="text-[#00C6A9]" size={24} /> All Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {apps.map(app => (
            <AppCard key={app.id} app={app} onDetails={onDetails} />
          ))}
        </div>
        {apps.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10 w-full">
            <p className="text-gray-500 font-medium">No applications found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

const AppCard: React.FC<{ app: AppEntry, onDetails: (app: AppEntry) => void }> = ({ app, onDetails }) => {
  const IconComponent = (Icons as any)[app.icon] || Icons.Package;
  
  return (
    <div className="group relative bg-[#1A1A24] rounded-3xl p-6 border border-white/5 hover:border-[#00C6A9]/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 w-[300px] h-[300px] flex flex-col justify-between overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00C6A9] to-[#6C63FF] rounded-t-3xl opacity-40 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Status Badge */}
      {app.status !== 'Published' && (
        <div className="absolute top-4 right-4 bg-[#00C6A9] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter z-10">
          {app.status}
        </div>
      )}

      <div>
        <div className="w-14 h-14 bg-gradient-to-br from-[#00C6A9] to-[#6C63FF] rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl shadow-black/30 group-hover:scale-105 transition-transform shrink-0">
          <IconComponent size={28} />
        </div>

        <h3 className="text-lg font-bold mb-1 group-hover:text-[#00C6A9] transition-colors truncate">{app.name}</h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed min-h-[32px]">
          {app.description}
        </p>

        <div className="mb-4">
          <span className="inline-block bg-[#6C63FF]/10 text-[#6C63FF] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
            {app.category}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button 
          onClick={() => app.demoUrl && window.open(app.demoUrl, '_blank')}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#00C6A9] hover:bg-[#00b398] text-black text-xs font-bold py-2.5 rounded-2xl transition-all shadow-lg shadow-[#00C6A9]/10"
        >
          <PlayCircle size={14} /> Demo
        </button>
        <button 
          onClick={() => onDetails(app)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 rounded-2xl border border-white/10 transition-all"
        >
          <Info size={14} /> Details
        </button>
      </div>
    </div>
  );
};

export default StoreFront;
