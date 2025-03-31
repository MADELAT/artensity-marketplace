
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, ShoppingBag, Clock, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BuyerDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <DashboardLayout userType="buyer">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Collector Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Collector'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Favorite Artworks" 
                value="14"
                description="Across all genres"
                icon={<Heart className="h-4 w-4 text-red-500" />}
              />
              <StatCard 
                title="Purchases" 
                value="3" 
                description="Total artworks"
                icon={<ShoppingBag className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Pending Orders" 
                value="1" 
                description="Being processed"
                icon={<Clock className="h-4 w-4 text-amber-500" />} 
              />
              <StatCard 
                title="Settings" 
                value="4" 
                description="Preferences"
                icon={<Settings className="h-4 w-4 text-blue-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Purchases</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center py-8">
                    Your recent purchases will appear here
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recommended For You</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center py-8">
                    Artwork recommendations will appear here
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Favorite Artworks</h3>
              <p className="text-muted-foreground text-center py-8">
                Your favorite artworks will appear here
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Orders</h3>
              <p className="text-muted-foreground text-center py-8">
                Your current orders will appear here
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Purchase History</h3>
              <p className="text-muted-foreground text-center py-8">
                Your purchase history will appear here
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              <p className="text-muted-foreground text-center py-8">
                Account settings will be implemented soon
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
