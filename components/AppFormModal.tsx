
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Trash2, Check, Loader2, Image as ImageIcon, Star, Link as LinkIcon } from 'lucide-react';
import { AppEntry, AppFeature } from '../types';
import { CATEGORIES } from '../constants';
import { generateAppMetadata } from '../services/geminiService';

interface AppFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: AppEntry) => void;
  editingApp?: AppEntry;
}

const AppFormModal: React.FC<AppFormModalProps> = ({ onClose, onSave, editingApp }) => {
  const [formData, setFormData] = useState<Omit<AppEntry, 'id'>>({
    name: '',
    description: '',
    category: 'POS',
    icon: 'Calculator',
    status: 'Draft',
    demoUrl: '',
    features: []
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (editingApp) {
      setFormData({ ...editingApp });
    }
  }, [editingApp]);

  const handleGeminiFill = async () => {
    if (!formData.name) {
      alert("Please enter an App Name first so Gemini can brainstorm ideas!");
      return;
    }
    setIsGenerating(true);
    const result = await generateAppMetadata(formData.name, formData.category);
    if (result) {
      setFormData(prev => ({
        ...prev,
        description: result.description,
        features: result.features.map((f: any, idx: number) => ({
          id: `gen-${idx}-${Date.now()}`,
          ...f
        }))
      }));
    }
    setIsGenerating(false);
  };

  const addFeature = () => {
    const newFeature: AppFeature = { id: Date.now().toString(), title: '', description: '' };
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature] }));
  };

  const updateFeature = (id: string, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const removeFeature = (id: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingApp?.id || Math.random().toString(36).substr(2, 9)
    } as AppEntry);
  };

  const inputContainerStyles = "bg-[#1A1B22] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus-within:ring-1 focus-within:ring-[#00C6A9] transition-all";
  const darkInputStyles = "bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus-within:ring-1 focus-within:ring-[#00C6A9] transition-all";
  const labelStyles = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E0E12] w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-[24px] border border-white/5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-10 py-8 flex justify-between items-center border-b border-white/5">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {editingApp ? 'Edit Application' : 'New Application'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-10 pt-8 pb-10 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Section */}
            <div className="space-y-8">
              {/* App Name */}
              <div>
                <label className={labelStyles}>App Name</label>
                <div className={inputContainerStyles}>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Restaurant POS"
                    className="w-full bg-transparent outline-none border-none p-0 text-white placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Category</label>
                  <div className={inputContainerStyles}>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-transparent outline-none border-none p-0 text-white cursor-pointer appearance-none"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat} className="text-black bg-white">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>Status</label>
                  <div className={inputContainerStyles}>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-transparent outline-none border-none p-0 text-white cursor-pointer appearance-none"
                    >
                      <option value="Draft" className="text-black bg-white">Draft</option>
                      <option value="Published" className="text-black bg-white">Published</option>
                      <option value="Popular" className="text-black bg-white">Popular</option>
                      <option value="New" className="text-black bg-white">New</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={labelStyles}>Description</label>
                  <button 
                    type="button"
                    onClick={handleGeminiFill}
                    disabled={isGenerating}
                    className="flex items-center gap-2 text-[10px] font-bold text-[#00C6A9] hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} 
                    AUTO-FILL (GEMINI AI)
                  </button>
                </div>
                <div className={inputContainerStyles}>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    placeholder="Streamline restaurant operations..."
                    className="w-full bg-transparent outline-none border-none p-0 text-white placeholder-gray-600 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Icon Picker - Solid Black Background */}
              <div>
                 <label className={labelStyles}>Icon Selection</label>
                 <div className={darkInputStyles}>
                    <div className="flex items-center gap-4">
                        <ImageIcon className="text-[#00C6A9]" size={18} />
                        <select
                          value={formData.icon}
                          onChange={e => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full bg-transparent outline-none border-none p-0 text-white cursor-pointer appearance-none text-sm font-mono"
                        >
                          <option value="Calculator" className="text-black bg-white">fa-cash-register</option>
                          <option value="Calendar" className="text-black bg-white">fa-calendar-check</option>
                          <option value="Store" className="text-black bg-white">fa-store</option>
                          <option value="Layers" className="text-black bg-white">fa-layer-group</option>
                          <option value="Package" className="text-black bg-white">fa-box</option>
                        </select>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-8 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Star size={14} className="text-[#00C6A9]" /> Key Features ({formData.features.length})
                </label>
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="text-[#00C6A9] hover:bg-[#00C6A9]/10 p-1.5 rounded-lg transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Features List */}
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
                {formData.features.map(feature => (
                  <div key={feature.id} className="relative bg-[#1A1B22] border border-white/5 rounded-2xl p-5 transition-all group hover:border-[#00C6A9]/30">
                    <button 
                      type="button"
                      onClick={() => removeFeature(feature.id)}
                      className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                        <Check size={16} className="text-[#00C6A9] shrink-0" />
                        <input 
                          value={feature.title}
                          onChange={e => updateFeature(feature.id, 'title', e.target.value)}
                          placeholder="Feature Title"
                          className="w-full bg-transparent text-white text-base font-bold focus:outline-none placeholder-gray-600"
                        />
                      </div>
                      <textarea 
                        value={feature.description}
                        onChange={e => updateFeature(feature.id, 'description', e.target.value)}
                        placeholder="Describe this feature..."
                        className="w-full bg-transparent text-gray-400 text-xs focus:outline-none resize-none leading-relaxed placeholder-gray-600 pl-7"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Demo Link - Solid Black Background */}
              <div>
                 <label className={labelStyles}>Live Demo URL</label>
                 <div className={darkInputStyles}>
                    <div className="flex items-center gap-4">
                      <LinkIcon size={16} className="text-[#00C6A9]" />
                      <input 
                        type="url"
                        value={formData.demoUrl}
                        onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                        placeholder="https://example.com/demo"
                        className="w-full bg-transparent border-none outline-none p-0 text-white text-xs placeholder-gray-700 font-mono"
                      />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-10 mt-12 pt-8 border-t border-white/5">
            <button 
              type="button"
              onClick={onClose}
              className="text-gray-400 font-bold text-base hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center gap-3 bg-[#00C6A9] hover:bg-[#00b398] text-black font-black px-12 py-4 rounded-xl transition-all shadow-xl shadow-[#00C6A9]/10"
            >
              <Check size={20} strokeWidth={3} /> {editingApp ? 'Update App' : 'Create App'}
            </button>
          </div>
        </form>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AppFormModal;
