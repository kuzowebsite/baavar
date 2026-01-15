import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import BodyContent from "./components/BodyContent.jsx";
import MobileDrawer from "./components/MobileDrawer.jsx";
import CheckTicketScreen from "./components/CheckTicketScreen.jsx";
import WinnersScreen from "./components/WinnersScreen.jsx";
// 1. Дэлгэрэнгүй хуудсыг оруулж ирэх
import LottoDetailPage from "./components/LottoDetailPage.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 2. Сонгогдсон сугалааг хадгалах State
  const [selectedLotto, setSelectedLotto] = useState(null);

  const handleMenuSelect = (id) => {
    setSelectedIndex(id);
    setIsMenuOpen(false);
    setSelectedLotto(null); // Цэс солих үед дэлгэрэнгүйгээс гарна
  };

  // 3. Сугалаан дээр дарахад ажиллах функц
  const handleLottoClick = (lottoData) => {
    setSelectedLotto(lottoData);
  };

  // 4. Дэлгэрэнгүй хуудас нээлттэй үед шууд харуулах
  if (selectedLotto) {
    return (
      <LottoDetailPage
        {...selectedLotto} // Сонгогдсон сугалааны мэдээллийг дамжуулна
        onBack={() => setSelectedLotto(null)} // Буцах товч дарахад хаана
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <Header
        onMenuPressed={() => setIsMenuOpen(true)}
        onNavigate={handleMenuSelect}
        selectedIndex={selectedIndex}
      />

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelect={handleMenuSelect}
        selectedIndex={selectedIndex}
      />

      <main className="flex-grow">
        {selectedIndex === 0 ? (
          <>
            <HeroSection onCheckTicketTap={() => setSelectedIndex(1)} />
            <div className="max-w-7xl mx-auto">
              {/* 5. BodyContent руу функцийг дамжуулна */}
              <BodyContent onLottoClick={handleLottoClick} />
            </div>
          </>
        ) : selectedIndex === 1 ? (
          /* 6. CheckTicketScreen руу функцийг дамжуулна */
          <CheckTicketScreen onLottoClick={handleLottoClick} />
        ) : (
          <WinnersScreen />
        )}
      </main>

      {selectedIndex === 0 && <Footer />}
    </div>
  );
}

export default App;