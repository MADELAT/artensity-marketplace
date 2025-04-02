
import React from "react";

export function ArtworkEmptyState() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium">No artworks found</h3>
      <p className="text-muted-foreground mt-2">Try changing your filters or check back later.</p>
    </div>
  );
}
