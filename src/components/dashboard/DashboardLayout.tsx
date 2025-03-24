
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, Home, PieChart, Image, Users, ShoppingBag, Bell, 
  MessageSquare, Settings, LogOut, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: "admin" | "artist" | "gallery" | "buyer";
}

interface NavItem {
  label: string;
  icon: any;
  href: string;
  notification?: number;
}

export function DashboardLayout({ children, userType = "admin" }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Define navigation items based on user type
  const navItems: Record<string, NavItem[]> = {
    admin: [
      { label: "Dashboard", icon: Home, href: "/admin" },
      { label: "Statistics", icon: PieChart, href: "/admin/statistics" },
      { label: "Artworks", icon: Image, href: "/admin/artworks", notification: 5 },
      { label: "Users", icon: Users, href: "/admin/users" },
      { label: "Transactions", icon: ShoppingBag, href: "/admin/transactions" },
      { label: "Notifications", icon: Bell, href: "/admin/notifications", notification: 3 },
      { label: "Messages", icon: MessageSquare, href: "/admin/messages", notification: 2 },
      { label: "Settings", icon: Settings, href: "/admin/settings" },
    ],
    artist: [
      { label: "Dashboard", icon: Home, href: "/artist-dashboard" },
      { label: "My Artworks", icon: Image, href: "/artist-dashboard/artworks" },
      { label: "Sales", icon: ShoppingBag, href: "/artist-dashboard/sales" },
      { label: "Statistics", icon: PieChart, href: "/artist-dashboard/statistics" },
      { label: "Notifications", icon: Bell, href: "/artist-dashboard/notifications", notification: 3 },
      { label: "Messages", icon: MessageSquare, href: "/artist-dashboard/messages", notification: 1 },
      { label: "Settings", icon: Settings, href: "/artist-dashboard/settings" },
    ],
    gallery: [
      { label: "Dashboard", icon: Home, href: "/gallery-dashboard" },
      { label: "Artworks", icon: Image, href: "/gallery-dashboard/artworks" },
      { label: "Artists", icon: Users, href: "/gallery-dashboard/artists" },
      { label: "Sales", icon: ShoppingBag, href: "/gallery-dashboard/sales" },
      { label: "Statistics", icon: PieChart, href: "/gallery-dashboard/statistics" },
      { label: "Notifications", icon: Bell, href: "/gallery-dashboard/notifications", notification: 2 },
      { label: "Messages", icon: MessageSquare, href: "/gallery-dashboard/messages", notification: 3 },
      { label: "Settings", icon: Settings, href: "/gallery-dashboard/settings" },
    ],
    buyer: [
      { label: "Dashboard", icon: Home, href: "/buyer-dashboard" },
      { label: "Favorites", icon: Image, href: "/buyer-dashboard/favorites" },
      { label: "Orders", icon: ShoppingBag, href: "/buyer-dashboard/orders" },
      { label: "Notifications", icon: Bell, href: "/buyer-dashboard/notifications" },
      { label: "Messages", icon: MessageSquare, href: "/buyer-dashboard/messages", notification: 1 },
      { label: "Settings", icon: Settings, href: "/buyer-dashboard/settings" },
    ],
  };

  const currentNavItems = navItems[userType] || [];
  
  const Sidebar = () => (
    <div className={`h-full flex flex-col bg-white border-r ${isCollapsed ? "w-[70px]" : "w-[250px]"}`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/" className="text-xl font-serif font-bold">
            Artendency
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          <ChevronLeft className={`h-5 w-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>
      
      <div className={`px-3 py-2 ${!isCollapsed && "mb-2"}`}>
        <div className="rounded-lg bg-secondary p-2 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {userType.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="ml-2">
              <div className="text-sm font-medium">
                {userType === "admin" ? "Admin User" : 
                 userType === "artist" ? "Artist User" :
                 userType === "gallery" ? "Gallery User" : "Buyer User"}
              </div>
              <div className="text-xs text-muted-foreground">
                Rol actual: {userType}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Separator />
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {currentNavItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm ${
                  location.pathname === item.href
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && item.notification && (
                  <Badge className="ml-auto" variant="secondary">
                    {item.notification}
                  </Badge>
                )}
                {isCollapsed && item.notification && (
                  <Badge className="absolute right-1 top-1" variant="secondary">
                    {item.notification}
                  </Badge>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <Separator />
      
      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
          <Link to="/login">
            <LogOut className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </Button>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b p-4 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          
          <div className="ml-4 font-serif font-bold">
            Artendency
          </div>
          
          <div className="ml-auto flex items-center space-x-2">
            <Badge variant="outline">
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </Badge>
          </div>
        </header>
        
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className={`flex-1 p-8 ${isMobile ? "w-full" : ""}`}>
        {children}
      </main>
    </div>
  );
}
