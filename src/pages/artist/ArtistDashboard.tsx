
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Palette, Clock, ShoppingCart, BarChart } from 'lucide-react';

export default function ArtistDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <DashboardLayout userType="artist">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Artist Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Artist'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Active Artworks" 
                value="12"
                description="Listed in gallery"
                icon={<Palette className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Pending Approval" 
                value="3" 
                description="Under review"
                icon={<Clock className="h-4 w-4 text-amber-500" />} 
              />
              <StatCard 
                title="Sold Artworks" 
                value="8" 
                description="Total sales"
                icon={<ShoppingCart className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Revenue" 
                value="$4,320" 
                description="Total earnings"
                icon={<BarChart className="h-4 w-4 text-purple-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Popular Artworks</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center py-8">
                    Your most viewed artworks will appear here
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center py-8">
                    Your recent sales will appear here
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">My Artworks</h3>
              <p className="text-muted-foreground text-center py-8">
                You haven't uploaded any artworks yet. Start by adding your first artwork.
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Pending Approval</h3>
              <p className="text-muted-foreground text-center py-8">
                You have no artwork pending approval
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Sales History</h3>
              <p className="text-muted-foreground text-center py-8">
                Your sales history will appear here
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Artist Profile Settings</h3>
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
