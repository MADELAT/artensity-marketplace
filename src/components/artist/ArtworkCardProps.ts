
export interface ArtworkProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  views: number;
  likes: number;
  created_at: string;
}
