
import React from 'react';
import { AppEntry } from '../types';
import { Plus, Edit2, Trash2, ExternalLink, Activity, Info } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AdminDashboardProps {
  apps: AppEntry[];
  onEdit: (app: AppEntry) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ apps, onEdit, onDelete, onAddNew }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="text-[#00C6A9]" /> Application Dashboard
          </h2>
          <p className="text-gray-400">Manage your store inventory, categories, and smart content.</p>
        </div>
        <button 
          onClick={onAddNew}
          className="flex items-center gap-2 bg-[#00C6A9] hover:bg-[#00b398] text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#00C6A9]/10"
        >
          <Plus size={20} /> Add New App
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Apps" value={apps.length} icon={<Icons.Package className="text-[#00C6A9]" />} />
        <StatCard label="Live Services" value={apps.filter(a => a.status !== 'Draft').length} icon={<Icons.Globe className="text-[#6C63FF]" />} />
        <StatCard label="POS Solutions" value={apps.filter(a => a.category === 'POS').length} icon={<Icons.Calculator className="text-yellow-400" />} />
        <StatCard label="Drafts" value={apps.filter(a => a.status === 'Draft').length} icon={<Icons.FileText className="text-gray-400" />} />
      </div>

      <div className="bg-[#1A1A24] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                <th className="px-6 py-4">App Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {apps.map(app => {
                const IconComponent = (Icons as any)[app.icon] || Icons.Package;
                return (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#00C6A9] group-hover:bg-[#00C6A9]/10 transition-colors">
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-[#00C6A9] transition-colors">{app.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">{app.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm bg-white/5 px-2.5 py-1 rounded-md text-gray-300">
                        {app.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${
                        app.status === 'Draft' ? 'text-gray-500' : 'text-[#00C6A9]'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          app.status === 'Draft' ? 'bg-gray-500' : 'bg-[#00C6A9]'
                        }`} />
                        {app.status}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-400">{app.features.length} Items</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onEdit(app)}
                          className="p-2 bg-white/5 hover:bg-[#00C6A9]/10 text-gray-400 hover:text-[#00C6A9] rounded-lg transition-colors"
                          title="Edit App"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete(app.id)}
                          className="p-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Delete App"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: number, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-[#1A1A24] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</div>
    </div>
  </div>
);

export default AdminDashboard;
