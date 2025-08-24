import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  Star,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Award
} from "lucide-react";

interface Candidature {
  id: string;
  candidatId: string;
  offreId: string;
  offreTitre: string;
  candidatNom: string;
  candidatEmail: string;
  candidatTelephone: string;
  datePostulation: string;
  statut: 'en_attente' | 'accepte' | 'refuse' | 'entretien';
  noteTest?: number;
  lettreMotivation: string;
  experience: string;
  competences: string[];
  cvUrl?: string;
  lettreUrl?: string;
  dateEntretien?: string;
  commentairesRH?: string;
}

const GestionCandidatures = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState<Candidature[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [offreFilter, setOffreFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de récupération des candidatures
    setTimeout(() => {
      const mockCandidatures: Candidature[] = [
        {
          id: "1",
          candidatId: "c1",
          offreId: "1",
          offreTitre: "Développeur React Senior",
          candidatNom: "Marie Dubois",
          candidatEmail: "marie.dubois@email.com",
          candidatTelephone: "06 12 34 56 78",
          datePostulation: "2024-01-15T10:30:00Z",
          statut: "en_attente",
          noteTest: 85,
          lettreMotivation: "Je suis très intéressée par ce poste car il correspond parfaitement à mon expérience...",
          experience: "5 ans",
          competences: ["React", "TypeScript", "Node.js", "AWS"],
          cvUrl: "/documents/cv-marie-dubois.pdf",
          lettreUrl: "/documents/lettre-marie-dubois.pdf"
        },
        {
          id: "2",
          candidatId: "c2",
          offreId: "1",
          offreTitre: "Développeur React Senior",
          candidatNom: "Thomas Martin",
          candidatEmail: "thomas.martin@email.com",
          candidatTelephone: "06 98 76 54 32",
          datePostulation: "2024-01-14T14:15:00Z",
          statut: "entretien",
          noteTest: 92,
          lettreMotivation: "Fort de mes 7 années d'expérience en développement React...",
          experience: "7 ans",
          competences: ["React", "TypeScript", "GraphQL", "Docker"],
          cvUrl: "/documents/cv-thomas-martin.pdf",
          dateEntretien: "2024-01-20T15:00:00Z"
        },
        {
          id: "3",
          candidatId: "c3",
          offreId: "2",
          offreTitre: "Designer UX/UI",
          candidatNom: "Sophie Lefebvre",
          candidatEmail: "sophie.lefebvre@email.com",
          candidatTelephone: "06 55 44 33 22",
          datePostulation: "2024-01-13T09:20:00Z",
          statut: "accepte",
          noteTest: 88,
          lettreMotivation: "Passionnée par l'expérience utilisateur...",
          experience: "4 ans",
          competences: ["Figma", "Adobe XD", "Prototyping", "User Research"],
          cvUrl: "/documents/cv-sophie-lefebvre.pdf"
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
        candidature.candidatNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidature.candidatEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidature.offreTitre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(candidature => candidature.statut === statusFilter);
    }

    if (offreFilter !== "all") {
      filtered = filtered.filter(candidature => candidature.offreId === offreFilter);
    }

    setFilteredCandidatures(filtered);
  }, [candidatures, searchTerm, statusFilter, offreFilter]);

  const handleStatusChange = (candidatureId: string, newStatus: Candidature['statut']) => {
    setCandidatures(prev =>
      prev.map(candidature =>
        candidature.id === candidatureId
          ? { ...candidature, statut: newStatus }
          : candidature
      )
    );
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut de la candidature a été modifié avec succès.",
    });
  };

  const exportCandidatures = () => {
    // Simulation de l'export
    const data = filteredCandidatures.map(c => ({
      'Nom': c.candidatNom,
      'Email': c.candidatEmail,
      'Offre': c.offreTitre,
      'Date': new Date(c.datePostulation).toLocaleDateString('fr-FR'),
      'Statut': c.statut,
      'Note Test': c.noteTest || 'N/A'
    }));
    
    console.log('Export des candidatures:', data);
    toast({
      title: "Export réussi",
      description: "Les candidatures ont été exportées avec succès.",
    });
  };

  const getStatusBadge = (statut: Candidature['statut']) => {
    switch (statut) {
      case 'en_attente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'accepte':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Accepté</Badge>;
      case 'refuse':
        return <Badge variant="destructive">Refusé</Badge>;
      case 'entretien':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Entretien</Badge>;
    }
  };

  const getStatusCounts = () => {
    return {
      total: candidatures.length,
      en_attente: candidatures.filter(c => c.statut === 'en_attente').length,
      entretien: candidatures.filter(c => c.statut === 'entretien').length,
      accepte: candidatures.filter(c => c.statut === 'accepte').length,
      refuse: candidatures.filter(c => c.statut === 'refuse').length
    };
  };

  const offresUniques = [...new Set(candidatures.map(c => ({ id: c.offreId, titre: c.offreTitre })))];
  const stats = getStatusCounts();

  if (isLoading) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des candidatures...</p>
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
              <h1 className="text-3xl font-bold text-foreground">Gestion des Candidatures</h1>
              <p className="text-muted-foreground mt-2">
                Gérez toutes les candidatures reçues pour vos offres d'emploi
              </p>
            </div>
            <Button onClick={exportCandidatures} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
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
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Entretien</p>
                    <p className="text-2xl font-bold text-foreground">{stats.entretien}</p>
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

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Refusés</p>
                    <p className="text-2xl font-bold text-foreground">{stats.refuse}</p>
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
                      placeholder="Rechercher par nom, email ou offre..."
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
                    <SelectItem value="entretien">Entretien</SelectItem>
                    <SelectItem value="accepte">Accepté</SelectItem>
                    <SelectItem value="refuse">Refusé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={offreFilter} onValueChange={setOffreFilter}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Filtrer par offre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les offres</SelectItem>
                    {offresUniques.map((offre) => (
                      <SelectItem key={offre.id} value={offre.id}>
                        {offre.titre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidatures List */}
          <div className="space-y-6">
            {filteredCandidatures.map((candidature) => (
              <Card key={candidature.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Informations candidat */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {candidature.candidatNom}
                          </h3>
                          <p className="text-sm text-muted-foreground">{candidature.offreTitre}</p>
                        </div>
                        {getStatusBadge(candidature.statut)}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-2 h-4 w-4" />
                          {candidature.candidatEmail}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-2 h-4 w-4" />
                          {candidature.candidatTelephone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Postulé le {new Date(candidature.datePostulation).toLocaleDateString('fr-FR')}
                        </div>
                        {candidature.noteTest && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Award className="mr-2 h-4 w-4" />
                            Note test: {candidature.noteTest}/100
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {candidature.competences.map((competence, index) => (
                            <Badge key={index} variant="secondary">
                              {competence}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/recruteur/candidatures/${candidature.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </Button>

                      <Select
                        value={candidature.statut}
                        onValueChange={(value) => handleStatusChange(candidature.id, value as Candidature['statut'])}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en_attente">En attente</SelectItem>
                          <SelectItem value="entretien">Entretien</SelectItem>
                          <SelectItem value="accepte">Accepté</SelectItem>
                          <SelectItem value="refuse">Refusé</SelectItem>
                        </SelectContent>
                      </Select>

                      {candidature.cvUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(candidature.cvUrl, '_blank')}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          CV
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
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucune candidature trouvée
                  </h3>
                  <p className="text-muted-foreground">
                    Aucune candidature ne correspond à vos critères de recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GestionCandidatures;