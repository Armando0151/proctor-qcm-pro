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
import DetailOffre from "./pages/candidat/DetailOffre";
import PostulerOffre from "./pages/candidat/PostulerOffre";
import EditOffre from "./pages/recruteur/EditOffre";
import CandidatsOffre from "./pages/recruteur/CandidatsOffre";
import Profil from "./pages/shared/Profil";
import Parametres from "./pages/shared/Parametres";
import ConsentementRGPD from "./pages/public/ConsentementRGPD";
import RGPD from "./pages/public/RGPD";
import CGU from "./pages/public/CGU";
import GestionCandidatures from "./pages/recruteur/GestionCandidatures";
import DetailCandidature from "./pages/recruteur/DetailCandidature";
import SuiviCandidatures from "./pages/candidat/SuiviCandidatures";
import FAQ from "./pages/shared/FAQ";

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
          <Route path="/recruteur/offres/:id/edit" element={<EditOffre />} />
          <Route path="/recruteur/offres/:id/candidats" element={<CandidatsOffre />} />
          <Route path="/recruteur/resultats" element={<Resultats />} />
          <Route path="/recruteur/gestion-candidatures" element={<GestionCandidatures />} />
          <Route path="/recruteur/candidatures/:id" element={<DetailCandidature />} />
          
          {/* Routes Candidat */}
          <Route path="/candidat/dashboard" element={<DashboardCandidat />} />
          <Route path="/candidat/offres" element={<OffresCandidat />} />
          <Route path="/candidat/offres/:id" element={<DetailOffre />} />
          <Route path="/candidat/postuler/:id" element={<PostulerOffre />} />
          <Route path="/candidat/test/:offreId" element={<PasserTest />} />
          <Route path="/candidat/resultats" element={<ResultatsCandidat />} />
          <Route path="/candidat/suivi-candidatures" element={<SuiviCandidatures />} />
          
          {/* Routes publiques */}
          <Route path="/consentement/:offreId" element={<ConsentementRGPD />} />
          <Route path="/rgpd" element={<RGPD />} />
          <Route path="/cgu" element={<CGU />} />
          
          {/* Routes partagées */}
          <Route path="/profil" element={<Profil />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
