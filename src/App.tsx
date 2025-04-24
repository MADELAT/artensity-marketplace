import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import ArtistProfile from "./pages/artist/ArtistProfile";
import { ArtworkUploadForm } from "@/components/artist/ArtworkUploadForm";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import ArtworkDetail from "./pages/ArtworkDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import GalleryDashboard from "@/pages/gallery/GalleryDashboard";
import NewArtist from "@/pages/gallery/NewArtist";
// import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import About from "./pages/About";
import Artists from "./pages/Artists";
import Galleries from "./pages/Galleries";
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
        <SessionContextProvider supabaseClient={supabase}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/galleries" element={<Galleries />} />
              <Route path="/home" element={<Explore />} />
              <Route path="/artist/:username" element={<ArtistProfile />} />

              {/* ✅ Admin Dashboard route habilitada */}
              <Route
                path="/dashboard/admin/*"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* ✅ Protected Artist Dashboard Routes */}
              <Route
                path="/dashboard/artist/*"
                element={
                  <ProtectedRoute allowedRoles={["artist"]}>
                    <ArtistDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={<Navigate to="/dashboard/artist" replace />}
                />
                <Route
                  path="artworks"
                  element={<Navigate to="/dashboard/artist/artworks" replace />}
                />
                <Route
                  path="statistics"
                  element={
                    <Navigate to="/dashboard/artist/statistics" replace />
                  }
                />
                <Route
                  path="settings"
                  element={<Navigate to="/dashboard/artist/settings" replace />}
                />
              </Route>

              <Route
                path="/dashboard/gallery/*"
                element={
                  <ProtectedRoute allowedRoles={["gallery"]}>
                    <GalleryDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/gallery/new-artist"
                element={
                  <ProtectedRoute allowedRoles={["gallery"]}>
                    <NewArtist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gallery/artworks/upload"
                element={
                  <ProtectedRoute allowedRoles={["gallery"]}>
                    <ArtworkUploadForm />
                  </ProtectedRoute>
                }
              />

              {/* Profile route */}
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute
                    allowedRoles={["admin", "artist", "gallery", "buyer"]}
                  >
                    <div>Profile page content (coming soon)</div>
                  </ProtectedRoute>
                }
              />

              {/* Settings route */}
              <Route
                path="/settings/*"
                element={
                  <ProtectedRoute
                    allowedRoles={["admin", "artist", "gallery", "buyer"]}
                  >
                    <div>Settings page content (coming soon)</div>
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
