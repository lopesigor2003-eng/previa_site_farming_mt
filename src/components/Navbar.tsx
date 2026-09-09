import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/drones';
import { Plane, Phone, MapPin, Menu, X, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800 shadow-xl py-3'
          : 'bg-neutral-950/40 backdrop-blur-md border-b border-neutral-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  FARMING SOLUTIONS
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  MT
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 tracking-wide">
                Drones Agrícolas • Sorriso - MT
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <a href="#hero-3d-section" className="hover:text-emerald-400 transition-colors">
              Simulador 3D
            </a>
            <a href="#drone-catalog" className="hover:text-emerald-400 transition-colors">
              Frota de Drones
            </a>
            <a href="#roi-calculator" className="hover:text-emerald-400 transition-colors">
              Calculadora ROI
            </a>
            <a href="#ndvi-section" className="hover:text-emerald-400 transition-colors">
              Mapeamento NDVI
            </a>
            <a href="#services-section" className="hover:text-emerald-400 transition-colors">
              Oficina & Peças
            </a>
            <a href="#location-section" className="hover:text-emerald-400 transition-colors">
              Localização (Maps)
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="nav-whatsapp-btn"
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 transition-all hover:scale-[1.02]"
              title="Falar no WhatsApp com o time de Sorriso"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>(62) 9962-1054</span>
            </a>

            <button
              id="nav-quote-btn"
              onClick={onRequestQuote}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
              <span>Cotar Drone</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800 rounded-2xl flex flex-col gap-3 shadow-2xl animate-fade-in">
            <a
              href="#hero-3d-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Simulador 3D Interativo
            </a>
            <a
              href="#drone-catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Frota DJI Agras (T50, T25, Matrice)
            </a>
            <a
              href="#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Calculadora de Economia e ROI
            </a>
            <a
              href="#ndvi-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Câmera Multiespectral & NDVI
            </a>
            <a
              href="#services-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Assistência Técnica em Sorriso-MT
            </a>
            <a
              href="#location-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-200 hover:text-emerald-400 py-1"
            >
              Endereço e Google Maps
            </a>

            <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp: (62) 9962-1054
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-400 text-neutral-950 text-xs font-bold"
              >
                <Sparkles className="w-4 h-4" />
                Solicitar Cotação
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
