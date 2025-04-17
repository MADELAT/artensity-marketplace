import ArtistsPanel from "./components/ArtistsPanel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import UserManagement from "./components/UserManagement";
import ArtworkApproval from "./components/ArtworkApproval";
import Artists2bApproved from "./components/Artists2bApproved";
import CommissionManagement from "./components/CommissionManagement";
import TransactionsManagement from "./components/TransactionsManagement";
import FairsManagement from "./components/FairsManagement";
import NotificationsCenter from "./components/NotificationsCenter";
import PopularTagsCard from "./components/PopularTagsCard";
import {
  PieChart,
  LineChart,
  BarChart,
  Users,
  Image,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const { profile } = useAuth();
  if (!profile) return null;
  const [activeTab, setActiveTab] = useState("dashboard");

  console.log("🧠 Perfil cargado:", profile);

  return (
    <div className="min-h-screen bg-gray-50">
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
              <img
                src={profile?.avatar_url}
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <DashboardLayout>
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.first_name || "Admin"}
            </p>
          </div>

          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-9 w-full gap-2 px-2 md:px-4">
              {[
                ["dashboard", "Overview"],
                ["artists", "Artists"],
                ["pending_artworks", "Pending Artworks"],
                ["users", "Users"],
                ["artists_approval", "Artists 2b approved"],
                ["commissions", "Commissions"],
                ["transactions", "Transactions"],
                ["fairs", "Fairs"],
                ["notifications", "Notifications"],
              ].map(([value, label]) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-md px-4 py-2 min-w-[12ch] text-center whitespace-nowrap transition-colors duration-200 hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {label}
                </TabsTrigger>
              ))}
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
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Galleries</span>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm">Buyers</span>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
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
                            {
                              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                                index
                              ]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <PopularTagsCard />
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6 mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="pending_artworks" className="space-y-6 mt-6">
              <ArtworkApproval />
            </TabsContent>

            <TabsContent value="artists_approval" className="space-y-6 mt-6">
              <Artists2bApproved />
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

            <TabsContent value="artists" className="space-y-6 mt-6">
              <ArtistsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </div>
  );
}
