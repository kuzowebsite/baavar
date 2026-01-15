import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onMenuPressed, onNavigate, selectedIndex }) => {
  const goldPrimary = "#D4AF37";

  const sharpStyle = {
    imageRendering: '-webkit-optimize-contrast',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  };

  return (
    <header className="w-full bg-white flex flex-col z-50 sticky top-0 overflow-hidden shadow-sm">
      {/* 1. ДЭЭД АЛТАН ГРАДИЕНТ */}
      <div 
        className="mt-1.5 h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, rgba(212, 175, 55, 0) 0%, ${goldPrimary} 50%, rgba(212, 175, 55, 0) 100%)`
        }}
      />

      {/* ҮНДСЭН HEADER CONTENT - max-w-7xl-ийг хасаж, px-10 нэмсэн */}
      <div className="px-5 md:px-10 py-3 flex items-center justify-between w-full h-16">
        
        {/* ЛОГО - Desktop дээр хамгийн зүүн талд */}
        <div className="flex items-center shrink-0">
          <img 
            src="/assets/Baavar_logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain cursor-pointer" 
            style={sharpStyle}
            onClick={() => onNavigate(0)}
          />
        </div>

        {/* БАРУУН ТАЛЫН ХЭСЭГ */}
        <div className="flex items-center">
          
          {/* DESKTOP & TABLET ЦЭС - Desktop дээр хамгийн баруун талд */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate(0)}
              className={`font-black text-sm uppercase transition-colors whitespace-nowrap ${selectedIndex === 0 ? 'text-[#D4AF37]' : 'text-[#1A1A1A] hover:text-[#D4AF37]'}`}
            >
              Баавар Суглаа
            </button>
            <button 
              onClick={() => onNavigate(2)}
              className={`font-black text-sm uppercase transition-colors whitespace-nowrap ${selectedIndex === 2 ? 'text-[#D4AF37]' : 'text-[#1A1A1A] hover:text-[#D4AF37]'}`}
            >
              Ялагчид
            </button>
            <button onClick={() => onNavigate(1)} className="shrink-0 ml-4">
              <img 
                src="/assets/suglaa_shalgah.png" 
                alt="Сугалаа шалгах" 
                className="h-10 cursor-pointer hover:scale-105 transition-transform" 
                style={sharpStyle}
              />
            </button>
          </nav>

          {/* MOBILE BURGER MENU */}
          <div className="md:hidden">
            <button 
              onClick={onMenuPressed}
              className="p-2 active:scale-90 flex items-center justify-center"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M3 18H21" stroke={goldPrimary} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M3 12H21" stroke={goldPrimary} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M3 6H21" stroke={goldPrimary} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ГҮЙДЭГ ХЭЭ */}
      <div className="relative h-[34px] w-full overflow-hidden border-t border-[#D4AF37]/20 bg-[#FFF9E6]">
  <motion.div 
    className="flex flex-nowrap w-fit" // w-max эсвэл w-fit байх нь зөв
    animate={{ x: ["-50%", "0%"] }} 
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <PatternGroup style={sharpStyle} />
    <PatternGroup style={sharpStyle} />
  </motion.div>
</div>
    </header>
  );
};

const PatternGroup = ({ style }) => (
  <div className="flex shrink-0">
    {[...Array(12)].map((_, i) => (
      <img 
        key={i}
        src="/assets/pattern.png" 
        alt="pattern" 
        className="h-[45px] opacity-60 -mt-1 -ml-2" 
        style={{ ...style, minWidth: '80px' }} 
      />
    ))}
  </div>
);

export default Header;