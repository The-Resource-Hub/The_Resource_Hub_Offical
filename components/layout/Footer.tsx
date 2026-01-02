
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    products: [
      { label: 'All Products', href: '#' },
      { label: 'New Releases', href: '#' },
      { label: 'Bestsellers', href: '#' },
      { label: 'Premium Assets', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  return (
    <footer className="mt-32 py-16 border-t border-white/5 text-center relative overflow-hidden bg-black/60 backdrop-blur-sm">
      {/* Subtle background glow/pattern for graphical appeal */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-purple-900/10 to-transparent blur-3xl opacity-30 pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-[0.2em] mb-4">
          THE RESOURCE HUB
        </h3>
        <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold mb-12">
          Redefining Digital Commerce
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-left mb-16">
          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {navLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-3">
              {navLinks.products.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-3">
              {navLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected & Newsletter (Placeholder) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 text-center md:text-right">
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Stay Connected</h4>
            <div className="flex justify-center md:justify-end gap-4 mb-8">
              <a href="#" className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
            {/* Newsletter placeholder */}
            <p className="text-white/50 text-xs mt-4">Subscribe for exclusive offers.</p>
            <div className="relative mt-2 max-w-[280px] mx-auto md:mr-0">
               <input type="email" placeholder="Your email" className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-xs text-white placeholder:text-white/20 outline-none focus:border-white/30" />
               <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 rounded-md text-white/50 hover:text-white hover:bg-white/20 transition-colors text-xs">GO</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-white/30 text-xs font-medium mt-12 flex items-center justify-center gap-1">
          &copy; {currentYear} The Resource Hub. All rights reserved. Made with <Heart size={14} className="text-red-500 fill-red-500/50" />
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);