import { ArtistSidebar } from './ArtistSidebar';
import { ArtistHeader } from './ArtistHeader';

interface ArtistLayoutProps {
  children: React.ReactNode;
  artistName: string;
  artistAvatar?: string;
  onSearch?: (query: string) => void;
}

export function ArtistLayout({
  children,
  artistName,
  artistAvatar,
  onSearch,
}: ArtistLayoutProps) {
  return (
    <div className="flex h-screen">
      <ArtistSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ArtistHeader
          artistName={artistName}
          artistAvatar={artistAvatar}
          onSearch={onSearch}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
} 