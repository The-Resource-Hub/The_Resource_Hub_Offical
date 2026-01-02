
import React from 'react';
import { motion } from 'framer-motion';
import { AdminIcons } from '../assets/AdminIcons.tsx';

interface UsersViewProps {
    users: any[];
    onEdit: (user: any) => void;
    onBan: (user: any) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({ users, onEdit, onBan }) => {
    // Filter to show ONLY regular users (role === 'User')
    const userOnlyList = users.filter(u => u.role === 'User');

    // Calculate analytics based on the filtered list
    const analytics = {
        total: userOnlyList.length,
        active: userOnlyList.filter(u => u.status === 'Active').length,
        banned: userOnlyList.filter(u => u.status === 'Banned').length,
        premium: userOnlyList.filter(u => u.plan && u.plan !== 'Free').length
    };

    return (
        <div className="space-y-6">
            {/* User Analytics Cards */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Total Users', val: analytics.total, color: 'text-white' },
                { label: 'Active', val: analytics.active, color: 'text-emerald-400' },
                { label: 'Banned Users', val: analytics.banned, color: 'text-red-500' },
                { label: 'Premium Users', val: analytics.premium, color: 'text-cyan-400' }
              ].map((stat, i) => (
                 <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] -mr-8 -mt-8 rounded-full group-hover:bg-white/[0.05] transition-colors" />
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 relative z-10">{stat.label}</p>
                    <h3 className={`text-2xl font-black ${stat.color} relative z-10`}>{stat.val}</h3>
                 </div>
              ))}
            </motion.div>

            {/* Users Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <h3 className="text-xl font-black uppercase tracking-wider text-white">Identity Database</h3>
                    <span className="text-[10px] font-bold text-white/40 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">{userOnlyList.length} Active Records</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02]">
                            <tr>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">User</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Subscription</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Access Level</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {userOnlyList.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-6 flex items-center gap-4">
                                        <div className="relative">
                                          <img src={user.avatar} alt="" className="w-10 h-10 rounded-xl bg-white/10 border border-white/5 shadow-inner" />
                                          {user.plan !== 'Free' && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[#080808]" />
                                          )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">{user.name}</div>
                                            <div className="text-[10px] font-mono text-white/40 uppercase">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                          <span className={`text-[10px] font-black uppercase tracking-widest ${user.plan !== 'Free' ? 'text-cyan-400' : 'text-white/40'}`}>
                                              {user.plan || 'Free'}
                                          </span>
                                          <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter mt-0.5">NEXUS NODE v1</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-wider ${
                                            user.status === 'Active' ? 'text-emerald-400' :
                                            user.status === 'Banned' ? 'text-red-500' : 'text-amber-500'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                                user.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' :
                                                user.status === 'Banned' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
                                            }`} />
                                            {user.status === 'Banned' ? 'ACCOUNT BANNED' : user.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 active:scale-90"
                                                title="Edit User"
                                            >
                                                <AdminIcons.Edit />
                                            </button>
                                            <button
                                                onClick={() => onBan(user)}
                                                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/50 hover:text-red-500 transition-all border border-white/5 active:scale-90"
                                                title="Ban User Account"
                                            >
                                                <AdminIcons.Block />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};
