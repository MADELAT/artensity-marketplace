import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardHeader() {
  const { profile } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-serif text-[#C4A484] hover:text-[#B39476]"
          >
            Artendency
          </Link>
          <div className="flex items-center space-x-4">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
