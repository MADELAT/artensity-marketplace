
import { 
  Image, ShoppingBag, Wallet, TrendingUp, BarChart3, 
  Eye, Heart, ArrowUpRight 
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

const salesData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1500 },
  { month: "Apr", amount: 800 },
  { month: "May", amount: 1700 },
  { month: "Jun", amount: 1300 },
  { month: "Jul", amount: 1800 },
  { month: "Aug", amount: 2100 },
  { month: "Sep", amount: 1600 },
  { month: "Oct", amount: 2400 },
  { month: "Nov", amount: 2200 },
  { month: "Dec", amount: 3100 },
];

const viewsData = [
  { month: "Jan", views: 120 },
  { month: "Feb", views: 145 },
  { month: "Mar", views: 160 },
  { month: "Apr", views: 190 },
  { month: "May", views: 220 },
  { month: "Jun", views: 280 },
  { month: "Jul", views: 340 },
  { month: "Aug", views: 380 },
  { month: "Sep", views: 420 },
  { month: "Oct", views: 490 },
  { month: "Nov", views: 550 },
  { month: "Dec", views: 650 },
];

const recentArtworks = [
  {
    id: "artwork-1",
    title: "Harmony in Blue",
    status: "approved",
    price: 4800,
    views: 243,
    favorites: 18,
    createdAt: "2023-11-10T14:30:00",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "artwork-2",
    title: "Urban Reflections",
    status: "pending",
    price: 3200,
    views: 0,
    favorites: 0,
    createdAt: "2023-11-15T09:15:00",
    imageUrl: "https://images.unsplash.com/photo-1579541471873-0772f7be11a8?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "artwork-3",
    title: "Silent Echo",
    status: "approved",
    price: 5100,
    views: 187,
    favorites: 12,
    createdAt: "2023-10-25T16:45:00",
    imageUrl: "https://images.unsplash.com/photo-1518796745738-9aad3fd3e9a6?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "artwork-4",
    title: "Fractured Reality",
    status: "sold",
    price: 2900,
    views: 421,
    favorites: 34,
    createdAt: "2023-09-18T10:20:00",
    imageUrl: "https://images.unsplash.com/photo-1549289809-a7c6ac1ecabb?auto=format&fit=crop&w=300&q=80",
  },
];

export default function ArtistDashboard() {
  return (
    <DashboardLayout userType="artist">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif">Artist Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your artworks and sales performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Artworks"
            value="24"
            icon={<Image />}
            description="4 pending approval"
          />
          <StatCard
            title="Total Sales"
            value="$14,200"
            icon={<ShoppingBag />}
            trend={{ value: 22, positive: true }}
            description="vs. previous month"
          />
          <StatCard
            title="Artwork Views"
            value="2,834"
            icon={<Eye />}
            trend={{ value: 18, positive: true }}
            description="vs. previous month"
          />
          <StatCard
            title="Saved by Collectors"
            value="183"
            icon={<Heart />}
            trend={{ value: 12, positive: true }}
            description="vs. previous month"
          />
        </div>
        
        <Tabs defaultValue="artworks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="artworks" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Artworks</CardTitle>
                  <CardDescription>
                    Your latest uploaded artworks and their status
                  </CardDescription>
                </div>
                <Button>Upload New Artwork</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentArtworks.map((artwork) => (
                    <div key={artwork.id} className="flex items-start space-x-4">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{artwork.title}</p>
                          <Badge
                            className={
                              artwork.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                              artwork.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                              "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }
                            variant="outline"
                          >
                            {artwork.status === "approved" ? "Approved" : 
                             artwork.status === "pending" ? "Pending" : "Sold"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${artwork.price.toLocaleString()} • Added on {new Date(artwork.createdAt).toLocaleDateString()}
                        </div>
                        {artwork.status !== "pending" && (
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {artwork.views} views
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {artwork.favorites} saves
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="text-center">
                  <Button variant="outline">View All Artworks</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Artwork Status</CardTitle>
                  <CardDescription>
                    Current status of your artworks
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { status: "Approved", count: 14 },
                          { status: "Pending", count: 4 },
                          { status: "Sold", count: 6 },
                        ]}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="status" type="category" />
                        <Tooltip />
                        <Bar 
                          dataKey="count" 
                          fill="hsl(var(--primary))" 
                          radius={[0, 4, 4, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Artwork Categories</CardTitle>
                  <CardDescription>
                    Distribution of your artwork by style
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { category: "Abstract", count: 8 },
                          { category: "Figurative", count: 5 },
                          { category: "Landscape", count: 4 },
                          { category: "Portrait", count: 3 },
                          { category: "Still Life", count: 4 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Your artwork sales over time
                </CardDescription>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    Your recently sold artworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { id: "sale-1", title: "Fractured Reality", buyer: "Robert Williams", amount: 2900, date: "2023-10-15" },
                      { id: "sale-2", title: "Morning Light", buyer: "Sarah Johnson", amount: 3400, date: "2023-09-22" },
                      { id: "sale-3", title: "Urban Dreams", buyer: "Michael Chen", amount: 2100, date: "2023-08-17" },
                    ].map((sale) => (
                      <div key={sale.id} className="flex items-center space-x-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{sale.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Purchased by {sale.buyer} on {sale.date}
                          </p>
                        </div>
                        <div className="font-medium">
                          ${sale.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Location</CardTitle>
                  <CardDescription>
                    Where your art is being collected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { location: "United States", percentage: 45, amount: 6390 },
                      { location: "United Kingdom", percentage: 20, amount: 2840 },
                      { location: "Germany", percentage: 15, amount: 2130 },
                      { location: "France", percentage: 10, amount: 1420 },
                      { location: "Other", percentage: 10, amount: 1420 },
                    ].map((item) => (
                      <div key={item.location}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{item.location}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${item.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Artwork Views</CardTitle>
                <CardDescription>
                  Views of your artworks over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-1">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={viewsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="views"
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Artworks</CardTitle>
                  <CardDescription>
                    Your most viewed and saved artworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { id: "pop-1", title: "Harmony in Blue", views: 243, saves: 18, engagement: 12 },
                      { id: "pop-2", title: "Fractured Reality", views: 421, saves: 34, engagement: 18 },
                      { id: "pop-3", title: "Silent Echo", views: 187, saves: 12, engagement: 8 },
                      { id: "pop-4", title: "Morning Light", views: 156, saves: 15, engagement: 10 },
                    ].map((artwork) => (
                      <div key={artwork.id} className="flex items-center space-x-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{artwork.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {artwork.views} views
                            </span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {artwork.saves} saves
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-green-600">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="text-sm font-medium">{artwork.engagement}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Collector Demographics</CardTitle>
                  <CardDescription>
                    Demographics of users interested in your art
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { age: "18-24", percentage: 15 },
                          { age: "25-34", percentage: 35 },
                          { age: "35-44", percentage: 25 },
                          { age: "45-54", percentage: 15 },
                          { age: "55+", percentage: 10 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="age" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
