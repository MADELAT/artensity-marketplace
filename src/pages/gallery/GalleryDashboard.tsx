
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/hooks/useAuth';
import { PieChart, LineChart, Users, Image, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function GalleryDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <DashboardLayout userType="gallery">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gallery Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Gallery Owner'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Artists Represented" 
                value="12"
                description="Across all genres"
                icon={<Users className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Artworks" 
                value="248" 
                description="86 active listings"
                icon={<Image className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Monthly Sales" 
                value="$24,580" 
                description="This month"
                icon={<LineChart className="h-4 w-4 text-purple-500" />} 
              />
              <StatCard 
                title="Commissions" 
                value="$3,840" 
                description="This month"
                icon={<ShoppingBag className="h-4 w-4 text-amber-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Top Performing Artists</h3>
                <div className="h-[250px] flex items-center justify-center">
                  <div className="text-muted-foreground">Chart will be implemented soon</div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
                <div className="h-[250px] flex items-center justify-center">
                  <div className="text-muted-foreground">Chart will be implemented soon</div>
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground text-center py-8">
                  Activity feed will be implemented soon
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="artists" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Artists</h3>
              <p className="text-muted-foreground text-center py-8">
                Artist management will be implemented soon
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Gallery Artworks</h3>
              <p className="text-muted-foreground text-center py-8">
                Artwork management will be implemented soon
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Sales History</h3>
              <p className="text-muted-foreground text-center py-8">
                Sales history will be implemented soon
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="commissions" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Commission Management</h3>
              <p className="text-muted-foreground text-center py-8">
                Commission management will be implemented soon
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Gallery Settings</h3>
              <p className="text-muted-foreground text-center py-8">
                Gallery settings will be implemented soon
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
