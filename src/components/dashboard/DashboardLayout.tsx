import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
