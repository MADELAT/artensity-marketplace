// Custom type definitions for our database tables
// These work alongside the auto-generated Supabase types

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  role: "admin" | "artist" | "gallery" | "buyer";
  telephone: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number;
  technique: string | null;
  dimensions: string | null;
  year: number | null;
  image_url: string | null;
  category: string | null;
  style: string | null;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
  artist_id: string;
}

export interface PendingArtwork {
  id: string;
  title: string;
  description: string | null;
  price: number;
  technique: string | null;
  dimensions: string | null;
  year: number | null;
  image_url: string | null;
  category: string | null;
  style: string | null;
  status: "pending" | "approved" | "rejected";
  admin_comment: string | null;
  created_at: string;
  updated_at: string;
  artist_id: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  artwork_id: string;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  artwork_id: string;
  status: "pending" | "escrow" | "delivered";
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export interface Commission {
  id: string;
  user_id: string;
  custom_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Fair {
  id: string;
  name: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FairArtwork {
  id: string;
  fair_id: string;
  artwork_id: string;
}
