import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardRecruteur from "./pages/recruteur/DashboardRecruteur";
import DashboardCandidat from "./pages/candidat/DashboardCandidat";
import CreerOffre from "./pages/recruteur/CreerOffre";
import ListeOffres from "./pages/recruteur/ListeOffres";
import Resultats from "./pages/recruteur/Resultats";
import OffresCandidat from "./pages/candidat/OffresCandidat";
import PasserTest from "./pages/candidat/PasserTest";
import ResultatsCandidat from "./pages/candidat/ResultatsCandidat";
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
          <Route path="/register" element={<Register />} />
          
          {/* Routes Recruteur */}
          <Route path="/recruteur/dashboard" element={<DashboardRecruteur />} />
          <Route path="/recruteur/creer-offre" element={<CreerOffre />} />
          <Route path="/recruteur/offres" element={<ListeOffres />} />
          <Route path="/recruteur/resultats" element={<Resultats />} />
          
          {/* Routes Candidat */}
          <Route path="/candidat/dashboard" element={<DashboardCandidat />} />
          <Route path="/candidat/offres" element={<OffresCandidat />} />
          <Route path="/candidat/test/:offreId" element={<PasserTest />} />
          <Route path="/candidat/resultats" element={<ResultatsCandidat />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
