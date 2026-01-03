
import React from 'react';
import { Search, LayoutGrid, Lock } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  view: 'Store' | 'Dashboard';
  setView: (v: 'Store' | 'Dashboard') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  view, setView, searchQuery, setSearchQuery, activeCategory, setActiveCategory 
}) => {
  return (
    <header className="sticky top-0 z-[60] bg-[#0E0E12]/95 backdrop-blur-md border-b border-white/5 pt-5 pb-4">
      <div className="container mx-auto px-4">
        {/* Top Row: Logo, Tagline, Search, Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex flex-col cursor-pointer shrink-0" onClick={() => setView('Store')}>
              <h1 className="text-3xl font-black bg-gradient-to-r from-[#00C6A9] to-[#6C63FF] bg-clip-text text-transparent tracking-tighter">
                GROBERN
              </h1>
            </div>
            <div className="hidden lg:block text-gray-400 text-xs font-medium tracking-tight border-l border-white/10 pl-8 py-1">
              Smart Web Apps for Modern Businesses
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00C6A9] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A24] border-none rounded-full py-2.5 pl-12 pr-6 text-sm text-white focus:ring-1 focus:ring-[#00C6A9] transition-all placeholder-gray-500"
              />
            </div>
            
            <button 
              onClick={() => setView(view === 'Store' ? 'Dashboard' : 'Store')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg shrink-0 ${
                view === 'Dashboard' 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-[#00C6A9] text-black hover:bg-[#00b398]'
              }`}
            >
              {view === 'Store' ? <Lock size={18} strokeWidth={2.5} /> : <LayoutGrid size={18} strokeWidth={2.5} />}
              <span className="text-sm uppercase tracking-tight">
                {view === 'Store' ? 'Dashboard' : 'Store'}
              </span>
            </button>
          </div>
        </div>

        {/* Categories Row - only show when in Store view */}
        {view === 'Store' && (
          <div className="flex gap-3 overflow-x-auto mt-6 pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                className={`whitespace-nowrap px-8 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                  activeCategory === cat 
                    ? 'bg-[#00C6A9] text-black border-[#00C6A9]' 
                    : 'bg-transparent text-white border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
