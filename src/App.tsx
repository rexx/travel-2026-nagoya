import { useState, useEffect } from 'react';
import { CalendarDays, UtensilsCrossed, Map, MapPin, Clock, Banknote, Info, CloudRain, Users, AlertCircle, CheckCircle2, BedDouble, Sun, Moon, CreditCard, Smartphone } from 'lucide-react';
import { itineraryData, foodData, attractionData, creditCardData, promoData, ePayData } from './data';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'itinerary' | 'food' | 'attractions' | 'cards';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-800/50 sticky top-0 z-10 transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 tracking-tight">名古屋親子遊</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">12天11夜 春季旅行指南</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 p-2 rounded-xl">
              <Map className="w-6 h-6" />
            </div>
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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  行程總覽
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">每日行程與備案規劃</p>
              </div>
              
              <div className="space-y-4">
                {itineraryData.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col group is-active">
                    <div className="w-full bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-md mr-2">
                            {item.day}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {item.date} ({item.weekday})
                          </span>
                        </div>
                        {item.status.includes('✅') ? (
                          <span className="flex items-center text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> 已確認
                          </span>
                        ) : (
                          <span className="flex items-center text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3 mr-1" /> 待處理
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{item.theme}</h3>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                          <p className="leading-snug">{item.schedule}</p>
                        </div>
                        
                        {item.hotel !== '—' && (
                          <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <BedDouble className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                            <p className="leading-snug">住宿：{item.hotel}</p>
                          </div>
                        )}
                        
                        {item.rainBackup !== '—' && (
                          <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg mt-2 border border-slate-100 dark:border-slate-700/50">
                            <CloudRain className="w-4 h-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-xs leading-snug"><span className="font-semibold text-slate-600 dark:text-slate-300">雨天備案：</span>{item.rainBackup}</p>
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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  美食指南
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">名古屋必吃美食與餐廳清單</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.name}</h3>
                      <span className="text-[10px] font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-md whitespace-nowrap ml-2">
                        {item.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Banknote className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{item.price}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>建議：{item.suggestedDay}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{item.notes}</span>
                      </p>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${item.reservation.includes('❌') ? 'bg-slate-300 dark:bg-slate-600' : 'bg-amber-400 dark:bg-amber-500'}`}></span>
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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Map className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  景點總覽
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">各景點資訊與雨天/親子友善指標</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractionData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                        <Users className="w-3 h-3" /> {item.familyFriendly}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                        <CloudRain className="w-3 h-3" /> {item.rainFriendly.split(' ')[0]}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item.location} ({item.transport})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Banknote className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{item.cost}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="leading-snug">假日：{item.weekendFriendly}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                  刷卡與支付攻略
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">海外消費高回饋信用卡與電子支付推薦</p>
              </div>

              {/* JCB Promo Section */}
              <div className="mb-8 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 p-5 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400">{promoData.title}</h3>
                </div>
                <p className="text-sm text-rose-600/80 dark:text-rose-400/80 font-medium mb-4">{promoData.subtitle}</p>
                
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-4 h-4 text-rose-400 dark:text-rose-500 shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-slate-800 dark:text-slate-200">活動期間：</span>{promoData.period}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Banknote className="w-4 h-4 text-rose-400 dark:text-rose-500 shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-slate-800 dark:text-slate-200">條件：</span>{promoData.condition}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 dark:text-rose-500 shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-slate-800 dark:text-slate-200">回饋：</span>{promoData.reward}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 dark:text-rose-500 shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-rose-600 dark:text-rose-400">必要步驟：</span>{promoData.requirement}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-rose-400 dark:text-rose-500 shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-slate-800 dark:text-slate-200">適用卡片：</span>{promoData.applicable}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                高回饋信用卡
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {creditCardData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.reward}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="leading-snug">活動效期：{item.validity}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="leading-snug">{item.notes}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                電子支付 (PayPay) 補充攻略
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">在一些小店、市集、路邊攤，只收 PayPay 而不收信用卡，建議備用：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ePayData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight pr-2">{item.name}</h3>
                      <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.reward}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="leading-snug">活動效期：{item.validity}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="leading-snug">{item.notes}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe z-50 transition-colors duration-200">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
              activeTab === 'itinerary' ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <CalendarDays className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">行程</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
              activeTab === 'food' ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <UtensilsCrossed className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">美食</span>
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
              activeTab === 'attractions' ? 'text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Map className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">景點</span>
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
              activeTab === 'cards' ? 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <CreditCard className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">刷卡</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
