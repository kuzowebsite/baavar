import React, { useState } from 'react';
import Footer from './Footer'; 

// 1. onLottoClick prop хүлээж авна
const CheckTicketScreen = ({ onLottoClick }) => {
  const goldPrimary = "#D4AF37";
  const goldLight = "#FFF9E6";
  const goldBorder = "#B4941F";
  const goldLightBg = "rgba(255, 249, 230, 0.3)"; 

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [foundTickets, setFoundTickets] = useState([]);

  const isInputValid = phoneNumber.length === 8;

  const launchFacebookLive = () => {
    window.open('https://www.facebook.com/BaavarLotto', '_blank');
  };

  const checkLottery = async () => {
    setIsLoading(true);
    setHasSearched(false);
    setFoundTickets([]);

    await new Promise(resolve => setTimeout(resolve, 1500));

    let results = [];
    if (phoneNumber === "88888888") {
      results = [
        {
          title: "🏎️ Баавар сугалаа – Lexus Rx /хар/",
          imageUrl: "http://beta-dash-api.grandlotto.mn/static/1763355565691_582211561_2081163062647088_1479531220148947176_n.jpg",
          percent: 90,
          price: "10,000₮",
          code: "AZ-001",
          isFree: false,
          luckyNumber: "1594",
          isLive: false,
        },
        {
          title: "💰 Саятан сугалаа – 9,999,999₮",
          imageUrl: "http://beta-dash-api.grandlotto.mn/static/1768117614126_saytan.jpeg",
          percent: 100,
          price: "3,000₮",
          code: "AZ-002",
          isFree: false,
          luckyNumber: "0777",
          isLive: true,
        },
        {
            title: "📱 iPhone 15 Pro Max",
            imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363993",
            percent: 50,
            price: "5,000₮",
            code: "AZ-003",
            isFree: false,
            luckyNumber: "1234",
            isLive: false,
          },
      ];
    }

    setIsLoading(false);
    setHasSearched(true);
    setFoundTickets(results);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 8) {
      setPhoneNumber(val);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-[calc(100vh-110px)]">
      <div className="flex-grow">
        <div className="px-5 pt-8 pb-10 max-w-7xl mx-auto flex flex-col items-center">
          
          <div 
            className="w-full max-w-md p-6 rounded-2xl mb-8 relative"
            style={{
              backgroundColor: goldLightBg,
              border: `1px solid rgba(212, 175, 55, 0.3)`,
              boxShadow: `0 4px 10px rgba(212, 175, 55, 0.05)`,
            }}
          >
            <h3 className="text-[14px] font-bold mb-4 text-center" style={{ color: goldBorder }}>
              Утасны дугаараа оруулна уу.
            </h3>

            <div className="h-[48px] mb-5 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z"/>
                </svg>
              </div>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="88888888"
                className="w-full h-full pl-11 pr-3 bg-white rounded-[12px] text-[18px] font-bold outline-none border transition-colors shadow-sm"
                style={{
                  color: '#000',
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                }}
                onFocus={(e) => e.target.style.borderColor = goldPrimary}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.4)'}
              />
            </div>

            <button
              onClick={(isInputValid && !isLoading) ? checkLottery : null}
              disabled={!isInputValid || isLoading}
              className="w-full h-[48px] rounded-[12px] flex items-center justify-center shadow-md active:scale-[0.98] transition-all"
              style={{
                backgroundColor: (isInputValid && !isLoading) ? goldPrimary : '#E0E0E0',
                color: 'white',
                letterSpacing: '1px',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "ШАЛГАХ"
              )}
            </button>
          </div>

          {hasSearched && (
            <div className="w-full mt-2">
              {foundTickets.length === 0 ? (
                <div className="max-w-md mx-auto p-4 rounded-xl flex items-center border"
                  style={{
                    backgroundColor: 'rgba(244, 67, 54, 0.05)',
                    borderColor: 'rgba(244, 67, 54, 0.2)',
                  }}
                >
                  <svg className="text-red-500 w-6 h-6 mr-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <span className="text-red-500 font-medium text-[13px]">
                    Таньд бүртгэлтэй сугалаа олдсонгүй.
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <div className="pl-1 flex items-center gap-2 mb-6">
                    <svg className="w-6 h-6" fill={goldPrimary} viewBox="0 0 24 24">
                      <path d="M22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V10C3.11 10 4 10.9 4 12C4 13.1 3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.89 14 20 13.1 20 12C20 10.9 20.89 10 22 10ZM20 8.54C18.81 9.23 18 10.53 18 12C18 13.47 18.81 14.77 20 15.46V18H4V15.46C5.19 14.77 6 13.47 6 12C6 10.53 5.19 9.23 4 8.54V6H20V8.54Z"/>
                    </svg>
                    <span className="text-[18px] font-bold" style={{ color: goldBorder }}>
                      Таны сугалаанууд ({foundTickets.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {foundTickets.map((ticket, idx) => (
                      <ResultCard 
                        key={idx} 
                        data={ticket} 
                        goldPrimary={goldPrimary}
                        goldLight={goldLight}
                        goldBorder={goldBorder}
                        // 2. Дэлгэрэнгүй рүү үсрэх функц
                        onTap={() => onLottoClick && onLottoClick(ticket)}
                        onLiveClick={launchFacebookLive}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const ResultCard = ({ data, goldPrimary, goldLight, goldBorder, onTap, onLiveClick }) => {
  // Энэ нь зөвхөн LIVE товч биш үед ажилладаг Purchase логик байсан.
  // Одоо бид бүхэлд нь onTap (Detail page) руу үсэргэнэ.
  const handlePurchaseClick = (e) => {
    e.stopPropagation();
    // Энд Purchase dialog нээх логик байж болно, эсвэл зүгээр л alert.
    alert(`Purchase Dialog: ${data.title}`);
  };

  return (
    <div 
      onClick={onTap}
      className="bg-white rounded-2xl border overflow-hidden cursor-pointer flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      style={{
        borderColor: 'rgba(212, 175, 55, 0.4)',
        boxShadow: `0 5px 15px rgba(212, 175, 55, 0.1)`,
      }}
    >
      <div className="w-full aspect-[1.2/1] bg-gray-200 relative group">
        <img 
          src={data.imageUrl} 
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="relative h-[10px] bg-[#F5F5F5] w-full shrink-0">
        <div 
          className="h-full rounded-r-[4px]"
          style={{
            width: `${(data.percent / 110) * 100}%`,
            backgroundColor: 'rgba(212, 175, 55, 0.6)'
          }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center px-[6px] py-[2px] rounded-full border-2 border-white shadow-sm"
          style={{
            left: `calc(${data.percent}% - 34px)`,
            backgroundColor: goldPrimary,
          }}
        >
          <span className="text-[10px] font-[900] text-white">
            {data.percent}%
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[15px] font-[800] text-[#1A1A1A] leading-[1.3] min-h-[40px] line-clamp-2">
          {data.title}
        </h3>
        
        <div className="w-full h-[1px] my-3 bg-[#D4AF37]/20" />

        <div 
          className="w-full py-[10px] mb-3 rounded-[10px] border flex flex-col items-center"
          style={{
            backgroundColor: 'rgba(255, 249, 230, 0.5)',
            borderColor: 'rgba(212, 175, 55, 0.2)'
          }}
        >
          <span className="text-[10px] font-bold tracking-[1.5px] mb-[6px]" style={{ color: goldBorder }}>
            ТАНЫ АЗЫН ДУГААР
          </span>
          <div className="flex justify-center">
            {data.luckyNumber.split('').map((digit, i) => (
              <div key={i} className="relative w-[30px] h-[30px] mx-[3px] flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full shadow-sm"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, #FFFFDF 0%, #D4AF37 50%, #8B6508 100%)`,
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.2)'
                  }}
                />
                <div className="relative text-white font-bold text-[16px]" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.26)' }}>
                  {digit}
                </div>
                <div className="absolute top-[4px] left-[6px] w-[8px] h-[5px] bg-white/40 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-grow" />

        <div className="flex items-center gap-2 w-full mt-2">
          <Tag text={data.price} goldPrimary={goldPrimary} goldLight={goldLight} goldBorder={goldBorder} />
          <Tag text={data.code} goldPrimary={goldPrimary} goldLight={goldLight} goldBorder={goldBorder} />
          
          <div className="flex-1" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              data.isLive ? onLiveClick() : handlePurchaseClick(e);
            }}
            className="h-[36px] px-3 rounded-[10px] bg-[#D4AF37] text-white text-[12px] font-bold flex items-center gap-[4px] active:scale-95 transition-transform shadow-md whitespace-nowrap"
          >
            {data.isLive && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"/>
              </svg>
            )}
            {data.isLive ? "Live үзэх" : "Оролцох"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ text, goldPrimary, goldLight, goldBorder }) => (
  <div 
    className="px-[8px] py-[6px] rounded-[8px] border text-[11px] font-[800] whitespace-nowrap"
    style={{
      backgroundColor: goldLight,
      borderColor: 'rgba(212, 175, 55, 0.3)',
      color: goldBorder
    }}
  >
    {text}
  </div>
);

export default CheckTicketScreen;