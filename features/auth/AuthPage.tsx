
import React, { useEffect, useRef, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Chrome, Github, Globe, Eye, EyeOff } from 'lucide-react';
import { userService } from '../../services/userService';

import hubLogo from '@assets/generated_images/sleek_futuristic_cybernetic_hub_logo.png';

const GalaxyBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isWarp, setIsWarp] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const isMobile = w < 768;
    const count = isMobile ? 600 : 2000;
    const particles: Particle[] = [];

    class Particle {
      x: number = 0; y: number = 0; z: number = 0; px: number = 0; py: number = 0; color: string = '';
      constructor() {
        this.reset();
      }
      reset() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000;
        this.px = 0;
        this.py = 0;
        this.color = `hsl(\${Math.random() * 60 + 180}, 70%, 70%)`;
      }
      update(isWarp: boolean) {
        const speed = isWarp ? 50 : 2;
        this.z -= speed;
        if (this.z < 1) this.reset();
      }
      draw(ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number, y: number }) {
        const scale = 500 / this.z;
        const x2d = this.x * scale + w / 2 + (mouse.x * 0.05);
        const y2d = this.y * scale + h / 2 + (mouse.y * 0.05);

        if (this.px !== 0) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = scale * 0.5;
          ctx.beginPath();
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(x2d, y2d);
          ctx.stroke();
        }
        this.px = x2d;
        this.py = y2d;
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 2, 2, 0.2)';
      ctx.fillRect(0, 0, w, h);
      particles.forEach(p => {
        p.update(isWarp);
        p.draw(ctx, w, h, mouse);
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX - w/2, y: e.clientY - h/2 });
    };

    const handleDeviceMotion = (e: DeviceOrientationEvent) => {
        if (e.beta && e.gamma) {
            setMouse({ x: e.gamma * 15, y: (e.beta - 45) * 15 });
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceMotion);
    
    const handleWarp = (e: any) => setIsWarp(e.detail);
    window.addEventListener('galaxy-warp', handleWarp);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceMotion);
      window.removeEventListener('galaxy-warp', handleWarp);
    };
  }, [mouse, isWarp]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10 bg-black" />;
});

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    username: '', 
    email: '', 
    password: '',
    phone: '',
    referralCode: ''
  });
  const [error, setError] = useState('');

  const setWarp = (active: boolean) => {
    window.dispatchEvent(new CustomEvent('galaxy-warp', { detail: active }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWarp(true);
    
    try {
      if (mode === 'signup') {
        await userService.register(formData.email, formData.password, formData.name);
      } else {
        await userService.login(formData.email, formData.password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setWarp(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <GalaxyBackground />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
            opacity: 1, 
            y: keyboardActive ? -120 : 0, 
            scale: keyboardActive ? 0.85 : 1 
        }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <div className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 shadow-[0_0_150px_rgba(6,182,212,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              className="w-24 h-24 mx-auto mb-6 cursor-pointer relative group"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-500" />
              <img 
                src={hubLogo} 
                alt="The Resource Hub" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" 
              />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              {mode === 'login' ? 'HUB LOGIN' : 'CREATE IDENTITY'}
            </h2>
            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
              THE RESOURCE HUB SECURE PORTAL
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setKeyboardActive(true)}
                        onBlur={() => setKeyboardActive(false)}
                        placeholder="FULL NAME"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                      />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        onFocus={() => setKeyboardActive(true)}
                        onBlur={() => setKeyboardActive(false)}
                        placeholder="USERNAME"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setKeyboardActive(true)}
                      onBlur={() => setKeyboardActive(false)}
                      placeholder="WHATSAPP NUMBER (OPTIONAL)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                    />
                  </div>

                  <div className="relative">
                    <ArrowRight className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      type="text" 
                      value={formData.referralCode}
                      onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                      onFocus={() => setKeyboardActive(true)}
                      onBlur={() => setKeyboardActive(false)}
                      placeholder="REFERRAL CODE (IF ANY)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setKeyboardActive(true)}
                  onBlur={() => setKeyboardActive(false)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setKeyboardActive(true)}
                  onBlur={() => setKeyboardActive(false)}
                  placeholder="SECURE PASSWORD"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-xs focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 uppercase font-bold"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              onMouseEnter={() => setWarp(true)}
              onMouseLeave={() => setWarp(false)}
              className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50 relative group overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">{loading ? 'VERIFYING...' : mode === 'login' ? 'ACCESS HUB' : 'JOIN THE HUB'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-[10px] font-black text-white/30 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]"
            >
              {mode === 'login' ? "NEW USER? CREATE ACCOUNT" : "ALREADY REGISTERED? LOGIN"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(AuthPage);
