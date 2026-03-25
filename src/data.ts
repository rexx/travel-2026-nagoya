import { AttractionItem, FoodItem, ItineraryItem, CreditCardItem, PromoItem, EPayItem } from './types';

const NAGOYA_STATION_MAP_CENTER = '35.170915,136.881537';

export const itineraryData: ItineraryItem[] = [
  { day: 'Day 1', date: '4/15', weekday: '三', hotel: '機場飯店', theme: '✈️ 抵達', schedule: '晚抵中部國際機場 → 機場飯店check-in → 超商或機場簡單晚餐', rainBackup: '—', status: '✅ 已訂' },
  { day: 'Day 2', date: '4/16', weekday: '四', hotel: '名古屋站', theme: '⛩️ 入城＋商店街', schedule: '熱田神宮 → 大須商店街 → 視體力決定是否上Sky Promenade夜景', rainBackup: '大須商店街有頂蓋可照逛；大雨時熱田改名古屋市科學館', status: '🏨 名古屋站飯店待訂' },
  { day: 'Day 3', date: '4/17', weekday: '五', hotel: '名古屋站', theme: '🌳 親子戶外', schedule: '戶田川綠地公園全天，優先玩空中腳踏車與大型木製遊具', rainBackup: '雨天改名古屋港水族館＋磁浮鐵道館（全室內）', status: '🏨 名古屋站飯店待訂' },
  { day: 'Day 4', date: '4/18', weekday: '六', hotel: '名古屋站', theme: '🏯 名城文化日', schedule: '名古屋城 → 金鯱橫丁午餐 → 德川園（若時間或體力不足可跳過）', rainBackup: '名古屋城僅逛本丸御殿＋改排名古屋市科學館或豐田產技紀念館', status: '🏨 名古屋站飯店待訂' },
  { day: 'Day 5', date: '4/19', weekday: '日', hotel: '名古屋站', theme: '🍞 麵包超人＋Outlet', schedule: '長島度假村：麵包超人兒童博物館 → 三井Outlet逛街', rainBackup: '雨天則整天改為名古屋港水族館＋磁浮鐵道館', status: '🏨 名古屋站飯店待訂' },
  { day: 'Day 6', date: '4/20', weekday: '一', hotel: '榮', theme: '🦁 東山動植物園＋換房', schedule: '東山動植物園玩到下午 → 回名古屋站取行李 → 搬到榮飯店check-in', rainBackup: '東山遇雨改名古屋市科學館＋下午提前換房後逛榮百貨', status: '🏨 榮飯店待訂' },
  { day: 'Day 7', date: '4/21', weekday: '二', hotel: '榮', theme: '🧱 樂高樂園', schedule: 'LEGOLAND Japan全天，視體力加逛對面SEA LIFE水族館', rainBackup: '小雨照常，若大雨可縮短室外設施時間改多待室內區域', status: '✅ 樂高門票已訂' },
  { day: 'Day 8', date: '4/22', weekday: '三', hotel: '榮', theme: '🛍️ 榮商圈購物', schedule: '榮地下街、PARCO、Lachic等百貨慢逛，彈性安排', rainBackup: '完全室內購物日，不受天氣影響', status: '🏨 榮飯店待訂' },
  { day: 'Day 9', date: '4/23', weekday: '四', hotel: '榮', theme: '🌳 吉卜力公園', schedule: '吉卜力公園全天，依票券入場時段調整動線', rainBackup: '以吉卜力大倉庫等室內區為主，雨天照常', status: '✅ 吉卜力門票已訂' },
  { day: 'Day 10', date: '4/24', weekday: '五', hotel: '榮', theme: '🍜 大須＋名古屋美食', schedule: '再訪大須商店街 → 味噌豬排、手羽先、台灣拉麵等名古屋飯收尾', rainBackup: '大須有騎樓與頂蓋，雨天照逛；如需完全室內可改百貨美食街', status: '🏨 榮飯店待訂' },
  { day: 'Day 11', date: '4/25', weekday: '六', hotel: '機場飯店', theme: '🛒 採購＋移動', schedule: '榮或名古屋站周邊藥妝、電器店最後採買 → 傍晚前往機場飯店check-in', rainBackup: '—', status: '✅ 機場飯店已訂' },
  { day: 'Day 12', date: '4/26', weekday: '日', hotel: '—', theme: '✈️ 返台', schedule: '早起前往機場辦理登機 → 返台', rainBackup: '—', status: '✅ 機票已訂' },
];

export const foodData: FoodItem[] = [
  { name: '艾許奶油泡芙（ÉCLAIR / エシレ）', type: '甜點・早餐', location: '名古屋站', mapQuery: 'エシレ', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day2–Day6 任一早晨出發前', hours: '約09:00開賣', reservation: '❌ 現場排隊', price: '¥400–600/個', notes: '必買！開賣就要去排，假日排隊更長' },
  { name: 'KONPARU 炸蝦三明治', type: '早餐', location: '名古屋站', mapQuery: 'KONPARU', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day2–Day6 任一早晨', hours: '07:00起', reservation: '❌', price: '¥500左右', notes: '名古屋站老牌早餐名店' },
  { name: '天むす緋毬（天婦羅飯糰）', type: '早餐・輕食', location: '名古屋站附近', mapQuery: '天むす緋毬', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day2–Day6 任一早晨', hours: '09:00起', reservation: '❌', price: '¥800左右', notes: '名古屋名物天婦羅飯糰' },
  { name: '名古 onimaru 飯糰', type: '早餐', location: '名古屋站', mapQuery: 'onimaru', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day2–Day6 任一早晨', hours: '07:00起', reservation: '❌', price: '¥200–400/個', notes: '在地人氣早餐飯糰' },
  { name: '名古屋港水族館周邊餐廳', type: '午餐', location: '名古屋港附近', mapQuery: '名古屋港水族館 餐廳', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: '視行程安排（若有排水族館）', hours: '11:00–14:00', reservation: '建議平日不用', price: '¥1000–1500', notes: '港區有多家家庭餐廳可選' },
  { name: '吉卜力公園園區內餐廳', type: '午餐', location: '愛知縣長久手市（吉卜力公園內）', mapQuery: '吉卜力公園 餐廳', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day 9（4/23）', hours: '10:00–17:00（視各店）', reservation: '⚠️ 建議提前看官網', price: '¥1200–2000', notes: '園區內選擇有限，建議早點用餐避開人潮' },
  { name: '矢場とん（矢場豬排）', type: '晚餐・名古屋名物', location: '榮／矢場町', mapQuery: '矢場とん', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day8（4/22）或Day10（4/24）', hours: '11:00–21:00', reservation: '⚠️ 假日排隊，建議平日或提早', price: '¥1500–2500', notes: '名古屋味噌豬排最代表性老店，必吃' },
  { name: '風來坊（手羽先）', type: '晚餐・宵夜', location: '名古屋市各處', mapQuery: '風来坊', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day10（4/24）大須美食日', hours: '17:00–23:00左右', reservation: '❌ 不需要', price: '¥1500–2000', notes: '名古屋手羽先兩大名店之一' },
  { name: '世界山將（手羽先）', type: '晚餐・宵夜', location: '榮附近', mapQuery: '世界の山ちゃん', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day8（4/22）或Day10（4/24）', hours: '17:00–23:00', reservation: '❌ 不需要', price: '¥1500–2000', notes: '名古屋手羽先兩大名店之一，和風來坊各有擁護者' },
  { name: '飛驒牛一頭家 馬喰一代', type: '晚餐・燒肉', location: '名古屋站附近', mapQuery: '馬喰一代', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day9（4/23）吉卜力回來後', hours: '17:00–22:00', reservation: '✅ 強烈建議提前訂位', price: '¥5000–8000/人', notes: '飛驒牛一頭買入直接提供，品質極高，非常熱門' },
  { name: '札幌螃蟹本家', type: '晚餐', location: '榮商圈', mapQuery: '札幌かに本家', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day8（4/22）或Day10（4/24）', hours: '11:00–22:00', reservation: '⚠️ 建議預約', price: '¥5000–10000/人', notes: '螃蟹料理名店，榮住宿期間很方便' },
  { name: '麵家獅子丸', type: '晚餐・拉麵', location: '名古屋站附近', mapQuery: '麺家獅子丸', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day7（4/21）樂高結束後', hours: '11:00–22:00', reservation: '❌', price: '¥900–1200', notes: '名古屋台灣拉麵系統，辣味特色' },
  { name: 'HARBS', type: '甜點・下午茶', location: '榮商圈', mapQuery: 'HARBS', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day8（4/22）榮購物日', hours: '11:00–20:00', reservation: '⚠️ 假日排隊長', price: '¥1000–1500', notes: '水果千層蛋糕名店，榮店位置很方便' },
  { name: 'Piyorin 小雞蛋糕', type: '甜點・伴手禮', location: '名古屋站（JR名古屋高島屋B1）', mapQuery: 'ぴよりん', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day11（4/25）出發機場前', hours: '依百貨時間', reservation: '❌ 現場購買', price: '¥500–700/個', notes: '名古屋站限定必買！黃色小雞造型超可愛，賣完就沒了要早去' },
  { name: 'えびせんべいの里（蝦餅）', type: '伴手禮', location: '名古屋站或機場', mapQuery: 'えびせんべいの里', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day11（4/25）採買日', hours: '依店面', reservation: '❌', price: '¥1000–2000/盒', notes: '名古屋知名伴手禮，蝦餅系列多種口味' },
  { name: '機場鰻魚飯', type: '午餐・機場美食', location: '中部國際機場（Centrair）', mapQuery: '中部国際空港 うなぎ', mapCenter: NAGOYA_STATION_MAP_CENTER, suggestedDay: 'Day12（4/26）返台當天', hours: '機場營業時間', reservation: '❌', price: '¥2000–3500', notes: '離開前最後一餐，機場內有多家鰻魚飯店' }
];

export const attractionData: AttractionItem[] = [
  { name: '吉卜力公園', type: '主題公園', location: '愛知縣長久手市', mapQuery: '35.1750449,137.0887689', transport: '地鐵東山線→リニモ', hours: '10:00–18:00（週二休）', cost: '¥2000–5000（依票種）', reservation: '✅ 強烈建議現在就買', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 大倉庫室內OK，戶外園區遇雨體驗下降', weekendFriendly: '✅ 假日OK（需對應票種）', notes: '大倉庫雨天首選，Dondoko之森晴天更適合' },
  { name: '日本樂高樂園', type: '主題樂園', location: '名古屋市港區金城埠頭', mapQuery: '35.0506065,136.8438293', transport: '青波線 金城埠頭站 步行5分', hours: '09:30–17:00（依季節）', cost: '大人¥5200、小孩¥3800起', reservation: '✅ 提前購票較便宜', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 戶外設施多，部分雨天暫停', weekendFriendly: '⚠️ 假日擁擠，建議平日', notes: 'Bricktopia、Miniland、Dino Valley' },
  { name: 'Sky Promenade', type: '觀景台・夜景', location: '名古屋站直結（JR Gate Tower頂樓）', mapQuery: '35.1704593,136.8851422', transport: '名古屋站步行0分', hours: '11:00–23:00（最終入場22:30）', cost: '大人¥700、小孩¥400', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '✅ 室內觀景台（附戶外露台）', weekendFriendly: '⚠️ 假日夜晚人多但不擁擠', notes: '名古屋高樓夜景代表，可遠眺市景' },
  { name: '名古屋城', type: '城堡・歷史', location: '名古屋市中區', mapQuery: '35.1847501,136.8996883', transport: '地鐵名城線 市役所站 步行5分', hours: '09:00–16:30（週一休）', cost: '大人¥500', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '⚠️ 部分露天，本丸御殿室內OK', weekendFriendly: '⚠️ 假日人多但OK', notes: '本丸御殿室內雨天可參觀' },
  { name: '德川園', type: '日本庭園', location: '名古屋市東區', mapQuery: '35.1842918,136.9321824', transport: 'JR／地鐵大曾根站 步行10分', hours: '09:30–17:30（週一休）', cost: '大人¥300、小孩免費', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '❌ 露天庭園，雨天不適合', weekendFriendly: '✅ 假日人不多，悠閒', notes: '春天賞花很美，適合搭配名古屋城或德川美術館' },
  { name: '戶田川綠地公園', type: '公園・戶外・親子', location: '名古屋市港區', mapQuery: '35.117596,136.8113142', transport: '近鐵 戶田站 步行10分', hours: '09:00–17:00（週一休）', cost: '免費（部分設施¥100–200）', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '❌ 戶外公園，雨天不適合', weekendFriendly: '✅ 假日OK，人少悠閒', notes: '大型遊具與草地空間很適合親子放電' },
  { name: '東山動植物園', type: '動物園・植物園', location: '名古屋市千種區', mapQuery: '35.1565379,136.9818099', transport: '地鐵東山線 東山公園站 步行3分', hours: '09:00–16:50（週一休）', cost: '大人¥500、小孩免費', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 戶外為主，下雨體驗差', weekendFriendly: '⚠️ 假日很擁擠，建議平日', notes: '無尾熊展區人氣很高，腹地也大' },
  { name: '綠洲21', type: '地標・夜景', location: '榮站旁', mapQuery: '35.1711148,136.9094757', transport: '地鐵榮站步行1分', hours: '10:00–22:00', cost: '免費', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 玻璃屋頂下雨另有風味但濕滑', weekendFriendly: '✅ 假日OK，夜晚人較少', notes: '可搭配榮商圈與電視塔周邊一起逛' },
  { name: '熱田神宮', type: '神社・文化', location: '名古屋市熱田區', mapQuery: '35.1273579,136.9086948', transport: '地鐵名城線 熱田神宮伝馬町站 步行3分', hours: '境內終日開放', cost: '免費（寶物館¥500）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '⚠️ 境內露天，下雨體驗差', weekendFriendly: '⚠️ 假日人多，氣氛還是好', notes: '日本三大神宮之一，參道很有氛圍' },
  { name: '大須商店街／大須觀音通', type: '商店街・購物・美食', location: '名古屋市中區大須', mapQuery: '35.1593823,136.901052', transport: '地鐵鶴舞線 大須觀音站 步行3分', hours: '依各店面', cost: '免費（消費另計）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '⚠️ 有頂蓋路段但非全室內', weekendFriendly: '⚠️ 假日人潮多但很熱鬧', notes: '適合安排小吃、藥妝、二手店與伴手禮採買' },
  { name: '榮商圈／榮地下街', type: '購物・地下街', location: '名古屋市中區榮', mapQuery: '35.168909,136.906537', transport: '地鐵榮站直結', hours: '依各店面', cost: '免費（消費另計）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '⚠️ 假日非常擁擠', notes: '可串連百貨、扭蛋店與餐廳，雨天也方便' },
  { name: '名古屋麵包超人兒童博物館＆公園', type: '兒童博物館・親子', location: '三重縣桑名市長島', mapQuery: '35.0307716,136.7307271', transport: '名古屋站搭巴士約50分', hours: '10:00–17:00', cost: '大人¥2200、小孩¥2200', reservation: '✅ 建議網路預約', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 室內外混合，雨天仍可玩但體驗打折', weekendFriendly: '⚠️ 假日非常擁擠，幼童難受', notes: '低幼親子熱門景點，可與長島 outlet 同天安排' },
  { name: '三井OUTLET PARK 爵士之夢長島', type: 'Outlet・購物', location: '三重縣桑名市長島', mapQuery: '35.030174,136.7254449', transport: '名古屋站搭巴士約50分', hours: '10:00–20:00', cost: '免費入場（消費另計）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '⚠️ 半戶外型 outlet，遇雨需撐傘', weekendFriendly: '⚠️ 假日人潮很多', notes: '品牌數量多，可與麵包超人館或長島渡假村同天' },
  { name: '犬山城', type: '城堡・歷史', location: '愛知縣犬山市', mapQuery: '35.3883604,136.9391766', transport: '名鐵犬山線 犬山遊園站 步行15分', hours: '09:00–17:00', cost: '大人¥550、小孩¥110', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '⚠️ 天守閣室內OK，周邊露天', weekendFriendly: '⚠️ 假日人多，城下町擁擠', notes: '日本現存最古老天守閣之一' },
  { name: '博物館 明治村', type: '戶外博物館', location: '愛知縣犬山市', mapQuery: '35.3404417,136.9885261', transport: '犬山站搭巴士約20分', hours: '09:30–17:00（依季節）', cost: '大人¥2000、小孩¥700', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '❌ 戶外露天，下雨體驗很差', weekendFriendly: '✅ 假日OK，佔地廣不擁擠', notes: '明治建築移建保存，可與犬山城同天' },
  { name: '名古屋港水族館', type: '水族館', location: '名古屋市港區', mapQuery: '35.09050879999999,136.8784377', transport: '地鐵名港線 名古屋港站 步行5分', hours: '09:30–17:30（週一休）', cost: '大人¥2030、小孩¥510', reservation: '⚠️ 假日早去', familyFriendly: '⭐⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '⚠️ 假日非常擁擠，早點入場', notes: '虎鯨與海豚秀是亮點，雨天備案很好用' },
  { name: '名古屋 SEA LIFE 水族館', type: '水族館', location: '名古屋市港區金城埠頭', mapQuery: '35.0503899,136.846351', transport: '青波線 金城埠頭站 步行5分', hours: '10:00–18:00', cost: '大人¥2200、小孩¥1100', reservation: '⚠️ 建議網路購票', familyFriendly: '⭐⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '✅ 假日OK，比名古屋港水族館人少', notes: '就在樂高樂園旁邊，同天最好安排' },
  { name: 'TOYOTA 產業技術紀念館', type: '博物館・工業', location: '名古屋市西區', mapQuery: '35.182564,136.8759846', transport: '名鐵榮生站 步行3分', hours: '09:30–17:00（週一休）', cost: '大人¥500、小孩¥200', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '✅ 假日OK', notes: '紡織機到汽車工業的發展史展示很完整' },
  { name: '磁浮鐵道館', type: '博物館・交通', location: '名古屋市港區金城埠頭', mapQuery: '35.0491384,136.8509152', transport: '青波線 金城埠頭站 步行2分', hours: '10:00–17:30（週二休）', cost: '大人¥1000、小孩¥500', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '✅ 假日OK', notes: '新幹線與磁浮列車實體展示，適合親子' },
  { name: '名古屋市科學館', type: '博物館・科學', location: '白川公園內', mapQuery: '35.1650768,136.8997026', transport: '地鐵伏見站 步行5分', hours: '09:30–17:00（週一休）', cost: '大人¥800、小孩¥500', reservation: '❌', familyFriendly: '⭐⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '⚠️ 假日天象儀需搶票，建議早去', notes: '世界級球形天象儀是招牌，雨天非常適合' },
  { name: '波音博物館 FLIGHT OF DREAMS', type: '博物館・展覽', location: '中部國際機場內', mapQuery: '34.855313,136.8170461', transport: '中部國際機場站步行約5分', hours: '10:00–17:00', cost: '免費（部分設施收費）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '✅ 假日OK', notes: 'Boeing 787 真機展示，適合抵達或離境日順遊' },
  { name: '長島渡假村', type: '遊樂園・溫泉', location: '三重縣桑名市長島', mapQuery: '35.0278358,136.7325592', transport: '名古屋站搭巴士約50分', hours: '10:00–17:00（依季節）', cost: '大人¥4800起、小孩¥3300起', reservation: '⚠️ 旺季建議網路購票', familyFriendly: '⭐⭐⭐', rainFriendly: '⚠️ 戶外設施多，小雨影響大', weekendFriendly: '⚠️ 假日非常擁擠，等待時間長', notes: '雲霄飛車、溫泉與購物設施一次滿足' },
  { name: 'JR名古屋高島屋 Gate Tower 購物中心', type: '購物・伴手禮', location: '名古屋站直結', mapQuery: '35.1722068,136.8826178', transport: '名古屋站步行0分', hours: '10:00–20:00', cost: '免費入場（消費另計）', reservation: '❌', familyFriendly: '⭐⭐', rainFriendly: '✅ 全室內', weekendFriendly: '⚠️ 假日人多但OK', notes: '買 Piyorin 與名古屋土產很方便' },
];

export const creditCardData: CreditCardItem[] = [
  { name: '永豐 JCB', reward: '18.36%', bonusLimit: '2% 無上限 / 5% 上限 1000 / 刷 20300', condition: 'JCB 活動 10% 須刷滿 10 萬日圓', spendCap: '¥100000', notes: '飯店到店付款 86,192' },
  { name: '富邦 JCB', reward: '16%', bonusLimit: '3% 無上限 / 3% 上限 1000 / 刷 20300', condition: 'JCB 活動 10% 須刷滿 10 萬日圓', spendCap: '¥100000', notes: '餐食、購物' },
  { name: '中信 uniopen*2', reward: '11.0%', bonusLimit: '3% 無上限 / 8% 上限 500 / 刷 6250', condition: '實體卡消費', spendCap: '¥30800', notes: '日本 7-ELEVEN 單筆滿 1,500 日圓（含稅）享 225 日圓現金回饋' },
  { name: '永豐幣倍', reward: '6.0%', bonusLimit: '2% 無上限 / 4% 上限 800 / 刷 20000', condition: '實體卡消費', spendCap: '¥99000', notes: '—' },
  { name: '星展 eco', reward: '5.0%', bonusLimit: '1% 無上限 / 4% 上限 600 / 刷 15000', condition: '實體卡消費', spendCap: '¥74000', notes: '—' },
  { name: '永豐大戶*2', reward: '4.5%', bonusLimit: '2% 無上限 / 2.5% 上限 400 / 刷 16000', condition: '線上 / 實體皆可', spendCap: '¥79000', notes: 'Booking 線上付款 10,580 / 69,881' },
  { name: '台新 Richart', reward: '3.3%', bonusLimit: '無上限', condition: '線上 / 實體皆可', spendCap: '—', notes: '—' }
];

export const promoData: PromoItem = {
  title: '四月專屬！JCB 卡10% 回饋活動',
  subtitle: '這是四月出遊最值得搭配的限時活動！',
  period: '2026/2/1～2026/4/30（剛好可以用到）',
  condition: '在日本實體店消費累計滿 10 萬日幣（約 2 萬台幣）',
  reward: '10% 現金回饋，每卡上限 1 萬日幣',
  requirement: '需事先登錄（限 20 萬名，額滿即關閉），登錄前消費不算！',
  applicable: '任何台灣 JCB 信用卡（渣打 JCB 卡除外）'
};

export const ePayData: EPayItem[] = [
  { name: '全盈Pay', reward: '5.5% / 最高 13.5%', validity: '~2026/4/30', notes: '人人都有 5.5% 回饋，搭配彰化銀行帳戶最高 +8%' },
  { name: '全支付', reward: '3.5% / 最高 8.5%', validity: '~2026/6/30', notes: '筆筆 3.5% 無門檻，搭配國泰帳戶週回饋 +5%' },
  { name: '玉山 Wallet + 熊本熊卡', reward: '最高 5%', validity: '~2026/6/30', notes: 'PayPay 通路最高 5%' }
];
