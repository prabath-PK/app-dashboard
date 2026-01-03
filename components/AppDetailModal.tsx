
import React from 'react';
import { X, CheckCircle, List, Star, PlayCircle, Mail, Edit } from 'lucide-react';
import { AppEntry } from '../types';
import * as Icons from 'lucide-react';

interface AppDetailModalProps {
  app: AppEntry;
  onClose: () => void;
  onEdit?: (app: AppEntry) => void;
}

const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose, onEdit }) => {
  const IconComponent = (Icons as any)[app.icon] || Icons.Package;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-3xl rounded-[24px] border border-white/5 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-white">App Details</h2>
          <div className="flex items-center gap-4">
            {onEdit && (
              <button 
                onClick={() => onEdit(app)}
                className="flex items-center gap-2 text-[#00C6A9] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <Edit size={18} /> Edit App
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {/* App Identity Section */}
          <div className="flex gap-6 mb-10 mt-4">
            <div className="w-32 h-32 bg-gradient-to-br from-[#00C6A9] to-[#6C63FF] rounded-3xl flex items-center justify-center text-white shadow-lg shrink-0">
              <IconComponent size={56} />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">{app.name}</h1>
              <p className="text-gray-400 text-lg">{app.description}</p>
              <div className="mt-1">
                <span className="bg-[#24244D] text-[#6C63FF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {app.category}
                </span>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
              <List size={22} className="text-[#00C6A9]" /> Overview
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              {app.description} Our {app.name} provides a comprehensive set of tools designed specifically for modern businesses to optimize their {app.category.toLowerCase()} workflow and improve guest satisfaction.
            </p>
          </div>

          {/* Key Features Section */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
              <Star size={22} className="text-[#00C6A9]" /> Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {app.features.length > 0 ? (
                app.features.map(f => (
                  <div key={f.id} className="flex items-center gap-3 group">
                    <CheckCircle size={20} className="text-[#00C6A9] shrink-0" />
                    <span className="text-white font-medium group-hover:text-[#00C6A9] transition-colors">
                      {f.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-gray-500 italic text-sm">No specific features listed for this app yet.</div>
              )}
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-white/5">
            <button 
              onClick={() => app.demoUrl && window.open(app.demoUrl, '_blank')}
              className="flex-1 flex items-center justify-center gap-2 bg-[#00C6A9] hover:bg-[#00b398] text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#00C6A9]/10"
            >
              <PlayCircle size={20} /> Try Demo
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#121212] hover:bg-white/5 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all">
              <Mail size={20} /> Contact Us
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AppDetailModal;
