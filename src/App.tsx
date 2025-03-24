
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import ArtworkDetail from "./pages/ArtworkDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          {/* Artist Dashboard Routes */}
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/artist-dashboard/*" element={<ArtistDashboard />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
