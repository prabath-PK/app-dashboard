
import React, { useState, useEffect } from 'react';
import { INITIAL_APPS } from './constants';
import { AppEntry, Category } from './types';
import Header from './components/Header';
import StoreFront from './components/StoreFront';
import AdminDashboard from './components/AdminDashboard';
import AppFormModal from './components/AppFormModal';
import AppDetailModal from './components/AppDetailModal';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [view, setView] = useState<'Store' | 'Dashboard'>('Store');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppEntry | undefined>(undefined);
  const [detailApp, setDetailApp] = useState<AppEntry | undefined>(undefined);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('grobern_apps');
      if (saved) {
        setApps(JSON.parse(saved));
      } else {
        setApps(INITIAL_APPS);
      }
      setIsLoading(false);
    };
    
    // Artificial small delay for aesthetic loading feel
    const timer = setTimeout(loadData, 600);
    return () => clearTimeout(timer);
  }, []);

  // Sync to LocalStorage whenever apps state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('grobern_apps', JSON.stringify(apps));
    }
  }, [apps, isLoading]);

  const handleSaveApp = (app: AppEntry) => {
    if (editingApp) {
      setApps(prev => prev.map(a => a.id === app.id ? app : a));
    } else {
      setApps(prev => [app, ...prev]);
    }
    setIsFormOpen(false);
    setEditingApp(undefined);
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      setApps(prev => prev.filter(a => a.id !== id));
    }
  };

  const filteredApps = apps.filter(app => {
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0E0E12] text-white">
      <Header 
        view={view} 
        setView={setView} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-8 relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#00C6A9] mb-4" size={48} />
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Initializing GROBERN Ecosystem...</p>
          </div>
        ) : (
          <>
            {view === 'Store' ? (
              <StoreFront 
                apps={filteredApps} 
                onDetails={(app) => setDetailApp(app)} 
              />
            ) : (
              <AdminDashboard 
                apps={apps} 
                onEdit={(app) => {
                  setEditingApp(app);
                  setIsFormOpen(true);
                }} 
                onDelete={handleDeleteApp}
                onAddNew={() => {
                  setEditingApp(undefined);
                  setIsFormOpen(true);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {isFormOpen && (
        <AppFormModal 
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingApp(undefined);
          }}
          onSave={handleSaveApp}
          editingApp={editingApp}
        />
      )}

      {detailApp && (
        <AppDetailModal 
          app={detailApp}
          onClose={() => setDetailApp(undefined)}
          onEdit={(app) => {
            setDetailApp(undefined);
            setEditingApp(app);
            setIsFormOpen(true);
          }}
        />
      )}

      <footer className="border-t border-white/10 mt-12 py-10 bg-black/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs font-medium">
          <div className="tracking-widest uppercase opacity-60">GROBERN Ecosystem &copy; 2025</div>
          <div className="flex gap-8 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-[#00C6A9] transition-colors">Support</a>
            <a href="#" className="hover:text-[#00C6A9] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#00C6A9] transition-colors">Developer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
