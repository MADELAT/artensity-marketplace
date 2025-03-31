
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/contexts/AuthContext';
import UserManagement from './components/UserManagement';
import ArtworkApproval from './components/ArtworkApproval';
import CommissionManagement from './components/CommissionManagement';
import TransactionsManagement from './components/TransactionsManagement';
import FairsManagement from './components/FairsManagement';
import NotificationsCenter from './components/NotificationsCenter';
import { PieChart, LineChart, BarChart, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <DashboardLayout userType="admin">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Admin'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
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
                description="Across all roles"
                icon={<Users className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Artworks" 
                value="643" 
                description="312 active listings"
                icon={<PieChart className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Revenue" 
                value="$12,580" 
                description="This month"
                icon={<LineChart className="h-4 w-4 text-purple-500" />} 
              />
              <StatCard 
                title="Commissions" 
                value="$1,840" 
                description="This month"
                icon={<BarChart className="h-4 w-4 text-amber-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-medium mb-4">Users by Role</h3>
                <div className="h-[250px] flex items-center justify-center">
                  {/* Placeholder for pie chart */}
                  <div className="text-muted-foreground">Chart will be implemented soon</div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-medium mb-4">Monthly Sales</h3>
                <div className="h-[250px] flex items-center justify-center">
                  {/* Placeholder for line chart */}
                  <div className="text-muted-foreground">Chart will be implemented soon</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6 mt-6">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-6 mt-6">
            <ArtworkApproval />
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
