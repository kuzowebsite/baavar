import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileDrawer = ({ isOpen, onClose, onSelect, selectedIndex }) => {
  const goldPrimary = "#D4AF37";
  const goldLight = "#FFF9E6";
  const goldBorder = "#B4941F";

  const menuItems = [
    { id: 0, title: "Баавар сугалаа", icon: "/assets/1Baavar_logo.png" },
    { id: 2, title: "Ялагчид", icon: "/assets/ymbuu_menu.png" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. БАРЬЕР (АРЫН ХАРАНХУЙ ХЭСЭГ) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* 2. DRAWER (ЦЭСНИЙ ХЭСЭГ) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[75%] bg-white z-[70] shadow-2xl flex flex-col overflow-hidden"
            style={{
              borderRadius: '20px 0 0 20px',
              border: `2px solid ${goldPrimary}`
            }}
          >
            {/* DRAWER HEADER */}
            <div 
              className="w-full pt-16 pb-8 flex flex-center justify-center"
              style={{ backgroundColor: goldLight }}
            >
              <div 
                className="p-1 rounded-full bg-white shadow-lg"
                style={{ border: `2px solid ${goldPrimary}` }}
              >
                <div className="w-[90px] h-[90px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src="/assets/1Baavar_logo.png" 
                    alt="Logo" 
                    className="w-[80%] h-[80%] object-contain"
                  />
                </div>
              </div>
            </div>

            {/* MENU ITEMS */}
            <div className="flex-1 py-5 flex flex-col">
              {menuItems.map((item) => {
                const isSelected = selectedIndex === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className="mx-4 my-1 px-4 py-3 rounded-xl flex items-center gap-4 transition-all"
                    style={{
                      backgroundColor: isSelected ? goldLight : 'transparent',
                      border: isSelected ? `1px solid ${goldPrimary}4D` : 'none'
                    }}
                  >
                    <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                    <span 
                      className="text-[15px] font-bold"
                      style={{ color: isSelected ? goldBorder : '#4A4A4A' }}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}

              <div className="my-6 px-5">
                <div className="h-[1px] w-full" style={{ backgroundColor: `${goldPrimary}33` }} />
              </div>

              {/* СУГАЛАА ШАЛГАХ ТОВЧ */}
              <div className="flex justify-center px-4">
                <button 
                  onClick={() => onSelect(1)}
                  className="w-[160px] h-[40px] rounded-xl overflow-hidden shadow-lg active:scale-95 transition-transform"
                  style={{ border: `1.5px solid ${goldPrimary}` }}
                >
                  <img 
                    src="/assets/suglaa_shalgah.png" 
                    alt="Шалгах" 
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* FOOTER */}
            <div className="pb-8 flex flex-col items-center gap-2">
              <img 
                src="/assets/Baavar_text_logo.png" 
                alt="Text Logo" 
                className="h-5 opacity-80 object-contain" 
              />
              <span 
                className="text-[11px]"
                style={{ color: `${goldBorder}99` }}
              >
                Version 1.0.0
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;