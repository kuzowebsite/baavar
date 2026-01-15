import React, { useState, useEffect } from 'react';
import PurchaseDialog from './PurchaseDialog'; 

// --- GOLDEN THEME COLORS ---
const COLORS = {
  goldPrimary: '#D4AF37',
  goldDark: '#B4941F',
  goldLight: '#FFF9E6',
};

// --- ICONS (SVG) ---
const Icons = {
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  ImageOff: () => <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeOpacity="0.5" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.goldPrimary}><path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"/></svg>, 
  Add: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Remove: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Time: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.goldPrimary}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>,
  Warning: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F44336"><path d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/></svg>,
  CheckCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.goldPrimary}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill={COLORS.goldPrimary}/><path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/></svg>,
  Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.goldPrimary}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
};

const LottoDetailPage = ({ 
  title, 
  imageUrl, 
  percent, 
  price, 
  code, 
  isFree = false,
  onBack 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  useEffect(() => {
    if (isFree || price.toUpperCase() === "ҮНЭГҮЙ") {
      setUnitPrice(0);
    } else {
      const numbersOnly = price.replace(/[^0-9]/g, '');
      setUnitPrice(parseInt(numbersOnly, 10) || 0);
    }
  }, [price, isFree]);

  const formatCurrency = (amount) => {
    if (amount === 0 && isFree) return "ҮНЭГҮЙ";
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮`;
  };

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col relative">
      
      {/* --- APP BAR --- */}
      <div className="sticky top-0 z-50 bg-white w-full shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between px-4 h-[60px]">
            <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Icons.Back />
            </button>
            <h1 
              className="text-[16px] font-bold tracking-[1px]" 
              style={{ color: COLORS.goldDark }}
            >
              {code}
            </h1>
            <div className="w-[40px]"></div>
          </div>
        </div>
        <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }} />
      </div>

      {/* --- BODY --- */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- ЗУРАГ БОЛОН ҮЙЛДЭЛ (Одоо Desktop дээр БАРУУН талд) --- 
               lg:order-2 -> Desktop дээр 2-рт буюу баруун талд гарна.
               Mobile дээр order байхгүй учир HTML дарааллаар (эхэндээ) харагдана.
            */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24 lg:order-2">
              
              {/* 1. Main Image */}
              <div 
                className="w-full rounded-[20px] overflow-hidden relative aspect-[4/3] bg-white"
                style={{
                  border: `1px solid rgba(212, 175, 55, 0.5)`,
                  boxShadow: `0 8px 15px rgba(212, 175, 55, 0.15)`
                }}
              >
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full items-center justify-center hidden"
                  style={{ backgroundColor: COLORS.goldLight }}
                >
                  <Icons.ImageOff />
                </div>
              </div>

              {/* 2. Progress */}
              <ProgressCard percent={percent} />

              {/* 3. Action */}
              <ActionCard 
                priceString={price} 
                quantity={quantity} 
                onIncrease={handleIncrease} 
                onDecrease={handleDecrease}
                totalPrice={formatCurrency(unitPrice * quantity)}
                onPurchase={() => setShowPurchaseDialog(true)}
              />
            </div>

            {/* --- ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ (Одоо Desktop дээр ЗҮҮН талд) ---
               lg:order-1 -> Desktop дээр 1-рт буюу зүүн талд гарна.
            */}
            <div className="lg:col-span-2 lg:order-1">
              <DetailedInfoSection title={title} code={code} price={price} />
            </div>

          </div>
        </div>
      </div>

      {/* PURCHASE DIALOG */}
      {showPurchaseDialog && (
        <PurchaseDialog 
          title={title} 
          basePrice={unitPrice} 
          onClose={() => setShowPurchaseDialog(false)} 
        />
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ProgressCard = ({ percent }) => {
  const safePercent = percent > 100 ? 100 : percent;

  return (
    <div 
      className="p-5 rounded-[20px] bg-white flex flex-col"
      style={{
        border: `1px solid rgba(212, 175, 55, 0.3)`,
        boxShadow: `0 5px 15px rgba(212, 175, 55, 0.05)`
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Icons.Chart />
        <span className="text-[15px] font-bold" style={{ color: COLORS.goldDark }}>Сугалааны дүүргэлт</span>
      </div>

      <div className="relative w-full h-[12px] rounded-[6px] bg-[#F5F5F5]">
        {/* Дүүргэлтийн зураас */}
        <div 
          className="absolute left-0 top-0 h-full rounded-[6px] transition-all duration-500"
          style={{ 
            width: `${safePercent}%`, 
            backgroundColor: COLORS.goldPrimary,
            boxShadow: `0 2px 4px rgba(212, 175, 55, 0.4)`
          }}
        />
        
        {/* Хувь харуулдаг бөөрөнхий хэсэг */}
        <div 
          // Энд байсан -mt-[10px]-ийг авч хаясан тул яг голдоо байрлана
          className="absolute top-1/2 -translate-y-1/2 px-[8px] py-[4px] rounded-[12px] border-2 border-white shadow-sm flex items-center justify-center z-10"
          style={{
            left: `calc(${safePercent}% - 34px)`, // Байрлалыг тааруулах
            backgroundColor: COLORS.goldPrimary,
            boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`
          }}
        >
          <span className="text-[11px] font-[900] text-white leading-none">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ priceString, quantity, onIncrease, onDecrease, totalPrice, onPurchase }) => {
  return (
    <div 
      className="p-5 rounded-[20px] bg-white flex flex-col"
      style={{
        border: `1px solid rgba(212, 175, 55, 0.3)`,
        boxShadow: `0 5px 15px rgba(212, 175, 55, 0.05)`
      }}
    >
      <span className="text-[15px] font-bold mb-5" style={{ color: COLORS.goldDark }}>Сугалаанд оролцох</span>
      
      <div className="flex items-center justify-between mb-6">
        <div 
          className="px-5 py-3 rounded-[15px] border"
          style={{ backgroundColor: COLORS.goldLight, borderColor: COLORS.goldPrimary }}
        >
          <span className="text-[16px] font-[900]" style={{ color: COLORS.goldDark }}>{priceString}</span>
        </div>

        <div 
          className="p-1 rounded-[30px] border flex items-center bg-white"
          style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
        >
          <button onClick={onDecrease} className="p-2 rounded-full hover:bg-gray-50 transition-colors bg-[#FFF9E6]">
            <Icons.Remove />
          </button>
          <span className="mx-4 text-[16px] font-bold" style={{ color: COLORS.goldDark }}>{quantity}x</span>
          <button onClick={onIncrease} className="p-2 rounded-full hover:bg-gray-50 transition-colors bg-[#FFF9E6]">
            <Icons.Add />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <span className="text-[14px] font-medium text-black/54">Нийт дүн:</span>
        <span className="text-[18px] font-[900] text-[#1A1A1A]">{totalPrice}</span>
      </div>

      <button 
        onClick={onPurchase}
        className="w-full h-[52px] rounded-[16px] text-white text-[16px] font-bold tracking-[1px] shadow-md active:scale-98 transition-transform"
        style={{ 
          backgroundColor: COLORS.goldPrimary,
          boxShadow: `0 4px 6px rgba(180, 148, 31, 0.5)`
        }}
      >
        ОРОЛЦОХ
      </button>
    </div>
  );
};

const DetailedInfoSection = ({ title, code, price }) => {
  const displayTitle = title.replace(/🏎️|🎁/g, "").trim();

  return (
    <div 
      className="w-full p-6 rounded-[20px] bg-white flex flex-col"
      style={{
        border: `1px solid rgba(212, 175, 55, 0.3)`,
        boxShadow: `0 5px 15px rgba(212, 175, 55, 0.05)`
      }}
    >
      {/* Title Header */}
      <div className="flex items-center gap-4 mb-8">
        <div 
          className="p-[1px] rounded-full shrink-0"
          style={{ 
            backgroundColor: COLORS.goldLight, 
            border: `1px solid rgba(212, 175, 55, 0.3)` 
          }}
        >
          <img src="/assets/ymbuu.png" alt="ymbuu" className="w-[50px] h-[50px] object-contain" />
        </div>
        <span className="text-[18px] md:text-[20px] font-[800] leading-[1.3] flex-1 text-gray-900">
          {displayTitle}
        </span>
      </div>

      {/* Info Tab Header */}
      <div className="flex flex-col items-start mb-6">
        <span className="text-[18px] font-bold text-gray-900">Мэдээлэл</span>
        <div className="mt-2 w-[50px] h-[3px]" style={{ backgroundColor: COLORS.goldPrimary }}></div>
      </div>

      <p className="text-[15px] text-gray-700 leading-[1.7] mb-8">
        Гранд системс компани нь ТАНСАГ, НЭР ТӨРИЙН баталгаа болсон машиныг ГРАНД СУГАЛААнд оруулж эхэллээ. Шагналын сан 2025 оны 0 км гүйлттэй автомашин. Нэмээд 19 хүнд шагналтай.
      </p>

      <CustomDivider />

      <SectionHeader title="СУГАЛААНЫ МЭДЭЭЛЭЛ" />
      <InfoRow label="Сугалааны нэр" value="ГРАНД СУГАЛАА-117" />
      <InfoRow label="Сугалааны код" value={code} />
      <InfoRow label="Сугалааны үнэ" value={price} />
      <InfoRow label="Сугалааны шагнал" value={title} />
      <InfoRow label="Сугалааны тоо" value="11,600" />
      <InfoRow label="Эхлэх хугацаа" value="2025-11-17" />

      <CustomDivider />

      <SectionHeader title="СУГАЛААНЫ ТОХИРОЛ" />
      <div 
        className="p-4 rounded-[12px] flex items-start gap-3 mb-2"
        style={{ 
          backgroundColor: 'rgba(255, 249, 230, 0.5)', 
          border: `1px solid rgba(212, 175, 55, 0.2)`
        }}
      >
        <div className="shrink-0 mt-0.5"><Icons.Time /></div>
        <p className="text-[14px] text-gray-800 leading-[1.5]">
          Тохирлын хугацаа: Сугалаа бүрэн борлогдож дууссанаас хойш 2 хоногийн дотор явагдана.
        </p>
      </div>

      <CustomDivider />

      <SectionHeader title="СУГАЛААНЫ ШАГНАЛ" />
      <StarRow text={`1-р байрны хонжвор: ${title}`} />
      <StarRow text="2-р байрны хонжвор: 2'000'000₮" />
      <StarRow text="3-р байрны хонжвор: 18 хүртэл хүн тус бүр дараагийн ГРАНД СУГАЛАА 30'000-аас 5 сугалаа" />

      <CustomDivider />

      <SectionHeader title="ДАНСААР АВАХ" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <CheckRow text="Данс: 5222146623" />
        <CheckRow text="IBAN: MN32000500" />
        <CheckRow text="Нэр: Гранд системс" />
        <CheckRow text="Утга: Утасны дугаар" />
      </div>
      <div className="h-4"></div>
      <div 
        className="p-3 rounded-[10px] flex items-center gap-3 border bg-red-50"
        style={{ borderColor: 'rgba(244, 67, 54, 0.2)' }}
      >
        <Icons.Warning />
        <span className="text-[13px] font-bold text-red-800">
          Гүйлгээний утга дээр зөвхөн утасны дугаар бичнэ.
        </span>
      </div>

      <CustomDivider />

      <SectionHeader title="МАШИНЫ ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <CheckRow text="Загвар: LC300GX.R petrol (Leather)" />
        <CheckRow text="Төрөл: Full-size Off-road SUV" />
        <CheckRow text="Үйлдвэрлэсэн: 2025 он" />
        <CheckRow text="Гааль: 2025 он" />
        <CheckRow text="Явсан км: 0 км" />
        <CheckRow text="Хөдөлгүүр: 3,956cc 4.0L V6 бензин" />
        <CheckRow text="Хурдны хайрцаг: 6 шатлалт автомат" />
        <CheckRow text="Морины хүч: 271" />
        <CheckRow text="Хөтлөгч: 4x4 хөтлөгчтэй" />
        <CheckRow text="Суудлын материал: Арьс" />
      </div>

      <CustomDivider />

      <SectionHeader title="УРАМШУУЛАЛ" />
      <CheckRow text="3 жилийн баталгаа" />
      <CheckRow text="6 удаагийн тос солих үйлчилгээ" />
      <CheckRow text="Өвлийн дугуй" />

    </div>
  );
};

// --- HELPERS ---

const CustomDivider = () => (
  <div className="my-[30px] h-[1px] w-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }} />
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-[15px]">
    <div className="w-[4px] h-[16px]" style={{ backgroundColor: COLORS.goldPrimary }}></div>
    <span 
      className="text-[14px] font-bold tracking-[0.5px]" 
      style={{ color: COLORS.goldDark }}
    >
      {title}
    </span>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-start mb-[12px]">
    <span className="w-[140px] text-[14px] text-gray-600 shrink-0">{label}:</span>
    <span className="text-[14px] font-[600] text-gray-800">{value}</span>
  </div>
);

const StarRow = ({ text }) => (
  <div className="flex items-start gap-3 mb-[12px]">
    <div className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
      <img 
        src="/assets/naadam.png" 
        alt="star" 
        className="w-full h-full object-contain"
        onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} 
      />
      <div className="hidden"><Icons.Star /></div>
    </div>
    <span className="text-[14px] leading-[1.5] text-gray-800">{text}</span>
  </div>
);

const CheckRow = ({ text }) => (
  <div className="flex items-start gap-3 mb-[10px]">
    <div className="shrink-0 mt-0.5"><Icons.CheckCircle /></div>
    <span className="text-[14px] text-gray-800 leading-[1.5]">{text}</span>
  </div>
);

export default LottoDetailPage;