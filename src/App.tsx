import { useState, useEffect, useRef } from 'react';
import { CalendarDays, UtensilsCrossed, Map, MapPin, Clock, Banknote, Info, CloudRain, Users, AlertCircle, CheckCircle2, BedDouble, Sun, Moon, CreditCard, Smartphone, MapPinned, Settings2, X, PlaneTakeoff, PlaneLanding, Trash2, Save, LayoutGrid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { itineraryData, foodData, attractionData, creditCardData, promoData, ePayData } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { ItineraryItem } from './types';

type Tab = 'itinerary' | 'food' | 'attractions' | 'cards' | 'map';
type ItineraryViewMode = 'card' | 'list';
const MAP_EMBED_URL_STORAGE_KEY = 'nagoya-map-embed-url';
const FLIGHT_INFO_STORAGE_KEY = 'nagoya-flight-info';
const GOOGLE_MAPS_EMBED_PLACEHOLDER = 'https://www.google.com/maps/d/embed?...';
const FLIGHT_SEGMENT_LABELS = {
  arrival: '去程',
  departure: '回程',
} as const;

type FlightSegmentKey = keyof typeof FLIGHT_SEGMENT_LABELS;

interface FlightSegment {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  terminal: string;
  note: string;
}

interface FlightInfo {
  arrival: FlightSegment;
  departure: FlightSegment;
}

const createEmptyFlightSegment = (): FlightSegment => ({
  airline: '',
  flightNumber: '',
  departureAirport: '',
  arrivalAirport: '',
  departureTime: '',
  arrivalTime: '',
  terminal: '',
  note: '',
});

const createEmptyFlightInfo = (): FlightInfo => ({
  arrival: createEmptyFlightSegment(),
  departure: createEmptyFlightSegment(),
});

const normalizeFlightSegment = (segment?: Partial<FlightSegment>): FlightSegment => ({
  airline: segment?.airline?.trim() ?? '',
  flightNumber: segment?.flightNumber?.trim() ?? '',
  departureAirport: segment?.departureAirport?.trim() ?? '',
  arrivalAirport: segment?.arrivalAirport?.trim() ?? '',
  departureTime: segment?.departureTime?.trim() ?? '',
  arrivalTime: segment?.arrivalTime?.trim() ?? '',
  terminal: segment?.terminal?.trim() ?? '',
  note: segment?.note?.trim() ?? '',
});

const loadFlightInfo = (): FlightInfo => {
  if (typeof window === 'undefined') {
    return createEmptyFlightInfo();
  }

  const rawFlightInfo = window.localStorage.getItem(FLIGHT_INFO_STORAGE_KEY);

  if (!rawFlightInfo) {
    return createEmptyFlightInfo();
  }

  try {
    const parsedFlightInfo = JSON.parse(rawFlightInfo) as Partial<FlightInfo>;

    return {
      arrival: normalizeFlightSegment(parsedFlightInfo.arrival),
      departure: normalizeFlightSegment(parsedFlightInfo.departure),
    };
  } catch {
    return createEmptyFlightInfo();
  }
};

const hasFlightSegmentData = (segment: FlightSegment): boolean =>
  Object.values(segment).some((value) => value.trim().length > 0);

const formatFlightDateTime = (value: string): string => {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const formatCardPageAmounts = (value: string): string =>
  value.replace(/(?<![\d/.,])(\d{4,})(?![\d/.%])/g, (match) => Number(match).toLocaleString('en-US'));

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isMapSettingsOpen, setIsMapSettingsOpen] = useState(false);
  const [mapEmbedUrl, setMapEmbedUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(MAP_EMBED_URL_STORAGE_KEY) ?? '';
    }

    return '';
  });
  const [mapEmbedDraft, setMapEmbedDraft] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(MAP_EMBED_URL_STORAGE_KEY) ?? '';
    }

    return '';
  });
  const [flightInfo, setFlightInfo] = useState<FlightInfo>(() => loadFlightInfo());
  const [flightInfoDraft, setFlightInfoDraft] = useState<FlightInfo>(() => loadFlightInfo());
  const [activeFlightEditor, setActiveFlightEditor] = useState<FlightSegmentKey | null>(null);
  const [itineraryViewMode, setItineraryViewMode] = useState<ItineraryViewMode>('card');
  const [expandedItineraryDays, setExpandedItineraryDays] = useState<string[]>([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const updateNavHeight = () => {
      setNavHeight(navRef.current?.offsetHeight ?? 0);
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  const applyMapEmbedUrl = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const trimmedUrl = mapEmbedDraft.trim();

    setMapEmbedUrl(trimmedUrl);

    if (trimmedUrl) {
      window.localStorage.setItem(MAP_EMBED_URL_STORAGE_KEY, trimmedUrl);
      return;
    }

    window.localStorage.removeItem(MAP_EMBED_URL_STORAGE_KEY);
  };

  const updateFlightDraft = (
    segmentKey: FlightSegmentKey,
    field: keyof FlightSegment,
    value: string,
  ) => {
    setFlightInfoDraft((current) => ({
      ...current,
      [segmentKey]: {
        ...current[segmentKey],
        [field]: value,
      },
    }));
  };

  const applyFlightInfo = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const normalizedFlightInfo: FlightInfo = {
      arrival: normalizeFlightSegment(flightInfoDraft.arrival),
      departure: normalizeFlightSegment(flightInfoDraft.departure),
    };

    setFlightInfo(normalizedFlightInfo);
    setFlightInfoDraft(normalizedFlightInfo);

    if (hasFlightSegmentData(normalizedFlightInfo.arrival) || hasFlightSegmentData(normalizedFlightInfo.departure)) {
      window.localStorage.setItem(FLIGHT_INFO_STORAGE_KEY, JSON.stringify(normalizedFlightInfo));
      return;
    }

    window.localStorage.removeItem(FLIGHT_INFO_STORAGE_KEY);
  };

  const clearFlightInfo = () => {
    const emptyFlightInfo = createEmptyFlightInfo();

    setFlightInfo(emptyFlightInfo);
    setFlightInfoDraft(emptyFlightInfo);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(FLIGHT_INFO_STORAGE_KEY);
    }
  };

  const clearFlightSegment = (segmentKey: FlightSegmentKey) => {
    const emptySegment = createEmptyFlightSegment();

    setFlightInfo((current) => {
      const nextFlightInfo = {
        ...current,
        [segmentKey]: emptySegment,
      };

      if (typeof window !== 'undefined') {
        if (hasFlightSegmentData(nextFlightInfo.arrival) || hasFlightSegmentData(nextFlightInfo.departure)) {
          window.localStorage.setItem(FLIGHT_INFO_STORAGE_KEY, JSON.stringify(nextFlightInfo));
        } else {
          window.localStorage.removeItem(FLIGHT_INFO_STORAGE_KEY);
        }
      }

      return nextFlightInfo;
    });

    setFlightInfoDraft((current) => ({
      ...current,
      [segmentKey]: emptySegment,
    }));
  };

  const toggleItineraryExpanded = (day: string) => {
    setExpandedItineraryDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day],
    );
  };

  const renderItineraryItem = (item: ItineraryItem, idx: number) => {
    const flightSegment =
      item.day === 'Day 1'
        ? flightInfo.arrival
        : item.day === 'Day 12'
          ? flightInfo.departure
          : null;
    const flightSegmentKey =
      item.day === 'Day 1'
        ? 'arrival'
        : item.day === 'Day 12'
          ? 'departure'
          : null;
    const hasFlightInfo = flightSegment ? hasFlightSegmentData(flightSegment) : false;
    const isConfirmed = item.status.includes('✅');
    const isListView = itineraryViewMode === 'list';
    const isExpanded = expandedItineraryDays.includes(item.day);

    if (isListView) {
      const listSummaryParts = [
        item.schedule,
        item.hotel !== '—' ? `住宿：${item.hotel}` : '',
        item.rainBackup !== '—' ? `雨備：${item.rainBackup}` : '',
        flightSegment && hasFlightInfo
          ? `${item.day === 'Day 1' ? '抵達航班' : '返程航班'}`
          : '',
      ].filter(Boolean);
      const flightSummaryParts = flightSegment && hasFlightInfo
        ? [
            [flightSegment.airline, flightSegment.flightNumber].filter(Boolean).join(' '),
            [flightSegment.departureAirport, flightSegment.arrivalAirport].filter(Boolean).join(' → '),
            [formatFlightDateTime(flightSegment.departureTime), formatFlightDateTime(flightSegment.arrivalTime)].filter(Boolean).join(' → '),
            flightSegment.terminal,
            flightSegment.note,
          ].filter(Boolean)
        : [];

      return (
        <div
          key={idx}
          className={`bg-white dark:bg-[#362F2B] px-4 py-3 transition-colors duration-200 ${
            idx > 0 ? 'border-t border-[#F0E5E1] dark:border-[#4A3F35]' : ''
          }`}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleItineraryExpanded(item.day)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleItineraryExpanded(item.day);
              }
            }}
            className="block w-full cursor-pointer text-left"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? '收合' : '展開'} ${item.day} 行程`}
          >
            <div className="space-y-1.5">
              <div className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-2 text-xs">
                <div className="whitespace-nowrap text-sm font-semibold text-[#4A3F35] dark:text-[#FDF8F5]">
                  {item.day}
                </div>
                <div className="whitespace-nowrap text-[#8C7A6B] dark:text-[#A89F91]">
                  {item.date} ({item.weekday})
                </div>
                <h3 className="min-w-0 truncate text-sm font-bold text-[#4A3F35] dark:text-[#FDF8F5] font-serif">
                  {item.theme}
                </h3>
                <div className="flex shrink-0 items-center gap-2 justify-end">
                  <span className={`flex items-center whitespace-nowrap text-[10px] font-medium px-2 py-1 rounded-full ${isConfirmed ? 'text-[#7A907A] dark:text-[#9EBA9E] bg-[#FDF8F5] dark:bg-[#7A907A]/20' : 'text-[#C5A059] dark:text-[#E0C082] bg-[#FDFBF5] dark:bg-[#C5A059]/20'}`}>
                    {isConfirmed ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                    {isConfirmed ? '已確認' : '待處理'}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full border border-[#E8DCC4] bg-[#FAF5F0] p-1.5 text-[#8C7A6B] dark:border-[#5C4D42] dark:bg-[#2A2421] dark:text-[#A89F91]">
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="grid gap-2 md:grid-cols-[7rem_minmax(0,1fr)]">
                  <div />
                  <div className="min-w-0 space-y-3 rounded-xl bg-[#FAF5F0] px-3 py-3 text-sm text-[#6B5B4D] dark:bg-[#2A2421] dark:text-[#D1C4B5]">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A89F91] dark:text-[#8C7A6B]" />
                      <p className="leading-6">{item.schedule}</p>
                    </div>

                    {item.hotel !== '—' && (
                      <div className="flex items-start gap-2">
                        <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-[#A89F91] dark:text-[#8C7A6B]" />
                        <p>{item.hotel}</p>
                      </div>
                    )}

                    {item.rainBackup !== '—' && (
                      <div className="flex items-start gap-2">
                        <CloudRain className="mt-0.5 h-4 w-4 shrink-0 text-blue-400 dark:text-blue-500" />
                        <p className="leading-6">{item.rainBackup}</p>
                      </div>
                    )}

                    {flightSummaryParts.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C7A6B] dark:text-[#A89F91]">
                          {item.day === 'Day 1' ? '抵達航班' : '返程航班'}
                        </p>
                        <div className="space-y-1">
                          {flightSummaryParts.map((detail, detailIdx) => (
                            <p key={detailIdx} className="leading-6">{detail}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {flightSegmentKey && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveFlightEditor((current) => current === flightSegmentKey ? null : flightSegmentKey);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E8DCC4] bg-[#FAF5F0] px-2.5 py-1 text-[10px] font-medium text-[#8C7A6B] transition hover:border-[#D9A0A5] hover:text-[#6B5B4D] dark:border-[#5C4D42] dark:bg-[#2A2421] dark:text-[#A89F91] dark:hover:border-[#9EBA9E] dark:hover:text-[#D1C4B5]"
                      >
                        {item.day === 'Day 1' ? <PlaneLanding className="h-3 w-3" /> : <PlaneTakeoff className="h-3 w-3" />}
                        {activeFlightEditor === flightSegmentKey ? '收起航班' : '航班資訊'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isExpanded && flightSegmentKey && activeFlightEditor === flightSegmentKey && (
            <div className="mt-3 rounded-xl border border-[#E8DCC4] bg-[#FAF5F0] p-3 dark:border-[#5C4D42] dark:bg-[#2A2421]">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#4A3F35] dark:text-[#FDF8F5]">
                      {flightSegmentKey === 'arrival' ? '去程航班設定' : '回程航班設定'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => clearFlightSegment(flightSegmentKey)}
                      aria-label="清空航班資訊"
                      title="清空航班資訊"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8DCC4] text-[#8C7A6B] transition hover:border-[#D9A0A5] hover:text-[#6B5B4D] dark:border-[#5C4D42] dark:text-[#A89F91] dark:hover:border-[#9EBA9E] dark:hover:text-[#D1C4B5]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={applyFlightInfo}
                      aria-label="儲存航班資訊"
                      title="儲存航班資訊"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9A0A5] text-white transition hover:bg-[#C88992] dark:bg-[#7A907A] dark:hover:bg-[#6A816A]"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={flightInfoDraft[flightSegmentKey].airline}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'airline', event.target.value)}
                    placeholder="航空公司"
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="text"
                    value={flightInfoDraft[flightSegmentKey].flightNumber}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'flightNumber', event.target.value)}
                    placeholder="航班編號"
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="text"
                    value={flightInfoDraft[flightSegmentKey].departureAirport}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'departureAirport', event.target.value)}
                    placeholder="出發機場"
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="text"
                    value={flightInfoDraft[flightSegmentKey].arrivalAirport}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'arrivalAirport', event.target.value)}
                    placeholder="抵達機場"
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="datetime-local"
                    value={flightInfoDraft[flightSegmentKey].departureTime}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'departureTime', event.target.value)}
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="datetime-local"
                    value={flightInfoDraft[flightSegmentKey].arrivalTime}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'arrivalTime', event.target.value)}
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                  />
                  <input
                    type="text"
                    value={flightInfoDraft[flightSegmentKey].terminal}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'terminal', event.target.value)}
                    placeholder="航廈 / 櫃位備註"
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20 sm:col-span-2"
                  />
                  <textarea
                    value={flightInfoDraft[flightSegmentKey].note}
                    onChange={(event) => updateFlightDraft(flightSegmentKey, 'note', event.target.value)}
                    placeholder="備註"
                    rows={2}
                    className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20 sm:col-span-2"
                  />
                </div>
              </div>
          )}
        </div>
      );
    }

    return (
      <div key={idx} className="relative flex flex-col group is-active">
        <div className="w-full bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] transition-colors duration-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div>
                <span className="text-xs font-bold text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md mr-2">
                  {item.day}
                </span>
                <span className="text-xs text-[#8C7A6B] dark:text-[#A89F91] font-medium">
                  {item.date} ({item.weekday})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {flightSegmentKey && (
                <button
                  type="button"
                  onClick={() => setActiveFlightEditor((current) => current === flightSegmentKey ? null : flightSegmentKey)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E8DCC4] bg-[#FAF5F0] px-2.5 py-1 text-[10px] font-medium text-[#8C7A6B] transition hover:border-[#D9A0A5] hover:text-[#6B5B4D] dark:border-[#5C4D42] dark:bg-[#2A2421] dark:text-[#A89F91] dark:hover:border-[#9EBA9E] dark:hover:text-[#D1C4B5]"
                >
                  {item.day === 'Day 1' ? <PlaneLanding className="h-3 w-3" /> : <PlaneTakeoff className="h-3 w-3" />}
                  {activeFlightEditor === flightSegmentKey ? '收起航班' : '航班資訊'}
                </button>
              )}
              <span className={`flex items-center text-[10px] font-medium px-2 py-1 rounded-full ${isConfirmed ? 'text-[#7A907A] dark:text-[#9EBA9E] bg-[#FDF8F5] dark:bg-[#7A907A]/20' : 'text-[#C5A059] dark:text-[#E0C082] bg-[#FDFBF5] dark:bg-[#C5A059]/20'}`}>
                {isConfirmed ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                {isConfirmed ? '已確認' : '待處理'}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-2 font-serif">{item.theme}</h3>

          <div className="space-y-2 mt-3">
            <div className="space-y-2">
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
                <div className="flex items-start gap-2 text-sm text-[#8C7A6B] dark:text-[#A89F91] bg-[#FAF5F0] dark:bg-[#4A3F35]/50 p-2 rounded-lg border border-[#F0E5E1] dark:border-[#5C4D42]/50">
                  <CloudRain className="w-4 h-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs leading-snug"><span className="font-semibold text-[#6B5B4D] dark:text-[#D1C4B5]">雨天備案：</span>{item.rainBackup}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {flightSegment && hasFlightInfo && (
                <div className="flex items-start gap-2 text-sm text-[#6B5B4D] dark:text-[#D1C4B5] bg-[#FDF8F5] dark:bg-[#4A3F35]/50 p-3 rounded-lg border border-[#F0E5E1] dark:border-[#5C4D42]/50">
                  {item.day === 'Day 1' ? (
                    <PlaneLanding className="w-4 h-4 text-[#D9A0A5] dark:text-[#E2C07C] shrink-0 mt-0.5" />
                  ) : (
                    <PlaneTakeoff className="w-4 h-4 text-[#D9A0A5] dark:text-[#E2C07C] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#4A3F35] dark:text-[#FDF8F5]">
                      {item.day === 'Day 1' ? '抵達航班' : '返程航班'}
                    </p>
                    {(flightSegment.airline || flightSegment.flightNumber) && (
                      <p className="leading-snug">
                        {[flightSegment.airline, flightSegment.flightNumber].filter(Boolean).join(' ')}
                      </p>
                    )}
                    {(flightSegment.departureAirport || flightSegment.arrivalAirport) && (
                      <p className="leading-snug">
                        {[flightSegment.departureAirport, flightSegment.arrivalAirport].filter(Boolean).join(' → ')}
                      </p>
                    )}
                    {(flightSegment.departureTime || flightSegment.arrivalTime) && (
                      <p className="text-xs leading-snug text-[#8C7A6B] dark:text-[#A89F91]">
                        {[formatFlightDateTime(flightSegment.departureTime), formatFlightDateTime(flightSegment.arrivalTime)].filter(Boolean).join(' → ')}
                      </p>
                    )}
                    {flightSegment.terminal && (
                      <p className="text-xs leading-snug text-[#8C7A6B] dark:text-[#A89F91]">
                        {flightSegment.terminal}
                      </p>
                    )}
                    {flightSegment.note && (
                      <p className="text-xs leading-snug text-[#8C7A6B] dark:text-[#A89F91]">
                        {flightSegment.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {flightSegmentKey && activeFlightEditor === flightSegmentKey && (
                <div className="rounded-xl border border-[#E8DCC4] bg-[#FAF5F0] p-3 dark:border-[#5C4D42] dark:bg-[#2A2421]">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#4A3F35] dark:text-[#FDF8F5]">
                        {flightSegmentKey === 'arrival' ? '去程航班設定' : '回程航班設定'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => clearFlightSegment(flightSegmentKey)}
                        aria-label="清空航班資訊"
                        title="清空航班資訊"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8DCC4] text-[#8C7A6B] transition hover:border-[#D9A0A5] hover:text-[#6B5B4D] dark:border-[#5C4D42] dark:text-[#A89F91] dark:hover:border-[#9EBA9E] dark:hover:text-[#D1C4B5]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={applyFlightInfo}
                        aria-label="儲存航班資訊"
                        title="儲存航班資訊"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9A0A5] text-white transition hover:bg-[#C88992] dark:bg-[#7A907A] dark:hover:bg-[#6A816A]"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={flightInfoDraft[flightSegmentKey].airline}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'airline', event.target.value)}
                      placeholder="航空公司"
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="text"
                      value={flightInfoDraft[flightSegmentKey].flightNumber}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'flightNumber', event.target.value)}
                      placeholder="航班編號"
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="text"
                      value={flightInfoDraft[flightSegmentKey].departureAirport}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'departureAirport', event.target.value)}
                      placeholder="出發機場"
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="text"
                      value={flightInfoDraft[flightSegmentKey].arrivalAirport}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'arrivalAirport', event.target.value)}
                      placeholder="抵達機場"
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="datetime-local"
                      value={flightInfoDraft[flightSegmentKey].departureTime}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'departureTime', event.target.value)}
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="datetime-local"
                      value={flightInfoDraft[flightSegmentKey].arrivalTime}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'arrivalTime', event.target.value)}
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                    />
                    <input
                      type="text"
                      value={flightInfoDraft[flightSegmentKey].terminal}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'terminal', event.target.value)}
                      placeholder="航廈 / 櫃位備註"
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20 sm:col-span-2"
                    />
                    <textarea
                      value={flightInfoDraft[flightSegmentKey].note}
                      onChange={(event) => updateFlightDraft(flightSegmentKey, 'note', event.target.value)}
                      placeholder="備註"
                      rows={2}
                      className="w-full rounded-xl border border-[#E8DCC4] bg-white px-3 py-2 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#362F2B] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20 sm:col-span-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF5F0] dark:bg-[#2A2421] text-[#4A3F35] dark:text-[#FDF8F5] font-sans transition-colors duration-200 ${activeTab === 'map' ? 'pb-0' : 'pb-24'}`}>
      {activeTab !== 'map' && (
        <header className="bg-white/95 backdrop-blur-md dark:bg-[#362F2B]/95 shadow-sm dark:shadow-[#2A2421]/50 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="font-bold text-lg text-[#4A3F35] dark:text-[#E2C07C] tracking-tight font-serif">名古屋親子遊</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-xl text-[#8C7A6B] hover:bg-[#F0E5E1] dark:text-[#A89F91] dark:hover:bg-[#4A3F35] transition-all duration-300 p-1.5"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="transition-all duration-300 w-4 h-4" /> : <Moon className="transition-all duration-300 w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={activeTab === 'map' ? 'px-0 pt-0' : 'max-w-3xl mx-auto px-4 py-6'}
        style={activeTab === 'map' ? { height: `calc(100dvh - ${navHeight}px)` } : undefined}
      >
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
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2 font-serif">
                      <CalendarDays className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                      行程總覽
                    </h2>
                    <div className="inline-flex shrink-0 rounded-2xl border border-[#E8DCC4] bg-white p-1 shadow-sm dark:border-[#5C4D42] dark:bg-[#362F2B]">
                      <button
                        type="button"
                        onClick={() => setItineraryViewMode('card')}
                        className={`inline-flex items-center justify-center rounded-xl p-2 transition ${itineraryViewMode === 'card' ? 'bg-[#FAF5F0] text-[#6B5B4D] dark:bg-[#4A3F35] dark:text-[#FDF8F5]' : 'text-[#8C7A6B] hover:text-[#6B5B4D] dark:text-[#A89F91] dark:hover:text-[#FDF8F5]'}`}
                        aria-pressed={itineraryViewMode === 'card'}
                        aria-label="切換為卡片檢視"
                        title="卡片"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setItineraryViewMode('list')}
                        className={`inline-flex items-center justify-center rounded-xl p-2 transition ${itineraryViewMode === 'list' ? 'bg-[#FAF5F0] text-[#6B5B4D] dark:bg-[#4A3F35] dark:text-[#FDF8F5]' : 'text-[#8C7A6B] hover:text-[#6B5B4D] dark:text-[#A89F91] dark:hover:text-[#FDF8F5]'}`}
                        aria-pressed={itineraryViewMode === 'list'}
                        aria-label="切換為列表檢視"
                        title="列表"
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">每日行程與備案規劃</p>
                </div>
              </div>

              {itineraryViewMode === 'list' ? (
                <div className="overflow-hidden rounded-2xl border border-[#F0E5E1] bg-white dark:border-[#4A3F35] dark:bg-[#362F2B]">
                  {itineraryData.map(renderItineraryItem)}
                </div>
              ) : (
                <div className="space-y-4">
                  {itineraryData.map(renderItineraryItem)}
                </div>
              )}
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
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2 font-serif">
                  <UtensilsCrossed className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  美食指南
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">名古屋必吃美食與餐廳清單</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight font-serif">{item.name}</h3>
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
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2 font-serif">
                  <Map className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  景點總覽
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">各景點資訊與雨天/親子友善指標</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractionData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2 font-serif">{item.name}</h3>
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
                <h2 className="text-xl font-bold text-[#4A3F35] dark:text-[#FDF8F5] flex items-center gap-2 font-serif">
                  <CreditCard className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                  刷卡與支付攻略
                </h2>
                <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mt-1">海外消費高回饋信用卡與電子支付推薦</p>
              </div>

              <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-3 flex items-center gap-2 font-serif">
                <CreditCard className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                高回饋信用卡
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {creditCardData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2 font-serif">{item.name}</h3>
                      <span className="text-[10px] font-medium text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {item.reward}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0E5E1] dark:border-[#4A3F35] space-y-2">
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">加碼上限：{formatCardPageAmounts(item.bonusLimit)}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">活動條件：{formatCardPageAmounts(item.condition)}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">刷滿上限：{formatCardPageAmounts(item.spendCap)}</span>
                      </p>
                      <p className="text-xs text-[#8C7A6B] dark:text-[#A89F91] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#A89F91] dark:text-[#8C7A6B] shrink-0" />
                        <span className="leading-snug">備註：{formatCardPageAmounts(item.notes)}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#4A3F35] dark:text-[#FDF8F5] mb-2 flex items-center gap-2 font-serif">
                <Smartphone className="w-5 h-5 text-[#D9A0A5] dark:text-[#E2C07C]" />
                電子支付 (PayPay) 補充攻略
              </h3>
              <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91] mb-4">在一些小店、市集、路邊攤，只收 PayPay 而不收信用卡，建議備用：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ePayData.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#362F2B] p-4 rounded-2xl shadow-sm border border-[#F0E5E1] dark:border-[#4A3F35] hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold text-[#4A3F35] dark:text-[#FDF8F5] leading-tight pr-2 font-serif">{item.name}</h3>
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
              {/* JCB Promo Section */}
              <div className="mt-8 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-[#E2C07C]/10 dark:to-[#C5A059]/10 p-5 rounded-2xl border border-rose-100 dark:border-[#E2C07C]/20 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="text-lg font-bold text-rose-700 dark:text-[#E2C07C] font-serif">{promoData.title}</h3>
                </div>
                <p className="text-sm text-rose-600/80 dark:text-[#E2C07C]/80 font-medium mb-4">{promoData.subtitle}</p>

                <div className="space-y-3 text-sm text-[#4A3F35] dark:text-[#D1C4B5]">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">活動期間：</span>{formatCardPageAmounts(promoData.period)}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Banknote className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">條件：</span>{formatCardPageAmounts(promoData.condition)}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">回饋：</span>{formatCardPageAmounts(promoData.reward)}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-rose-600 dark:text-[#E2C07C]">必要步驟：</span>{formatCardPageAmounts(promoData.requirement)}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-rose-400 dark:text-[#D9A0A5] shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-[#4A3F35] dark:text-[#E8DCC4]">適用卡片：</span>{formatCardPageAmounts(promoData.applicable)}</p>
                  </div>
                </div>
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
              className="h-full flex flex-col bg-[#FAF5F0] dark:bg-[#2A2421]"
            >
              <div className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-end px-4 pt-16">
                  <div className="pointer-events-auto flex flex-col items-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMapSettingsOpen((current) => !current)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/90 text-[#6B5B4D] shadow-lg backdrop-blur-sm transition hover:border-[#D9A0A5] hover:text-[#D9A0A5] dark:border-[#5C4D42]/80 dark:bg-[#2A2421]/90 dark:text-[#D1C4B5] dark:hover:border-[#9EBA9E] dark:hover:text-[#9EBA9E]"
                      aria-label={isMapSettingsOpen ? 'Hide map settings' : 'Show map settings'}
                      aria-expanded={isMapSettingsOpen}
                    >
                      {isMapSettingsOpen ? <X className="h-5 w-5" /> : <Settings2 className="h-5 w-5" />}
                    </button>
                    {isMapSettingsOpen && (
                      <div className="w-[min(28rem,calc(100vw-2rem))] rounded-3xl border border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-[#5C4D42]/80 dark:bg-[#362F2B]/95">
                        <div className="flex flex-col gap-3">
                          <p className="text-sm text-[#8C7A6B] dark:text-[#A89F91]">
                            貼上 Google Maps embed iframe 的 `src` 網址，按確認後才會儲存並載入。
                          </p>
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                              type="url"
                              value={mapEmbedDraft}
                              onChange={(event) => setMapEmbedDraft(event.target.value)}
                              placeholder={GOOGLE_MAPS_EMBED_PLACEHOLDER}
                              spellCheck={false}
                              className="w-full rounded-2xl border border-[#E8DCC4] bg-[#FAF5F0] px-4 py-3 text-sm text-[#4A3F35] outline-none transition focus:border-[#D9A0A5] focus:ring-2 focus:ring-[#D9A0A5]/20 dark:border-[#5C4D42] dark:bg-[#2A2421] dark:text-[#FDF8F5] dark:placeholder:text-[#8C7A6B] dark:focus:border-[#9EBA9E] dark:focus:ring-[#9EBA9E]/20"
                              aria-label="Google Maps embed URL"
                            />
                            <button
                              type="button"
                              onClick={applyMapEmbedUrl}
                              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#D9A0A5] px-5 text-sm font-semibold text-white transition hover:bg-[#C88992] dark:bg-[#7A907A] dark:hover:bg-[#6A816A]"
                            >
                              確認
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {mapEmbedUrl.trim() ? (
                  <iframe
                    src={mapEmbedUrl.trim()}
                    title="Nagoya travel map"
                    loading="lazy"
                    className="h-full w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <div className="max-w-md rounded-3xl border border-dashed border-[#D8C8B8] bg-white/80 px-6 py-8 shadow-sm dark:border-[#5C4D42] dark:bg-[#362F2B]/80">
                      <p className="text-base font-semibold text-[#4A3F35] dark:text-[#FDF8F5]">尚未設定地圖網址</p>
                      <p className="mt-2 text-sm leading-6 text-[#8C7A6B] dark:text-[#A89F91]">
                        請貼上 Google Maps 自訂地圖 iframe 的 `src`，例如 `https://www.google.com/maps/d/embed?...`
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav ref={navRef} className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#362F2B] border-t border-[#E8DCC4] dark:border-[#4A3F35] pb-safe z-50 transition-colors duration-200">
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
              activeTab === 'map' ? 'text-[#D9A0A5] dark:text-[#E2C07C] bg-[#FDF8F5] dark:bg-[#E2C07C]/20' : 'text-[#A89F91] dark:text-[#8C7A6B] hover:text-[#6B5B4D] dark:hover:text-[#D1C4B5]'
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
