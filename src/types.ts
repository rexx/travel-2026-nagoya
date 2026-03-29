export interface ItineraryItem {
  day: string;
  slug: string;
  date: string;
  weekday: string;
  hotel: string;
  theme: string;
  schedule: string;
  rainBackup: string;
  status: string;
}

export interface ItineraryTimelineItem {
  time: string;
  activity: string;
  note?: string;
  details?: ItineraryTimelineItem[];
}

export interface ItineraryDetail {
  day: string;
  slug: string;
  title: string;
  date: string;
  weekday: string;
  theme: string;
  intro: string;
  hotel: string;
  breakfast: string;
  status?: string;
  timeline: ItineraryTimelineItem[];
  rainPlan?: string;
  transport?: string[];
  tips?: string[];
}

export interface FoodItem {
  name: string;
  type: string;
  location: string;
  mapQuery: string;
  mapCenter?: string;
  suggestedDay: string;
  hours: string;
  reservation: string;
  price: string;
  notes: string;
}

export interface AttractionItem {
  name: string;
  type: string;
  location: string;
  mapQuery: string;
  mapCenter?: string;
  transport: string;
  hours: string;
  cost: string;
  reservation: string;
  familyFriendly: string;
  rainFriendly: string;
  weekendFriendly: string;
  notes: string;
}

export interface CreditCardItem {
  name: string;
  reward: string;
  bonusLimit: string;
  condition: string;
  spendCap: string;
  notes: string;
}

export interface PromoItem {
  title: string;
  subtitle: string;
  period: string;
  condition: string;
  reward: string;
  requirement: string;
  applicable: string;
}

export interface EPayItem {
  name: string;
  reward: string;
  validity: string;
  notes: string;
}
