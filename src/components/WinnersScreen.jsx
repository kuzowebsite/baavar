import React, { useState } from 'react';
import Footer from './Footer';

const WinnersScreen = () => {
  // --- STATE ---
  const [winners] = useState([
    {
      title: "Lexus RX 450h",
      code: "AZ-001",
      date: "2025.01.10",
      phone: "99112233",
      luckyNumber: "1594",
      imageUrl: "http://beta-dash-api.grandlotto.mn/static/1763355565691_582211561_2081163062647088_1479531220148947176_n.jpg",
      videoUrl: "https://facebook.com/live/example1",
    },
    {
      title: "Iphone 16 Pro Max",
      code: "AZ-002",
      date: "2025.01.05",
      phone: "88055566",
      luckyNumber: "0777",
      imageUrl: "http://beta-dash-api.grandlotto.mn/static/1768117614126_saytan.jpeg",
      videoUrl: "https://facebook.com/live/example2",
    },
    {
      title: "5,000,000₮ Бэлэн мөнгө",
      code: "AZ-003",
      date: "2024.12.31",
      phone: "91910000",
      luckyNumber: "9999",
      imageUrl: "/assets/ymbuu.png",
      videoUrl: "https://facebook.com/live/example3",
    },
    // Grid системийг шалгах нэмэлт өгөгдөл (тест)
    {
        title: "Samsung S24 Ultra",
        code: "AZ-004",
        date: "2024.12.25",
        phone: "99009900",
        luckyNumber: "1234",
        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/mn/2401/gallery/mn-galaxy-s24-s928-sm-s928bzkcskc-thumb-539305103",
        videoUrl: "https://facebook.com/live/example4",
      },
  ]);

  // --- FUNCTIONS ---
  const launchLiveUrl = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const maskPhoneNumber = (phone) => {
    if (phone && phone.length >= 8) {
      return `${phone.substring(0, 6)}**`;
    }
    return phone;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* --- HEADER TITLE --- */}
      {/* max-w-7xl mx-auto: Голлуулж хязгаарлах */}
      <div className="w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-5 flex flex-col items-start">
            <h1 className="text-[22px] font-bold text-gray-800 m-0">
            Тохирлын ялагчид
            </h1>
            <p className="text-[13px] text-gray-600 mt-1 m-0">
            Азтангуудын мэдээлэл болон бичлэг
            </p>
        </div>
      </div>

      {/* --- WINNERS LIST --- */}
      <div className="flex-grow w-full">
        {/* max-w-7xl mx-auto: Голлуулж хязгаарлах */}
        <div className="max-w-7xl mx-auto px-4 py-6 pb-10">
            
            {/* GRID SYSTEM:
                grid-cols-1: Mobile (1 багана)
                md:grid-cols-2: Tablet (2 багана)
                lg:grid-cols-3: Desktop (3 багана)
                gap-6: Багана хоорондын зай
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {winners.map((winner, index) => (
                    <WinnerCard 
                    key={index} 
                    data={winner} 
                    maskPhoneNumber={maskPhoneNumber}
                    onLiveClick={() => launchLiveUrl(winner.videoUrl)}
                    />
                ))}
            </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

// --- WINNER CARD COMPONENT ---
// h-full нэмж өндрийг нь жигдлэв
const WinnerCard = ({ data, maskPhoneNumber, onLiveClick }) => {
  return (
    <div 
      className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      style={{
        border: '1.5px solid rgba(212, 175, 55, 0.5)',
        boxShadow: '0 4px 15px 1px rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* 1. ДЭЭД ХЭСЭГ: ЗУРАГ + МЭДЭЭЛЭЛ */}
      <div className="p-4 flex items-start gap-4 flex-grow">
        {/* ЗУРАГ */}
        <div 
          className="w-[80px] h-[80px] rounded-[12px] bg-gray-100 shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.imageUrl})`,
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        />
        
        {/* МЭДЭЭЛЭЛ */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-[15px] font-bold text-black leading-[1.2] mb-3 line-clamp-2 min-h-[36px]">
            {data.title}
          </h3>
          
          <div className="flex flex-col gap-1 w-full">
            <InfoRow label="Код:" value={data.code} valueColor="#B4941F" />
            <InfoRow label="Огноо:" value={data.date} valueColor="#757575" />
            <InfoRow label="Ялагч:" value={maskPhoneNumber(data.phone)} valueColor="#000" isBold={true} />
          </div>
        </div>
      </div>

      {/* 2. ДУНД ХЭСЭГ: АЗЫН ДУГААР */}
      <div 
        className="w-full py-5 flex flex-col items-center justify-center mt-auto"
        style={{
          backgroundColor: '#FFFBF0', 
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <span className="text-[10px] tracking-[1.5px] font-bold text-[#B4941F] mb-3">
          АЗЫН ДУГААР
        </span>
        <LuckyNumber3D number={data.luckyNumber} />
      </div>

      {/* 3. ДООД ХЭСЭГ: LIVE ТОВЧ */}
      <div className="p-4">
        <button
          onClick={onLiveClick}
          className="w-full h-[45px] rounded-[8px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          style={{
            backgroundColor: '#FFF9E6',
            color: '#D4AF37',
            border: '1.5px solid #D4AF37',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"/>
          </svg>
          <span className="text-[14px] font-bold">
            Live үзэх
          </span>
        </button>
      </div>
    </div>
  );
};

// --- INFO ROW HELPER ---
const InfoRow = ({ label, value, valueColor, isBold }) => (
  <div className="flex items-center text-[12px]">
    <span className="w-[50px] text-gray-500 shrink-0">{label}</span>
    <span style={{ color: valueColor, fontWeight: isBold ? 700 : 500 }} className="truncate">
      {value}
    </span>
  </div>
);

// --- 3D LUCKY NUMBER COMPONENT ---
const LuckyNumber3D = ({ number }) => {
  const digits = number.split('');

  return (
    <div className="flex justify-center items-center">
      {digits.map((digit, index) => (
        <div 
          key={index} 
          className="relative mx-1 w-[36px] h-[36px] flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, #FFFFDF 0%, #D4AF37 50%, #8B6508 100%)`,
              boxShadow: '2px 3px 5px rgba(0,0,0,0.2)',
            }}
          />
          <span 
            className="relative text-white font-bold text-[18px] z-10"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.26)' }}
          >
            {digit}
          </span>
          <div 
            className="absolute top-[4px] left-[7px] w-[12px] h-[8px] rounded-[10px] z-20"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.4)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default WinnersScreen;