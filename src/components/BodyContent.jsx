import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PurchaseDialog from './PurchaseDialog';

const goldPrimary = "#D4AF37";
const goldDark = "#B4941F";
const goldLight = "#FFF9E6";

const BodyContent = ({ onLottoClick }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedItem, setSelectedItem] = useState(null);

  const lottoList = [
    { title: "Баавар суглаа – Lexus Rx", imageUrl: "suglaa/1.jpg", percent: 14, price: "10,000₮", code: "AZ-001", isFree: false },
    { title: "🐎 Монгол сугалаа – Морь", imageUrl: "suglaa/3.jpeg", percent: 45, price: "5,000₮", code: "AZ-002", isFree: false },
    { title: "Саятан сугалаа – 9,999,999₮", imageUrl: "suglaa/2.jpg", percent: 100, price: "3,000₮", code: "AZ-003", isFree: false },
    { title: "Iphone сугалаа – Iphone 17", imageUrl: "suglaa/4.jpeg", percent: 90, price: "1,000₮", code: "AZ-004", isFree: false },
    { title: "Үнэгүй сугалаа – 1,000,000₮", imageUrl: "suglaa/5.jpg", percent: 25, price: "ҮНЭГҮЙ", code: "AZ-005", isFree: true },
    { title: "Land Cruiser 300", imageUrl: "suglaa/6.jpg", percent: 5, price: "20,000₮", code: "AZ-006", isFree: false },
    { title: "PlayStation 5 Pro", imageUrl: "suglaa/7.jpeg", percent: 60, price: "500₮", code: "AZ-007", isFree: false },
    { title: "2 Өрөө Байр", imageUrl: "suglaa/8.jpeg", percent: 30, price: "15,000₮", code: "AZ-008", isFree: false },
    { title: "MacBook Pro M3", imageUrl: "suglaa/9.jpg", percent: 80, price: "2,000₮", code: "AZ-009", isFree: false },
    { title: "Аялалын эрх (Дубай)", imageUrl: "suglaa/10.jpeg", percent: 10, price: "1,000₮", code: "AZ-010", isFree: false },
  ];

  const loadMore = () => setVisibleCount(prev => prev + 6);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const numbersOnly = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numbersOnly, 10) || 0;
  };

  return (
    <div className="flex flex-col items-center w-full bg-white pb-20 relative pt-10">
      
      {/* 1. 3D АЛТАН ГАРЧИГ + ХҮРЭЭ */}
      <div className="relative z-10 flex justify-center items-center mb-12 w-full h-[100px]">
        
        {/* Арын хүрээ зураг */}
        <img 
          src="/assets/huree.png" 
          alt="Decoration Frame" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[340px] object-contain z-0 pointer-events-none select-none top-15"
        />

        {/* Текст */}
        <h2
          className="relative z-10 text-[32px] md:text-[40px] font-[900] tracking-[3px] text-transparent uppercase select-none text-center mt-2"
          style={{
            background: "linear-gradient(to bottom, #7A5C10 0%, #D4AF37 25%, #FFF9E6 50%, #D4AF37 75%, #7A5C10 100%)",
            WebkitBackgroundClip: "text",
            filter: "drop-shadow(0px 1px 0px #5E4B10) drop-shadow(0px 2px 0px #5E4B10) drop-shadow(0px 6px 12px rgba(0,0,0,0.45))"
          }}
        >
          СУГЛААНУУД!
        </h2>
      </div>

      {/* 2. СУГЛААНЫ КАРТУУД */}
      <div className="w-full max-w-7xl px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lottoList.slice(0, visibleCount).map((lotto, index) => (
            <LottoCard 
              key={index} 
              {...lotto} 
              onClick={() => onLottoClick && onLottoClick(lotto)}
              onPurchase={(e) => {
                e.stopPropagation();
                setSelectedItem(lotto);
              }}
            />
          ))}
        </div>

        {/* ИЛҮҮ ХАРАХ ТОВЧ */}
        {visibleCount < lottoList.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-10 py-3 rounded-xl border-[1.5px] font-bold text-sm transition-all active:scale-95 hover:shadow-md"
              style={{
                backgroundColor: goldLight,
                color: goldDark,
                borderColor: goldPrimary
              }}
            >
              Илүү харах
            </button>
          </div>
        )}
      </div>

      {/* PURCHASE DIALOG MODAL */}
      {selectedItem && (
        <PurchaseDialog
          title={selectedItem.title}
          basePrice={parsePrice(selectedItem.price)}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </div>
  );
};

// LottoCard Component
const LottoCard = ({ title, imageUrl, percent, price, code, isFree, onPurchase, onClick }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="w-full bg-white rounded-[16px] border border-[#D4AF37]/30 shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative aspect-[1.1/1] overflow-hidden">
        <motion.img
          style={{ scale }}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative h-[10px] w-full bg-[#F0F0F0]">
        <div
          className="h-full bg-[#D4AF37] rounded-r-[4px] relative"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 px-[6px] py-[2px] bg-[#D4AF37] border-[1.5px] border-white rounded-[10px] text-white text-[9px] font-bold shadow-sm z-10">
            {percent}%
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <h3 className="text-base font-bold text-[#1A1A1A] line-clamp-2">{title}</h3>
        
        <div className="flex items-center gap-2 mt-auto">
          <Tag text={price} />
          <Tag text={code} />
          <div className="flex-1" />
          
          <button 
            onClick={onPurchase}
            className="px-3 py-2 bg-[#D4AF37] text-white rounded-[10px] text-[12px] font-bold active:scale-95 transition-transform whitespace-nowrap"
          >
            {isFree ? "Эрх ашиглах" : "Оролцох"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ text }) => (
  <div className="px-[8px] py-[4px] bg-[#FFF9E6] border border-[#D4AF37]/20 rounded-[6px] text-[#B4941F] font-bold text-[11px] whitespace-nowrap">
    {text}
  </div>
);

export default BodyContent;