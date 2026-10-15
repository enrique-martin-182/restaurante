export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
}

export interface HoursRow {
  days: string;
  time: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  social: { instagram: string; facebook: string };
  hours: HoursRow[];
  hero: { imageUrl: string; imageAlt: string };
  gallery: GalleryItem[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  label: string;
}

export interface Menu {
  categories: Category[];
  dishes: Dish[];
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
