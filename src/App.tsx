import { useState, useEffect } from 'react';
import { CalendarDays, UtensilsCrossed, Map, MapPin, Clock, Banknote, Info, CloudRain, Users, AlertCircle, CheckCircle2, BedDouble, Sun, Moon, CreditCard, Smartphone, MapPinned } from 'lucide-react';
import { itineraryData, foodData, attractionData, creditCardData, promoData, ePayData, mapData } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Tab = 'itinerary' | 'food' | 'attractions' | 'cards' | 'map';

const getIcon = (type: string) => {
  let bgColor = 'bg-[#D1C4B5]';

  switch (type) {
    case 'hotel':
      bgColor = 'bg-[#E8DCC4]';
      break;
    case 'attraction':
      bgColor = 'bg-[#C4D1E8]';
      break;
    case 'food':
      bgColor = 'bg-[#E8C4B5]';
      break;
    case 'transport':
      bgColor = 'bg-[#C4E8D1]';
      break;
  }

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="w-5 h-5 rounded-full shadow-md border-2 border-white ${bgColor}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-[#FAF5F0] dark:bg-[#2A2421] text-[#4A3F35] dark:text-[#FDF8F5] font-sans pb-24 transition-colors duration-200">
      {/* Header */}
      <header className={`bg-white/95 backdrop-blur-md dark:bg-[#362F2B]/95 shadow-sm dark:shadow-[#2A2421]/50 sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
        <div className={`max-w-3xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1' : 'py-5'}`}>
          <div>
            <h1 className={`font-bold text-[#4A3F35] dark:text-[#E2C07C] tracking-tight transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>名古屋親子遊</h1>
            <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0' : 'h-5 opacity-100 mt-1'}`}>
              <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] font-medium">12天11夜 春季旅行指南</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-xl text-[#8C7A6B] hover:bg-[#F0E5E1] dark:text-[#A89F91] dark:hover:bg-[#4A3F35] transition-all duration-300 ${isScrolled ? 'p-1.5' : 'p-2'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} /> : <Moon className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'itinerary' && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  行程總覽
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">每日行程與備案規劃</p>
              </div>
              
              <div className="space-y-4">
                {itineraryData.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col group is-active">
                    <div className="w-full bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] transition-colors duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-bold text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md mr-2">
                            {item.day}
                          </span>
                          <span className="text-xs text-[#8C7A6B] dark:text-[#A89F91] font-medium">
                            {item.date} ({item.weekday})
                          </span>
                        </div>
                        {item.status.includes('✅') ? (
                          <span className="flex items-center text-[10px] font-medium text-[#7A907A] dark:text-[#9EBA9E] bg-[#FDF8F5] dark:bg-[#7A907A]/20 px-2 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> 已確認
                          </span>
                        ) : (
                          <span className="flex items-center text-[10px] font-medium text-[#C5A059] dark:text-[#E0C082] bg-[#FDFBF5] dark:bg-[#C5A059]/20 px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3 mr-1" /> 待處理
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-2">{item.theme}</h3>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-start gap-2 text-sm text-[#6B5B4D] dark:text-[#D1C4B5]">
                          <MapPin className="w-4 h-4 text-[#A89F91] dark:text-[#8C7A6B] shrink-0 mt-0.5" />
                          <p className="leading-snug">{item.schedule}</p>
                        </div>
                        
                        {item.hotel !== '—' && (
                          <div className="flex items-start gap-2 text-sm text-[#6B5B4D] dark:text-[#D1C4B5]">
                            <BedDouble className="w-4 h-4 text-[#A89F91] dark:text-[#8C7A6B] shrink-0 mt-0.5" />
                            <p className="leading-snug">住宿：{item.hotel}</p>
                          </div>
                        )}
                        
                        {item.rainBackup !== '—' && (
                          <div className="flex items-start gap-2 text-sm text-[#8C7A6B] dark:text-[#A89F91] bg-[#FAF5F0] dark:bg-[#4A3F35]/50 p-2 rounded-lg mt-2 border border-[#F0E5E1] dark:border-[#5C4D42]/50">
                            <CloudRain className="w-4 h-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-xs leading-snug"><span className="font-semibold text-[#6B5B4D] dark:text-[#D1C4B5]">雨天備案：</span>{item.rainBackup}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  美食指南
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">名古屋必吃美食與餐廳清單</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight">{item.name}</h3>
                      <span className="text-[10px] font-medium text-orange-600 dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md whitespace-nowrap ml-2">
                        {item.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <MapPin className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B]" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <Clock className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B]" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <Banknote className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B]" />
                        <span>{item.price}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0E5E1] dark:border-[#4A3F35] space-y-2">
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span>建議：{item.suggestedDay}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span>{item.notes}</span>
                      </p>
                      <p className="text-xs font-medium text-[#6B5B4D] dark:text-[#D1C4B5] flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${item.reservation.includes('❌') ? 'bg-[#D1C4B5] dark:bg-[#6B5B4D]' : 'bg-amber-400 dark:bg-[#C5A059]'}`}></span>
                        {item.reservation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'attractions' && (
            <motion.div
              key="attractions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2">
                  <Map className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  景點總覽
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">各景點資訊與雨天/親子友善指標</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractionData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-indigo-600 dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[#FAF5F0] dark:bg-[#4A3F35]/50 border border-[#F0E5E1] dark:border-[#5C4D42] text-[#6B5B4D] dark:text-[#D1C4B5] px-1.5 py-0.5 rounded">
                        <Users className="w-3 h-3" /> {item.familyFriendly}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[#FAF5F0] dark:bg-[#4A3F35]/50 border border-[#F0E5E1] dark:border-[#5C4D42] text-[#6B5B4D] dark:text-[#D1C4B5] px-1.5 py-0.5 rounded">
                        <CloudRain className="w-3 h-3" /> {item.rainFriendly.split(' ')[0]}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <MapPin className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item.location} ({item.transport})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <Clock className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B5B4D] dark:text-[#D1C4B5]">
                        <Banknote className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span>{item.cost}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0E5E1] dark:border-[#4A3F35] space-y-2">
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">假日：{item.weekendFriendly}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">{item.notes}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  刷卡與支付攻略
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">海外消費高回饋信用卡與電子支付推薦</p>
              </div>

              {/* JCB Promo Section */}
              <div className="mb-8 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-[#E2C07C]/10 dark:to-[#C5A059]/10 p-5 rounded-2xl border border-rose-100 dark:border-[#E2C07C]/20 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="text-lg font-bold text-rose-700 dark:text-[#E2C07C]">{promoData.title}</h3>
                </div>
                <p className="text-sm text-rose-600/80 dark:text-[#E2C07C]/80 font-medium mb-4">{promoData.subtitle}</p>
                
                <div className="space-y-3 text-sm text-[#4A3F35] dark:text-[#D1C4B5]">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">活動期間：</span>{promoData.period}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Banknote className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">條件：</span>{promoData.condition}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">回饋：</span>{promoData.reward}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-rose-600 dark:text-[#E2C07C]">必要步驟：</span>{promoData.requirement}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">適用卡片：</span>{promoData.applicable}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                高回饋信用卡
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {creditCardData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.reward}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0E5E1] dark:border-[#4A3F35] space-y-2">
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">活動效期：{item.validity}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">{item.notes}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                電子支付 (PayPay) 補充攻略
              </h3>
              <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mb-4">在一些小店、市集、路邊攤，只收 PayPay 而不收信用卡，建議備用：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ePayData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-indigo-600 dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.reward}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0E5E1] dark:border-[#4A3F35] space-y-2">
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">活動效期：{item.validity}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">{item.notes}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-[calc(100vh-160px)] flex flex-col"
            >
              <div className="flex-1 rounded-2xl overflow-hidden border border-[#E8DCC4] dark:border-[#4A3F35] shadow-sm relative z-0">
                <MapContainer 
                  center={[35.1709, 136.8815]} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapData.map((item, idx) => (
                    <Marker key={idx} position={[item.lat, item.lng]} icon={getIcon(item.type)}>
                      <Popup>
                        <div className="p-1">
                          <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                          <p className="text-xs text-[#6B5B4D]">{item.description}</p>
                          <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full ${
                            item.type === 'hotel' ? 'bg-yellow-100 text-yellow-800' :
                            item.type === 'attraction' ? 'bg-blue-100 text-blue-700' :
                            item.type === 'food' ? 'bg-orange-100 text-orange-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.type === 'hotel' ? '住宿' : item.type === 'attraction' ? '景點' : item.type === 'food' ? '美食' : '交通'}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#362F2B] border-t border-[#E8DCC4] dark:border-[#4A3F35] pb-safe z-50 transition-colors duration-200">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center w-14 py-2 rounded-xl transition-colors ${
              activeTab === 'itinerary' ? 'text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
            }`}
          >
            <CalendarDays className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">行程</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center justify-center w-14 py-2 rounded-xl transition-colors ${
              activeTab === 'food' ? 'text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">美食</span>
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`flex flex-col items-center justify-center w-14 py-2 rounded-xl transition-colors ${
              activeTab === 'attractions' ? 'text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
            }`}
          >
            <Map className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">景點</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center w-14 py-2 rounded-xl transition-colors ${
              activeTab === 'map' ? 'text-[#D9A0A5] dark:text-[#9EBA9E] bg-[#FDF8F5] dark:bg-[#7A907A]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
            }`}
          >
            <MapPinned className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">地圖</span>
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center justify-center w-14 py-2 rounded-xl transition-colors ${
              activeTab === 'cards' ? 'text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
            }`}
          >
            <CreditCard className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">刷卡</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
