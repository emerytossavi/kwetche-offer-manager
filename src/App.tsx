
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OffresPage from "./pages/dashboard/OffresPage";
import OffreDetailPage from "./pages/dashboard/OffreDetailPage";
import OffreAddPage from "./pages/dashboard/OffreAddPage";
import ReductionsPage from "./pages/dashboard/ReductionsPage";
import PartenariatsPage from "./pages/dashboard/PartenariatsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Route par défaut - redirige vers le tableau de bord */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Routes du tableau de bord */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/offres" element={<OffresPage />} />
          <Route path="/dashboard/offre/:id" element={<OffreDetailPage />} />
          <Route path="/dashboard/offre/ajouter" element={<OffreAddPage />} />
          <Route path="/dashboard/reductions" element={<ReductionsPage />} />
          <Route path="/dashboard/partenariats" element={<PartenariatsPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
