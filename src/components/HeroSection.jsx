import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onCheckTicketTap }) => {
  // Алтан 3D Текст компонент
  const Gold3DText = ({ text, className }) => (
    <div className={`relative select-none ${className}`}>
      <span 
        className="absolute inset-0 text-black/50 blur-[1px] font-[900] uppercase tracking-wider" 
        style={{ transform: 'translateY(2px)' }}
      >
        {text}
      </span>
      <span
        className="relative block text-center uppercase tracking-wider font-[900]"
        style={{
          background: `linear-gradient(to bottom, #8A6E2F 0%, #D4AF37 25%, #FFF9E6 50%, #D4AF37 75%, #8A6E2F 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))',
        }}
      >
        {text}
      </span>
    </div>
  );

  return (
    <section className="relative w-full h-[500px] md:h-[826px] flex flex-col items-center justify-start pt-20 md:pt-32 overflow-hidden bg-[#B4941F]">
      
      {/* 1. VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/shagai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. БАТАЛГААЖСАН ТЭМДЭГ */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-[10px] z-10 flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full border-[1.5px] border-[#D4AF37]"
      >
        <svg className="w-[18px] h-[18px] text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
        </svg>
        <span className="text-[#B4941F] text-[11px] font-bold">Сангийн яамны албан ёсны зөвшөөрөлтэй</span>
      </motion.div>

      {/* 3. ҮНДСЭН АГУУЛГА (ЛОГО + ТЕКСТ БАГЦ) */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mt-[60px] md:mt-20 flex flex-col items-center"
      >
        {/* ЛОГО */}
        <img 
          src="/assets/grand.png" 
          alt="Grand" 
          className="w-[220px] md:w-[340px] object-contain mb-2 md:mb-6 -mt-16 md:-mt-20"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />

        {/* АЛТАН 3D ТЕКСТҮҮД */}
        <div className="flex flex-col gap-0 md:gap-4 mt-4 md:mt-6"> 
          <Gold3DText 
            text="Монголын хамгийн том" 
            className="text-[18px] md:text-[36px] lg:text-[42px]" 
          />
          <Gold3DText 
            text="ХОНЖВОРТОЙ СУГЛАА!" 
            className="text-[22px] md:text-[48px] lg:text-[56px]"
          />
        </div>
      </motion.div>

      {/* 4. СУГАЛАА ШАЛГАХ ТОВЧ */}
      {/* 4. СУГАЛАА ШАЛГАХ ТОВЧ */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onCheckTicketTap}
        // ЭНД ӨӨРЧЛӨЛТ ОРОВ: bottom-[110px] байсныг bottom-[80px] болгож доошлууллаа
        className="absolute bottom-[70px] md:bottom-[130px] z-20 w-[170px] md:w-[220px] h-[42px] md:h-[55px] rounded-xl overflow-hidden shadow-[0_8px_15px_rgba(0,0,0,0.5)] border-none cursor-pointer"
      >
        <img 
          src="/assets/suglaa_shalgah.png" 
          alt="Сугалаа шалгах" 
          className="w-full h-full object-cover"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </motion.button>

      {/* 5. ГҮЙДЭГ ЮМБҮҮ - Хамгийн доор */}
      <div 
  className="absolute bottom-[-10px] md:bottom-[-34px] w-full z-30 flex items-center overflow-hidden h-[60px] md:h-[100px]"
  style={{ pointerEvents: 'none' }} 
>
  <motion.div
    // Энд gap-ыг YmbuuStrip-ийн gap-тай ижил байлгах хэрэгтэй
    className="flex items-center gap-[20px] md:gap-[60px]"
    initial={{ x: "-50%" }}
    animate={{ x: "0%" }}
    transition={{ 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    style={{ width: "max-content" }}
  >
    <YmbuuStrip />
    <YmbuuStrip />
  </motion.div>
</div>

    </section>
  );
};

// Туслах компонент
const YmbuuStrip = () => (
  // md: (desktop) дээр 60px, жижиг дэлгэц дээр 20px зай авна
  <div className="flex items-center gap-[20px] md:gap-[60px] pr-[20px] md:pr-[60px]">
    {[...Array(14)].map((_, i) => (
      <img
        key={i}
        src="/assets/ymbuu.png"
        alt="ymbuu"
        // Гар утас дээр 50px, таблет дээр 75px, desktop дээр 100px өндөртэй болгох
        className="h-[80px] md:h-[90px] lg:h-[100px] w-auto object-contain flex-shrink-0"
        style={{ imageRendering: 'auto' }}
      />
    ))}
  </div>
);

export default HeroSection;