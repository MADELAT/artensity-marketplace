
import { useState } from "react";
import { 
  Users, ShoppingCart, Image, Wallet, TrendingUp, 
  CheckCircle, XCircle, Clock 
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";

const salesData = [
  { month: "Jan", amount: 12400 },
  { month: "Feb", amount: 18100 },
  { month: "Mar", amount: 15200 },
  { month: "Apr", amount: 21300 },
  { month: "May", amount: 18600 },
  { month: "Jun", amount: 24200 },
  { month: "Jul", amount: 21400 },
  { month: "Aug", amount: 28900 },
  { month: "Sep", amount: 23100 },
  { month: "Oct", amount: 29400 },
  { month: "Nov", amount: 32100 },
  { month: "Dec", amount: 39800 },
];

const categoryData = [
  { name: "Painting", value: 45 },
  { name: "Sculpture", value: 20 },
  { name: "Photography", value: 15 },
  { name: "Digital", value: 12 },
  { name: "Mixed Media", value: 8 },
];

const COLORS = ["#D4A373", "#E9C46A", "#2A9D8F", "#264653", "#606C38"];

const pendingArtworks = [
  {
    id: "artwork-1",
    title: "Urban Reflections",
    artist: "Sofia Garcia",
    artistId: "artist-1",
    date: "2023-11-20T14:30:00",
    imageUrl: "https://images.unsplash.com/photo-1579541471873-0772f7be11a8?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "artwork-2",
    title: "Ephemeral Moment",
    artist: "James Wilson",
    artistId: "artist-2",
    date: "2023-11-19T09:15:00",
    imageUrl: "https://images.unsplash.com/photo-1549289809-a7c6ac1ecabb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "artwork-3",
    title: "Chromatic Vision",
    artist: "Emma Roberts",
    artistId: "artist-3",
    date: "2023-11-18T16:45:00",
    imageUrl: "https://images.unsplash.com/photo-1518796745738-9aad3fd3e9a6?auto=format&fit=crop&w=300&q=80",
  },
];

const recentTransactions = [
  {
    id: "tx-1",
    artwork: "Harmony in Blue",
    artist: "Emma Roberts",
    buyer: "John Doe",
    amount: 4800,
    status: "completed",
    date: "2023-11-20T10:30:00",
  },
  {
    id: "tx-2",
    artwork: "Silent Echo",
    artist: "Michael Chen",
    buyer: "Sarah Johnson",
    amount: 3200,
    status: "pending",
    date: "2023-11-19T15:45:00",
  },
  {
    id: "tx-3",
    artwork: "Coastal Dreams",
    artist: "Sofia Garcia",
    buyer: "Robert Williams",
    amount: 5100,
    status: "completed",
    date: "2023-11-18T09:15:00",
  },
  {
    id: "tx-4",
    artwork: "Inner Landscape",
    artist: "James Wilson",
    buyer: "Emily Brown",
    amount: 2900,
    status: "completed",
    date: "2023-11-17T14:20:00",
  },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState("monthly");
  
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of platform performance and statistics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="2,843"
            icon={<Users />}
            trend={{ value: 12, positive: true }}
            description="vs. previous month"
          />
          <StatCard
            title="Total Artworks"
            value="4,721"
            icon={<Image />}
            trend={{ value: 8, positive: true }}
            description="vs. previous month"
          />
          <StatCard
            title="Total Sales"
            value="$284,531"
            icon={<ShoppingCart />}
            trend={{ value: 15, positive: true }}
            description="vs. previous month"
          />
          <StatCard
            title="Commission Revenue"
            value="$42,679"
            icon={<Wallet />}
            trend={{ value: 5, positive: true }}
            description="vs. previous month"
          />
        </div>
        
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>
                      Platform sales and commission revenue
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant={period === "weekly" ? "default" : "outline"} 
                      onClick={() => setPeriod("weekly")}
                    >
                      Weekly
                    </Button>
                    <Button 
                      size="sm" 
                      variant={period === "monthly" ? "default" : "outline"} 
                      onClick={() => setPeriod("monthly")}
                    >
                      Monthly
                    </Button>
                    <Button 
                      size="sm" 
                      variant={period === "yearly" ? "default" : "outline"} 
                      onClick={() => setPeriod("yearly")}
                    >
                      Yearly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-1">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${value.toLocaleString()}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Latest sales on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center space-x-4">
                        <div className={`rounded-full p-1 ${
                          transaction.status === "completed" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-amber-100 text-amber-600"
                        }`}>
                          {transaction.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{transaction.artwork}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>
                              {transaction.artist} → {transaction.buyer}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          transaction.status === "completed" ? "text-green-600" : "text-amber-600"
                        }`}>
                          ${transaction.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">View All Transactions</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>
                    Distribution across art categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Available Artworks"
                value="3,845"
                icon={<Image />}
              />
              <StatCard
                title="Pending Approval"
                value="76"
                icon={<Clock />}
              />
              <StatCard
                title="Sold Artworks"
                value="876"
                icon={<CheckCircle />}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>
                  Artworks awaiting admin review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingArtworks.map((artwork) => (
                    <div key={artwork.id} className="flex items-center space-x-4">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{artwork.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {artwork.artist} • {new Date(artwork.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">View All Pending Artworks</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Artworks by Category</CardTitle>
                <CardDescription>
                  Distribution across different categories
                </CardDescription>
              </CardHeader>
              <CardContent className="p-1">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: "Painting", count: 1845 },
                        { category: "Sculpture", count: 743 },
                        { category: "Photography", count: 912 },
                        { category: "Digital", count: 654 },
                        { category: "Mixed Media", count: 423 },
                        { category: "Installation", count: 144 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Users"
                value="2,843"
                icon={<Users />}
              />
              <StatCard
                title="Artists"
                value="973"
                icon={<Users />}
              />
              <StatCard
                title="Galleries"
                value="154"
                icon={<Building />}
              />
              <StatCard
                title="Buyers"
                value="1,716"
                icon={<Users />}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  New users joining the platform over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-1">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", artists: 45, galleries: 12, buyers: 120 },
                        { month: "Feb", artists: 52, galleries: 15, buyers: 143 },
                        { month: "Mar", artists: 61, galleries: 18, buyers: 189 },
                        { month: "Apr", artists: 78, galleries: 22, buyers: 217 },
                        { month: "May", artists: 89, galleries: 25, buyers: 253 },
                        { month: "Jun", artists: 102, galleries: 28, buyers: 290 },
                        { month: "Jul", artists: 115, galleries: 32, buyers: 321 },
                        { month: "Aug", artists: 131, galleries: 36, buyers: 354 },
                        { month: "Sep", artists: 142, galleries: 39, buyers: 389 },
                        { month: "Oct", artists: 156, galleries: 43, buyers: 423 },
                        { month: "Nov", artists: 167, galleries: 46, buyers: 456 },
                        { month: "Dec", artists: 183, galleries: 50, buyers: 485 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="artists" 
                        name="Artists"
                        stroke="#D4A373" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="galleries" 
                        name="Galleries"
                        stroke="#264653" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="buyers" 
                        name="Buyers"
                        stroke="#2A9D8F" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>
                  Latest users who joined the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "user-1", name: "David Johnson", role: "buyer", email: "david@example.com", date: "2023-11-20T10:30:00" },
                    { id: "user-2", name: "Maria Rodriguez", role: "artist", email: "maria@example.com", date: "2023-11-19T15:45:00" },
                    { id: "user-3", name: "Modern Art Gallery", role: "gallery", email: "info@modernart.com", date: "2023-11-18T09:15:00" },
                    { id: "user-4", name: "Thomas Williams", role: "buyer", email: "thomas@example.com", date: "2023-11-17T14:20:00" },
                  ].map((user) => (
                    <div key={user.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{user.email}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(user.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
