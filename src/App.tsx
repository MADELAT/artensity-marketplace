
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import ArtworkDetail from "./pages/ArtworkDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import GalleryDashboard from "./pages/gallery/GalleryDashboard";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import NotFound from "./pages/NotFound";

// Route Protection Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            
            {/* Protected Admin Dashboard Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Artist Dashboard Routes */}
            <Route 
              path="/artist-dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['artist']}>
                  <ArtistDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Gallery Dashboard Routes */}
            <Route 
              path="/gallery-dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['gallery']}>
                  <GalleryDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Buyer Dashboard Routes */}
            <Route 
              path="/buyer-dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['buyer']}>
                  <BuyerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Additional Pages */}
            <Route path="/artists" element={<div className="container mx-auto py-10">This section is in development.</div>} />
            <Route path="/galleries" element={<div className="container mx-auto py-10">This section is in development.</div>} />
            <Route path="/categories" element={<div className="container mx-auto py-10">This section is in development.</div>} />
            <Route path="/about" element={<div className="container mx-auto py-10">This section is in development.</div>} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
