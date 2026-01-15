import React, { useState, useEffect } from 'react';

// --- GOLDEN THEME COLORS ---
const COLORS = {
  goldPrimary: '#D4AF37',
  goldDark: '#B4941F',
  goldLight: '#FFF9E6',
};

// --- ICONS (Moved outside to prevent re-creation) ---
const Icons = {
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  CheckCircle: ({ color }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={color} stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>,
  Warning: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldPrimary} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldPrimary} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  Copy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldPrimary} strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
  Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.goldDark} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Qr: () => <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Refresh: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
  CardGift: () => <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={COLORS.goldDark} strokeWidth="1.5"><path d="M20 12v10H4V12"></path><path d="M2 7h20v5H2z"></path><path d="M12 22V7"></path><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
};

// --- HELPER COMPONENTS (Moved outside) ---
const PaymentOption = ({ label, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`w-full py-4 px-4 rounded-xl border flex items-center cursor-pointer transition-all ${
      isSelected ? 'bg-[#FFF9E6]' : 'bg-white'
    }`}
    style={{
      borderColor: isSelected ? COLORS.goldPrimary : '#D1D5DB',
      borderWidth: isSelected ? '1.5px' : '1px',
      boxShadow: isSelected ? '0 2px 4px rgba(212, 175, 55, 0.1)' : 'none'
    }}
  >
    <div 
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-5 ${
        isSelected ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-transparent border-gray-400'
      }`}
    >
      {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
    </div>
    <span 
      className={`text-base flex-1 text-center ${isSelected ? 'font-bold' : 'font-normal'}`}
      style={{ color: isSelected ? COLORS.goldDark : '#1F2937' }}
    >
      {label}
    </span>
    <div className="w-5"></div>
  </div>
);

const SummaryRow = ({ label, value, isBold, isHighlight, isCopyable, onCopy }) => (
  <div className="py-2 flex items-start justify-between">
    <span className="text-[13px] text-gray-600 w-1/3">{label}</span>
    <div className="flex-1 flex flex-col items-end">
      <div className="flex items-center gap-2">
          <span 
              className={`text-right break-all ${isBold || isHighlight ? 'font-bold' : 'font-normal'}`}
              style={{ 
                  color: isHighlight ? COLORS.goldDark : 'rgba(31, 41, 55, 0.87)',
                  fontSize: isHighlight ? '16px' : '14px'
              }}
          >
              {value}
          </span>
          {isCopyable && (
              <button onClick={onCopy} className="text-[#D4AF37] pt-0.5 hover:opacity-80">
                  <Icons.Copy />
              </button>
          )}
      </div>
    </div>
  </div>
);

const PurchaseDialog = ({ title, basePrice, onClose }) => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('qpay');
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  
  // Modals & Toasts
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const totalPrice = basePrice * quantity;
  const isPhoneValid = phoneNumber.length === 8;

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (remainingSeconds <= 0) {
      onClose(); // Time's up
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds, onClose]);

  const resetTimer = () => setRemainingSeconds(300);

  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // --- HANDLERS ---
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} хуулагдлаа`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleNext = () => {
    if (currentStep === 1 && !isPhoneValid) return;
    
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      resetTimer();
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Утасны дугаар";
      case 2: return "Тоо ширхэг";
      case 3: return "Баталгаажуулах";
      case 4: return "Төлбөрийн нөхцөл";
      case 5: return selectedPaymentMethod === 'bank' ? "Банк" : "QPay";
      default: return "";
    }
  };

  // --- RENDER HELPERS ---
  // Note: This is now just a render function, not a Component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <div className="h-2.5"></div>
            <div 
              className="w-full p-3 rounded-lg flex items-center border"
              style={{ backgroundColor: 'rgba(255, 249, 230, 0.5)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
            >
              <Icons.Info />
              <span className="ml-2.5 text-xs text-gray-800">
                Та өөрийн баталгаат утасны дугаарыг "ЗӨВ" оруулна уу
              </span>
            </div>
            
            <div className="h-5"></div>
            
            <div className="w-full relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Icons.Phone />
              </div>
              <input
                type="text"
                maxLength="8"
                // Value is bound to state
                value={phoneNumber}
                // onChange updates state
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="+976"
                className="w-full pl-12 pr-12 py-4 rounded-xl border text-lg font-bold tracking-widest outline-none transition-all"
                style={{
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                }}
                onFocus={(e) => e.target.style.borderColor = COLORS.goldPrimary}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                autoFocus // Automatically focus when this step loads
              />
              {isPhoneValid && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <Icons.CheckCircle color="#4CAF50" />
                </div>
              )}
            </div>
            
            {phoneNumber.length > 0 && !isPhoneValid && (
              <div className="w-full mt-2 text-xs text-red-500">
                Заавал 8 оронтой тоо байна.
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center">
            <div className="h-2.5"></div>
            <p className="text-center text-gray-500 text-[13px]">
              Та сугалаа худалдан авах тасалбарын тоо ширхэгийг сонгоно уу.
            </p>
            <div className="h-[30px]"></div>
            
            <div className="flex items-center justify-center">
              {/* Minus Button */}
              <button
                onClick={() => basePrice > 0 && quantity > 1 && setQuantity(q => q - 1)}
                disabled={basePrice === 0}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border text-2xl font-bold transition-colors ${
                  basePrice > 0 ? 'bg-white border-[#D4AF37] text-[#B4941F]' : 'bg-gray-50 border-gray-300 text-gray-400'
                }`}
              >
                -
              </button>

              {/* Quantity Display */}
              <div 
                className={`w-[90px] mx-[15px] py-3 rounded-xl border flex items-center justify-center`}
                style={{
                  borderColor: 'rgba(212, 175, 55, 0.5)',
                  backgroundColor: basePrice === 0 ? '#f3f4f6' : 'white',
                  boxShadow: '0 2px 5px rgba(212, 175, 55, 0.1)'
                }}
              >
                <span className="text-2xl font-bold" style={{ color: COLORS.goldDark }}>
                  {quantity}
                </span>
              </div>

              {/* Plus Button */}
              <button
                onClick={() => basePrice > 0 && setQuantity(q => q + 1)}
                disabled={basePrice === 0}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border text-2xl font-bold transition-colors ${
                  basePrice > 0 ? 'bg-white border-[#D4AF37] text-[#B4941F]' : 'bg-gray-50 border-gray-300 text-gray-400'
                }`}
              >
                +
              </button>
            </div>

            {basePrice === 0 && (
              <div className="mt-5 p-2.5 rounded-lg border flex items-center gap-2"
                style={{ backgroundColor: COLORS.goldLight, borderColor: COLORS.goldPrimary }}
              >
                <Icons.Star />
                <span className="text-[11px] font-bold" style={{ color: COLORS.goldDark }}>
                  Үнэгүй сугалааг зөвхөн 1 ширхэгийг авах боломжтой.
                </span>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div 
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E7EB' }}
          >
            <SummaryRow label="Сугалааны нэр:" value={title} isBold />
            <div className="my-5 border-t border-gray-200" />
            <SummaryRow label="Тоо ширхэг:" value={`${quantity} ш`} />
            <SummaryRow label="Утасны дугаар:" value={phoneNumber} />
            <div className="my-5 border-t border-gray-200" />
            <SummaryRow 
              label="Нийт төлөх дүн:" 
              value={basePrice === 0 ? "ҮНЭГҮЙ" : `${formatMoney(totalPrice)}₮`} 
              isHighlight 
            />
          </div>
        );

      case 4:
        if (basePrice === 0) {
          return (
            <div 
              className="w-full p-5 rounded-2xl border shadow-sm"
              style={{ 
                backgroundColor: COLORS.goldLight, 
                borderColor: COLORS.goldPrimary,
                boxShadow: '0 4px 10px rgba(212, 175, 55, 0.1)'
              }}
            >
              <div className="flex flex-col items-center">
                <img src="/assets/ymbuu.png" alt="gift" className="w-[60px] h-[60px]" 
                     onError={(e) => { e.target.style.display='none'; }} />
                 <div className="hidden"><Icons.CardGift /></div>

                <div className="h-[15px]"></div>
                <h3 className="text-base font-bold text-center" style={{ color: COLORS.goldDark }}>
                  Танд сар бүр 1 үнэгүй эрх бэлэглэж байна.
                </h3>
                <div className="h-2"></div>
                <p className="text-[13px] text-gray-700">Төлбөр төлөх шаардлагагүй.</p>
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-center">
            <span className="font-medium text-black">Төлбөрийн нөхцөлөө сонгоно уу!</span>
            <div className="h-5"></div>
            
            <PaymentOption 
              label="QPay" 
              isSelected={selectedPaymentMethod === 'qpay'}
              onClick={() => setSelectedPaymentMethod('qpay')}
            />
            
            <div className="h-[15px]"></div>
            
            <PaymentOption 
              label="Банкаар төлөх" 
              isSelected={selectedPaymentMethod === 'bank'}
              onClick={() => setSelectedPaymentMethod('bank')}
            />
          </div>
        );

      case 5:
        if (basePrice === 0 || selectedPaymentMethod === 'qpay') {
          return (
            <div className="flex flex-col items-center">
              <div 
                className="w-full px-5 py-[15px] rounded-xl border flex flex-col items-center"
                style={{ backgroundColor: COLORS.goldLight, borderColor: COLORS.goldPrimary }}
              >
                 <span className="text-xs text-gray-800 text-center">Санамсаргүй сонгогдсон таны азын дугаарууд:</span>
                 <div className="h-2"></div>
                 <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.goldPrimary}><path d="M22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V10C3.11 10 4 10.9 4 12C4 13.1 3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.89 14 20 13.1 20 12C20 10.9 20.89 10 22 10ZM20 8.54C18.81 9.23 18 10.53 18 12C18 13.47 18.81 14.77 20 15.46V18H4V15.46C5.19 14.77 6 13.47 6 12C6 10.53 5.19 9.23 4 8.54V6H20V8.54Z"/></svg>
                    <span className="font-bold text-lg tracking-wider">04201, 07517</span>
                 </div>
              </div>

              <div className="h-[30px]"></div>

              {basePrice > 0 ? (
                <div className="p-2.5 rounded-xl border border-gray-200 bg-white">
                  <Icons.Qr />
                </div>
              ) : (
                <div className="text-[#4CAF50]">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
              )}

              <div className="h-5"></div>

              {basePrice === 0 ? (
                <span className="font-bold text-[#4CAF50] text-base">Амжилттай баталгаажлаа!</span>
              ) : (
                <button 
                  className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50"
                  style={{ borderColor: COLORS.goldPrimary }}
                >
                  <Icons.Refresh />
                  <span style={{ color: COLORS.goldDark }}>Төлбөр шалгах</span>
                </button>
              )}
            </div>
          );
        } else {
          // Bank Info
          return (
            <div className="flex flex-col items-center">
              <div className="w-full p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <SummaryRow label="Банк:" value="Хаан банк" isBold />
                <div className="my-3 border-t border-gray-200" />
                <SummaryRow label="Дансны дугаар:" value="5222146623" isBold isCopyable onCopy={() => handleCopy("5222146623", "Дансны дугаар")} />
                <div className="my-3 border-t border-gray-200" />
                <SummaryRow label="Үнийн дүн:" value={`${formatMoney(totalPrice)}₮`} isHighlight />
                <div className="my-3 border-t border-gray-200" />
                <SummaryRow label="Гүйлгээний утга:" value={phoneNumber} isBold isCopyable onCopy={() => handleCopy(phoneNumber, "Гүйлгээний утга")} />
              </div>

              <div className="h-5"></div>

              <div 
                className="w-full p-3 rounded-xl border flex items-start gap-2.5"
                style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', borderColor: 'rgba(255, 193, 7, 0.3)' }}
              >
                <div className="text-orange-500 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/></svg>
                </div>
                <span className="text-xs font-bold text-orange-500 flex-1">
                  Гүйлгээний утга дээр зөвхөн утасны дугаар бичнэ.
                </span>
              </div>
            </div>
          );
        }
      
      default:
        return null;
    }
  };

  // --- MAIN RENDER ---
  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
        
        {/* DIALOG */}
        <div 
          className="bg-white rounded-[20px] w-full max-w-[400px] flex flex-col max-h-[90vh]"
          style={{ border: `1px solid rgba(212, 175, 55, 0.3)` }}
        >
          {/* HEADER */}
          <div className="p-6 pb-0">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold" style={{ color: COLORS.goldDark }}>
                {getStepTitle()}
              </span>
              
              <div className="flex items-center gap-2.5">
                <div 
                  className="px-2 py-1 rounded-lg text-sm font-bold"
                  style={{ backgroundColor: COLORS.goldLight, color: COLORS.goldDark }}
                >
                  {formatTimer(remainingSeconds)}
                </div>
                <button 
                  onClick={() => setShowExitConfirm(true)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-500"><Icons.Close /></span>
                </button>
              </div>
            </div>
            
            <div className="mt-[30px] h-[1px] w-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}></div>
          </div>

          {/* CONTENT (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {/* АНХААР: <StepContent /> гэж биш {renderStepContent()} гэж дуудна */}
            {renderStepContent()}
          </div>

          {/* FOOTER */}
          <div className="p-6 pt-0">
             <div className="h-6"></div>
             <div className="flex justify-between items-center">
                {currentStep > 1 ? (
                    <button
                        onClick={handleBack}
                        className="px-5 py-3 rounded-xl border flex items-center text-sm font-medium transition-all hover:bg-[#FFF9E6]"
                        style={{ borderColor: 'rgba(212, 175, 55, 0.5)', color: COLORS.goldDark }}
                    >
                        Өмнөх
                    </button>
                ) : (
                    <div className="w-[80px]"></div>
                )}

                {/* Step Indicator */}
                <div className="text-sm">
                    <span className="font-bold" style={{ color: COLORS.goldDark }}>Алхам </span>
                    <span className="font-bold text-base" style={{ color: COLORS.goldDark }}>{currentStep}</span>
                    <span className="text-gray-500"> / </span>
                    <span className="font-bold text-gray-500">5</span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !isPhoneValid}
                    className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    style={{ 
                        backgroundColor: (currentStep === 1 && !isPhoneValid) ? '' : COLORS.goldPrimary,
                        boxShadow: (currentStep === 1 && !isPhoneValid) ? '' : `0 2px 4px rgba(180, 148, 31, 0.3)`
                    }}
                >
                    {currentStep === 5 ? "Дуусгах" : "Дараах"}
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* ALERT DIALOG (Exit Confirm) */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/20 z-[60] flex items-center justify-center p-5">
           <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg animate-in fade-in zoom-in duration-200">
              <div className="flex items-center gap-2.5 mb-4">
                 <Icons.Warning />
                 <span className="text-lg font-bold">Итгэлтэй байна уу?</span>
              </div>
              <p className="text-gray-700 mb-6">Худалдан авалтаа цуцлах гэж байна. Үргэлжлүүлэх үү?</p>
              <div className="flex justify-end gap-2">
                 <button 
                    onClick={() => setShowExitConfirm(false)}
                    className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg"
                 >
                    Үгүй
                 </button>
                 <button 
                    onClick={() => { setShowExitConfirm(false); onClose(); }}
                    className="px-4 py-2 font-bold hover:bg-[#FFF9E6] rounded-lg"
                    style={{ color: COLORS.goldDark }}
                 >
                    Тийм
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-lg bg-[#323232] text-white text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2">
           {toastMessage}
        </div>
      )}
    </>
  );
};

export default PurchaseDialog;