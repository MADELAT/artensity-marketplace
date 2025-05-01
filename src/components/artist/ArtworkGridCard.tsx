
import { ArtworkProps } from './ArtworkCardProps';
import { ListViewArtworkCard } from './ListViewArtworkCard';
import { GridViewArtworkCard } from './GridViewArtworkCard';

type ViewMode = 'grid' | 'list';

interface ArtworkGridCardProps {
  artwork: ArtworkProps;
  viewMode: ViewMode;
  onEdit: () => void;
  onView: () => void;
  onViewStats: () => void;
  onDelete: () => void;
}

export function ArtworkGridCard({
  artwork,
  viewMode,
  onEdit,
  onView,
  onViewStats,
  onDelete
}: ArtworkGridCardProps) {
  // Use strict string comparison to fix type error
  if (viewMode === 'list') {
    return (
      <ListViewArtworkCard
        artwork={artwork}
        onEdit={onEdit}
        onView={onView}
        onViewStats={onViewStats}
        onDelete={onDelete}
      />
    );
  }

  // Default to grid view
  return (
    <GridViewArtworkCard
      artwork={artwork}
      onEdit={onEdit}
      onView={onView}
      onViewStats={onViewStats}
      onDelete={onDelete}
    />
  );
}
