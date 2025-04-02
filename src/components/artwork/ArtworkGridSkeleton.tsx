
import React from "react";

export function ArtworkGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg aspect-[3/4]"></div>
          <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="mt-1 bg-gray-200 h-3 rounded w-1/2"></div>
          <div className="mt-2 bg-gray-200 h-4 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
