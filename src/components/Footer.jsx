import React from 'react';

const Footer = () => {
  // --- GOLDEN THEME COLORS ---
  const goldPrimary = "#D4AF37";
  const goldDark = "#B4941F";
  const goldLight = "#F3F1EB"; 
  const textDark = "#1A1A1A";

  // --- ТАТАХ ЛИНКҮҮД ---
  const androidDownloadLink = "https://github.com/kuzowebsite/Suglaa-APP/releases/download/v1.0.1/BAAVAR.apk"; 
  const iosDownloadLink = "#"; 

  return (
    <footer 
      className="w-full border-t px-5 py-6 md:px-6 md:py-10 mt-10"
      style={{
        backgroundColor: goldLight,
        borderColor: `rgba(212, 175, 55, 0.3)`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ============================== */}
        {/* MOBILE LAYOUT (md:hidden)   */}
        {/* ============================== */}
        <div className="flex flex-col gap-5 md:hidden">
          
          {/* 1. ДЭЭД ХЭСЭГ */}
          <div className="flex justify-between items-start">
            
            {/* Зүүн хана (App татах хэсэг) - Хэвээрээ */}
            <div className="flex flex-col items-center gap-2 pl-4">
              <img 
                src="/assets/baavar_app_down.png" 
                alt="Baavar App" 
                className="h-[90px] object-contain drop-shadow-md mb-1"
              />
              <AppDownloadBtn 
                href={androidDownloadLink}
                download 
                icon={<AndroidIcon />} 
                text="Google Play" 
                subText="GET IT ON" 
                className="w-[115px] h-[38px]" 
              />
              <AppDownloadBtn 
                href={iosDownloadLink}
                download 
                icon={<AppleIcon />} 
                text="App Store" 
                subText="Download on the" 
                className="w-[115px] h-[38px]" 
              />
            </div>

            {/* Баруун хана (Лого + Social) - ӨӨРЧЛӨЛТ ОРСОН */}
            {/* pt-8 байсныг pt-14 болгож доошлууллаа */}
            <div className="flex flex-col items-end pt-14 gap-4 pr-2">
              <div className="flex flex-col items-center gap-3">
                {/* Логог томруулав: h-[30px] -> h-[45px] */}
                <img 
                  src="/assets/Baavar_text_logo.png" 
                  alt="Baavar Logo" 
                  className="h-[45px] object-contain mb-1"
                />
                
                {/* Social Icon-уудын зайг gap-1.5 -> gap-2 болгож суллав */}
                <div className="flex flex-row gap-2">
                  <IconBtn icon={<FacebookIcon />} color={goldDark} />
                  <IconBtn icon={<InstagramIcon />} color={goldDark} />
                  <IconBtn icon={<EmailIcon />} color={goldDark} />
                  <IconBtn icon={<PlayIcon />} color={goldDark} />
                </div>
              </div>
            </div>

          </div>

          {/* 2. ДУНД ХЭСЭГ */}
          <div className="flex justify-center gap-5 w-full border-t border-[#D4AF37]/20 pt-5">
            <FooterLink text="Үйлчилгээний нөхцөл" color={textDark} />
            <FooterLink text="Нууцлалын бодлого" color={textDark} />
          </div>

          {/* 3. ДООД ХЭСЭГ */}
          <div className="text-center">
             <p 
              className="text-[10px] font-normal"
              style={{ color: `${goldDark}99` }} 
            >
              © 2026 BAAVAR. All rights reserved.
            </p>
          </div>

        </div>


        {/* ============================== */}
        {/* DESKTOP LAYOUT (md:flex) - Хэвээрээ */}
        {/* ============================== */}
        <div className="hidden md:flex flex-row justify-between items-end gap-4">
          
          <div className="flex flex-row items-center justify-start w-1/3 gap-6">
             <div className="relative">
                <img 
                  src="/assets/baavar_app_down.png" 
                  alt="Baavar App" 
                  className="h-[140px] object-contain drop-shadow-md"
                />
             </div>
             <div className="flex flex-col gap-3">
               <AppDownloadBtn href={androidDownloadLink} download icon={<AndroidIcon />} text="Google Play" subText="GET IT ON" className="w-[150px]" />
               <AppDownloadBtn href={iosDownloadLink} download icon={<AppleIcon />} text="App Store" subText="Download on the" className="w-[150px]" />
             </div>
          </div>

          <div className="flex flex-col items-center justify-end w-1/3 h-full">
            <div className="opacity-90 mb-8">
              <img 
                src="/assets/Baavar_text_logo.png" 
                alt="Baavar Logo" 
                className="h-[55px] object-contain"
              />
            </div>
            <p 
              className="text-[11px] font-normal whitespace-nowrap"
              style={{ color: `${goldDark}99` }} 
            >
              © 2026 BAAVAR. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-end w-1/3">
            <div className="flex justify-end gap-2 mb-4 w-full">
              <IconBtn icon={<FacebookIcon />} color={goldDark} />
              <IconBtn icon={<InstagramIcon />} color={goldDark} />
              <IconBtn icon={<EmailIcon />} color={goldDark} />
              <IconBtn icon={<PlayIcon />} color={goldDark} />
            </div>
            <div className="flex flex-wrap justify-end gap-x-6 gap-y-2 w-full">
              <FooterLink text="Үйлчилгээний нөхцөл" color={textDark} />
              <FooterLink text="Нууцлалын бодлого" color={textDark} />
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

// --- ТУСЛАХ КОМПОНЕНТУУД ---

// IconBtn-ийг гар утсан дээр томруулав
const IconBtn = ({ icon, color }) => (
  <button 
    // p-1.5 байсныг p-2 болгов (Mobile padding increased)
    className="p-2 md:p-2.5 transition-all active:scale-95 rounded-full hover:bg-black/5 flex items-center justify-center border border-transparent hover:border-[#D4AF37]/20 bg-[#D4AF37]/5 md:bg-transparent"
    style={{ color: color }}
  >
    {/* w-4 h-4 байсныг w-5 h-5 болгов (Mobile icon size increased) */}
    <div className="w-5 h-5 md:w-5 md:h-5 flex items-center justify-center">
      {icon}
    </div>
  </button>
);

const FooterLink = ({ text, color }) => (
  <button 
    className="text-[11px] md:text-[13px] font-semibold transition-all hover:text-[#B4941F] relative group"
    style={{ color: `${color}B3` }} 
  >
    {text}
    <span className="absolute -bottom-0.5 right-0 w-0 h-[1px] bg-[#B4941F] transition-all group-hover:w-full"></span>
  </button>
);

const AppDownloadBtn = ({ icon, text, subText, className, href, download }) => (
  <a 
    href={href}
    download={download ? true : undefined} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`
      flex items-center gap-2 
      px-2 py-1 md:px-3 md:py-2 rounded-lg 
      bg-gradient-to-r from-[#D4AF37] to-[#B4941F] 
      text-white 
      shadow-[0_4px_12px_rgba(212,175,55,0.4)]
      hover:shadow-[0_6px_16px_rgba(212,175,55,0.5)] 
      hover:-translate-y-0.5
      transition-all duration-300
      active:scale-95 active:shadow-none
      cursor-pointer no-underline 
      border border-transparent
      ${className}
    `}
  >
    <div className="text-white w-4 h-4 md:w-6 md:h-6 flex-shrink-0 drop-shadow-sm">
      {icon}
    </div>
    <div className="flex flex-col items-start leading-none">
      <span className="text-[6px] md:text-[8px] uppercase opacity-90 tracking-wide font-medium text-white/90">{subText}</span>
      <span className="text-[9px] md:text-[12px] font-bold whitespace-nowrap tracking-wide">{text}</span>
    </div>
  </a>
);

// --- SVG ICONS (Хэвээрээ) ---
const FacebookIcon = () => (<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" /></svg>);
const InstagramIcon = () => (<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3.2" /><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" /></svg>);
const EmailIcon = () => (<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg>);
const PlayIcon = () => (<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>);
const AppleIcon = () => (<svg viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>);
const AndroidIcon = () => (<svg viewBox="0 0 576 512" fill="currentColor"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07A301.25,301.25,0,0,0,288,135.63a301.25,301.25,0,0,0-123.29,12.9l-48.53-84.07a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/></svg>);


export default Footer;
