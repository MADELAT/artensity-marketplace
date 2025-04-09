import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/contexts/AuthContext';
import UserManagement from './components/UserManagement';
import ArtworkApproval from './components/ArtworkApproval';
import ApprovedArtworks from './components/ApprovedArtworks';
import CommissionManagement from './components/CommissionManagement';
import TransactionsManagement from './components/TransactionsManagement';
import FairsManagement from './components/FairsManagement';
import NotificationsCenter from './components/NotificationsCenter';
import { PieChart, LineChart, BarChart, Users, Image, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Admin'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-8 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="pending_artworks">Pending Artworks</TabsTrigger>
            <TabsTrigger value="approved_artworks">Approved Artworks</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="fairs">Fairs</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total Users" 
                value="158"
                description="+12% this month"
                icon={<Users className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Artworks" 
                value="643" 
                description="312 active listings"
                icon={<Image className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Revenue" 
                value="$12,580" 
                description="+28% vs last month"
                icon={<LineChart className="h-4 w-4 text-purple-500" />} 
              />
              <StatCard 
                title="Commissions" 
                value="$1,840" 
                description="18 active artists"
                icon={<BarChart className="h-4 w-4 text-amber-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">User Distribution</h3>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="h-[250px] flex items-center justify-center">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Artists</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Galleries</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm">Buyers</span>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Sales Trends</h3>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="h-[250px] flex items-center justify-center">
                  <div className="w-full h-full flex items-end justify-around pt-6">
                    {[35, 45, 30, 60, 75, 90, 85].map((height, index) => (
                      <div key={index} className="relative group">
                        <div 
                          className="w-6 bg-primary/80 rounded-t transition-all group-hover:bg-primary"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="pending_artworks" className="space-y-6 mt-6">
            <ArtworkApproval />
          </TabsContent>

          <TabsContent value="approved_artworks" className="space-y-6 mt-6">
            <ApprovedArtworks />
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6 mt-6">
            <CommissionManagement />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6 mt-6">
            <TransactionsManagement />
          </TabsContent>

          <TabsContent value="fairs" className="space-y-6 mt-6">
            <FairsManagement />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationsCenter />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}