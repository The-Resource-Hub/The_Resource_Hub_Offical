
import React from 'react';
import { motion } from 'framer-motion';

export const PlaceholderView = ({ title }: { title: string }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-96 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
        <h3 className="text-xl font-bold text-white/40 mb-2">{title}</h3>
        <p className="text-white/20 text-sm">This module is currently under development.</p>
    </motion.div>
);
