import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  PlayCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Award,
  Briefcase
} from "lucide-react";

interface MaCandidature {
  id: string;
  offreId: string;
  offreTitre: string;
  offreCompany: string;
  offreLieu: string;
  offreType: string;
  datePostulation: string;
  statut: 'en_attente' | 'accepte' | 'refuse' | 'entretien' | 'en_cours_evaluation';
  
  // Test
  testReqis: boolean;
  testPasse: boolean;
  noteTest?: number;
  
  // Entretien
  dateEntretien?: string;
  statutEntretien?: 'programme' | 'realise' | 'en_attente_planning';
  
  // Documents
  cvEnvoye: boolean;
  lettreMotivationEnvoyee: boolean;
  
  // Timeline
  etapesRealises: string[];
  prochainEtape?: string;
  
  // Feedback
  feedbackRecruteur?: string;
  commentaires?: string;
}

const SuiviCandidatures = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState<MaCandidature[]>([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState<MaCandidature[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de récupération des candidatures
    setTimeout(() => {
      const mockCandidatures: MaCandidature[] = [
        {
          id: "1",
          offreId: "1",
          offreTitre: "Développeur React Senior",
          offreCompany: "TechCorp",
          offreLieu: "Paris",
          offreType: "CDI",
          datePostulation: "2024-01-15T10:30:00Z",
          statut: "en_cours_evaluation",
          testReqis: true,
          testPasse: true,
          noteTest: 85,
          cvEnvoye: true,
          lettreMotivationEnvoyee: true,
          etapesRealises: ["postulation", "test", "evaluation_cv"],
          prochainEtape: "entretien_technique",
          feedbackRecruteur: "Profil très intéressant, test réussi avec brio."
        },
        {
          id: "2",
          offreId: "2",
          offreTitre: "Designer UX/UI",
          offreCompany: "CreativeStudio",
          offreLieu: "Lyon",
          offreType: "CDI",
          datePostulation: "2024-01-12T14:20:00Z",
          statut: "entretien",
          testReqis: false,
          testPasse: false,
          cvEnvoye: true,
          lettreMotivationEnvoyee: true,
          dateEntretien: "2024-01-25T10:00:00Z",
          statutEntretien: "programme",
          etapesRealises: ["postulation", "evaluation_cv"],
          prochainEtape: "entretien_rh"
        },
        {
          id: "3",
          offreId: "3",
          offreTitre: "Chef de Projet Digital",
          offreCompany: "DigitalAgency",
          offreLieu: "Remote",
          offreType: "CDI",
          datePostulation: "2024-01-10T09:15:00Z",
          statut: "refuse",
          testReqis: true,
          testPasse: true,
          noteTest: 65,
          cvEnvoye: true,
          lettreMotivationEnvoyee: true,
          etapesRealises: ["postulation", "test", "evaluation_complete"],
          feedbackRecruteur: "Merci pour votre candidature. Votre profil ne correspond pas exactement à nos besoins actuels."
        },
        {
          id: "4",
          offreId: "4",
          offreTitre: "Data Scientist",
          offreCompany: "DataTech",
          offreLieu: "Toulouse",
          offreType: "CDI",
          datePostulation: "2024-01-08T16:45:00Z",
          statut: "en_attente",
          testReqis: true,
          testPasse: false,
          cvEnvoye: true,
          lettreMotivationEnvoyee: true,
          etapesRealises: ["postulation"],
          prochainEtape: "test_technique"
        }
      ];
      
      setCandidatures(mockCandidatures);
      setFilteredCandidatures(mockCandidatures);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = candidatures;

    if (searchTerm) {
      filtered = filtered.filter(candidature =>
        candidature.offreTitre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidature.offreCompany.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(candidature => candidature.statut === statusFilter);
    }

    setFilteredCandidatures(filtered);
  }, [candidatures, searchTerm, statusFilter]);

  const getStatusBadge = (statut: MaCandidature['statut']) => {
    switch (statut) {
      case 'en_attente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'en_cours_evaluation':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">En évaluation</Badge>;
      case 'entretien':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">Entretien</Badge>;
      case 'accepte':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Accepté</Badge>;
      case 'refuse':
        return <Badge variant="destructive">Refusé</Badge>;
    }
  };

  const getProgressPercentage = (etapes: string[]) => {
    const totalEtapes = 5; // postulation, test, evaluation_cv, entretien, decision
    return (etapes.length / totalEtapes) * 100;
  };

  const getStatusIcon = (statut: MaCandidature['statut']) => {
    switch (statut) {
      case 'en_attente':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'en_cours_evaluation':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'entretien':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'accepte':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'refuse':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatsCounts = () => {
    return {
      total: candidatures.length,
      en_attente: candidatures.filter(c => c.statut === 'en_attente').length,
      en_cours: candidatures.filter(c => c.statut === 'en_cours_evaluation' || c.statut === 'entretien').length,
      accepte: candidatures.filter(c => c.statut === 'accepte').length,
      refuse: candidatures.filter(c => c.statut === 'refuse').length
    };
  };

  const stats = getStatsCounts();

  if (isLoading) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de vos candidatures...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mes Candidatures</h1>
              <p className="text-muted-foreground mt-2">
                Suivez l'évolution de toutes vos candidatures en temps réel
              </p>
            </div>
            <Link to="/candidat/offres">
              <Button>
                <Briefcase className="mr-2 h-4 w-4" />
                Voir les offres
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">En attente</p>
                    <p className="text-2xl font-bold text-foreground">{stats.en_attente}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">En cours</p>
                    <p className="text-2xl font-bold text-foreground">{stats.en_cours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Acceptés</p>
                    <p className="text-2xl font-bold text-foreground">{stats.accepte}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher par titre ou entreprise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="en_cours_evaluation">En évaluation</SelectItem>
                    <SelectItem value="entretien">Entretien</SelectItem>
                    <SelectItem value="accepte">Accepté</SelectItem>
                    <SelectItem value="refuse">Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidatures List */}
          <div className="space-y-6">
            {filteredCandidatures.map((candidature) => (
              <Card key={candidature.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Informations principales */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {candidature.offreTitre}
                          </h3>
                          <div className="flex items-center text-muted-foreground text-sm space-x-4">
                            <div className="flex items-center">
                              <Building className="mr-1 h-4 w-4" />
                              {candidature.offreCompany}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {candidature.offreLieu}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              Postulé le {new Date(candidature.datePostulation).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(candidature.statut)}
                          {getStatusBadge(candidature.statut)}
                        </div>
                      </div>

                      {/* Progression */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="text-muted-foreground">
                            {candidature.etapesRealises.length}/5 étapes
                          </span>
                        </div>
                        <Progress value={getProgressPercentage(candidature.etapesRealises)} className="h-2" />
                        {candidature.prochainEtape && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Prochaine étape: {candidature.prochainEtape.replace('_', ' ')}
                          </p>
                        )}
                      </div>

                      {/* Informations supplémentaires */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {candidature.testReqis && (
                          <div className="flex items-center">
                            {candidature.testPasse ? (
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-muted-foreground">
                              Test {candidature.testPasse ? 'réussi' : 'à passer'}
                              {candidature.noteTest && ` (${candidature.noteTest}/100)`}
                            </span>
                          </div>
                        )}
                        
                        {candidature.dateEntretien && (
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                            <span className="text-muted-foreground">
                              Entretien le {new Date(candidature.dateEntretien).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Feedback recruteur */}
                      {candidature.feedbackRecruteur && (
                        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Feedback recruteur:</strong> {candidature.feedbackRecruteur}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/candidat/offres/${candidature.offreId}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir l'offre
                      </Button>

                      {candidature.testReqis && !candidature.testPasse && (
                        <Button
                          size="sm"
                          onClick={() => navigate(`/candidat/test/${candidature.offreId}`)}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Passer le test
                        </Button>
                      )}

                      {candidature.noteTest && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/candidat/resultats?offre=${candidature.offreId}`)}
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Voir résultats
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCandidatures.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucune candidature trouvée
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all" 
                      ? "Aucune candidature ne correspond à vos critères de recherche."
                      : "Vous n'avez pas encore postulé à d'offres."}
                  </p>
                  <Link to="/candidat/offres">
                    <Button>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Découvrir les offres
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuiviCandidatures;