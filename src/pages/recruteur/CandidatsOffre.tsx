import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Users, 
  Search,
  Star,
  Eye,
  Download,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface Candidat {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  datePostulation: string;
  statut: 'en_attente' | 'accepte' | 'refuse' | 'entretien';
  scoreTest?: number;
  credibiliteTest?: number;
  lettreMotivation: string;
  salaireSouhaite?: string;
  disponibilite?: string;
  experience?: string;
}

interface Offre {
  id: number;
  titre: string;
  company: string;
}

const CandidatsOffre = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [offre, setOffre] = useState<Offre | null>(null);
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [candidatSelectionne, setCandidatSelectionne] = useState<Candidat | null>(null);

  useEffect(() => {
    // Récupérer l'offre
    const offres = JSON.parse(localStorage.getItem('offres') || '[]');
    const offreDetail = offres.find((o: any) => o.id === parseInt(id || '0'));
    if (offreDetail) {
      setOffre({
        id: offreDetail.id,
        titre: offreDetail.titre,
        company: "TechCorp"
      });
    }

    // Candidats de démonstration
    const candidatsDemo: Candidat[] = [
      {
        id: 1,
        nom: "Sophie Dupont",
        email: "sophie.dupont@email.com",
        telephone: "06 12 34 56 78",
        adresse: "Paris, France",
        datePostulation: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        statut: "en_attente",
        scoreTest: 85,
        credibiliteTest: 92,
        lettreMotivation: "Passionnée par le développement React, je souhaite rejoindre votre équipe pour contribuer à des projets innovants...",
        salaireSouhaite: "50-55k€",
        disponibilite: "Immédiate",
        experience: "4 ans"
      },
      {
        id: 2,
        nom: "Thomas Martin",
        email: "thomas.martin@email.com",
        telephone: "06 87 65 43 21",
        adresse: "Lyon, France",
        datePostulation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        statut: "accepte",
        scoreTest: 78,
        credibiliteTest: 88,
        lettreMotivation: "Fort de 5 années d'expérience en développement web, je maîtrise parfaitement React et TypeScript...",
        salaireSouhaite: "55-60k€",
        disponibilite: "1 mois de préavis",
        experience: "5 ans"
      },
      {
        id: 3,
        nom: "Marie Leroy",
        email: "marie.leroy@email.com",
        telephone: "06 98 76 54 32",
        adresse: "Toulouse, France",
        datePostulation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        statut: "entretien",
        scoreTest: 92,
        credibiliteTest: 95,
        lettreMotivation: "Développeuse senior avec une expertise en architecture frontend, je recherche de nouveaux défis...",
        salaireSouhaite: "60-65k€",
        disponibilite: "2 semaines",
        experience: "6 ans"
      },
      {
        id: 4,
        nom: "Pierre Dubois",
        email: "pierre.dubois@email.com",
        telephone: "06 45 67 89 12",
        adresse: "Nantes, France",
        datePostulation: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        statut: "refuse",
        scoreTest: 65,
        credibiliteTest: 78,
        lettreMotivation: "Junior en développement, je suis motivé pour apprendre et contribuer à vos projets...",
        salaireSouhaite: "35-40k€",
        disponibilite: "Immédiate",
        experience: "2 ans"
      }
    ];

    setCandidats(candidatsDemo);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'accepte':
        return <Badge className="bg-success">Accepté</Badge>;
      case 'refuse':
        return <Badge variant="destructive">Refusé</Badge>;
      case 'entretien':
        return <Badge className="bg-warning">Entretien</Badge>;
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-success">{score}%</Badge>;
    if (score >= 60) return <Badge className="bg-warning">{score}%</Badge>;
    return <Badge variant="destructive">{score}%</Badge>;
  };

  const changerStatut = (candidatId: number, nouveauStatut: string) => {
    setCandidats(prev => prev.map(c => 
      c.id === candidatId ? { ...c, statut: nouveauStatut as any } : c
    ));
    
    toast({
      title: "Statut modifié",
      description: `Le statut du candidat a été mis à jour.`,
    });
  };

  const candidatsFiltres = candidats.filter(candidat => {
    const matchesSearch = candidat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidat.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filtreStatut === "tous" || candidat.statut === filtreStatut;
    return matchesSearch && matchesStatut;
  });

  const exporterCandidats = () => {
    const data = candidatsFiltres.map(candidat => ({
      nom: candidat.nom,
      email: candidat.email,
      telephone: candidat.telephone,
      statut: candidat.statut,
      scoreTest: candidat.scoreTest,
      credibiliteTest: candidat.credibiliteTest,
      datePostulation: formatDate(candidat.datePostulation)
    }));

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `candidats-offre-${id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: "La liste des candidats a été exportée.",
    });
  };

  if (!offre) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Offre introuvable</h3>
              <p className="text-muted-foreground mb-4">Cette offre n'existe pas ou a été supprimée.</p>
              <Link to="/recruteur/offres">
                <Button>Retour aux offres</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/recruteur/offres">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux offres
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Candidats pour : {offre.titre}
                </h1>
                <p className="text-muted-foreground">
                  Gérez les candidatures reçues pour cette offre
                </p>
              </div>
            </div>
            <Button onClick={exporterCandidats} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{candidats.length}</p>
                  <p className="text-sm text-muted-foreground">Total candidats</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{candidats.filter(c => c.statut === 'accepte').length}</p>
                  <p className="text-sm text-muted-foreground">Acceptés</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{candidats.filter(c => c.statut === 'entretien').length}</p>
                  <p className="text-sm text-muted-foreground">En entretien</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{candidats.filter(c => c.statut === 'en_attente').length}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un candidat..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="en_attente">En attente</option>
                    <option value="accepte">Accepté</option>
                    <option value="entretien">Entretien</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des candidats */}
          <div className="space-y-4">
            {candidatsFiltres.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucun candidat trouvé
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filtreStatut !== "tous" 
                      ? "Aucun candidat ne correspond à vos critères."
                      : "Aucune candidature n'a encore été reçue pour cette offre."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              candidatsFiltres.map((candidat) => (
                <Card key={candidat.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {candidat.nom}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {candidat.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {candidat.telephone}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {candidat.adresse}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                Postulé {formatDate(candidat.datePostulation)}
                              </div>
                              {candidat.experience && (
                                <div className="flex items-center text-muted-foreground">
                                  <Award className="h-4 w-4 mr-1" />
                                  {candidat.experience} d'expérience
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatutBadge(candidat.statut)}
                          </div>
                        </div>

                        {/* Scores de test */}
                        {candidat.scoreTest && (
                          <div className="flex items-center space-x-6 mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Score test:</span>
                              {getScoreBadge(candidat.scoreTest)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Crédibilité:</span>
                              {candidat.credibiliteTest && getScoreBadge(candidat.credibiliteTest)}
                            </div>
                          </div>
                        )}

                        {/* Lettre de motivation (extrait) */}
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {candidat.lettreMotivation}
                        </p>

                        {/* Infos additionnelles */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          {candidat.salaireSouhaite && (
                            <div className="text-muted-foreground">
                              <span className="font-medium">Salaire:</span> {candidat.salaireSouhaite}
                            </div>
                          )}
                          {candidat.disponibilite && (
                            <div className="text-muted-foreground">
                              <span className="font-medium">Disponibilité:</span> {candidat.disponibilite}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 lg:w-64">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCandidatSelectionne(candidat)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le détail
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            className="bg-success hover:bg-success/90"
                            onClick={() => changerStatut(candidat.id, 'accepte')}
                            disabled={candidat.statut === 'accepte'}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Accepter
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => changerStatut(candidat.id, 'refuse')}
                            disabled={candidat.statut === 'refuse'}
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Refuser
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          className="bg-warning hover:bg-warning/90"
                          onClick={() => changerStatut(candidat.id, 'entretien')}
                          disabled={candidat.statut === 'entretien'}
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          Entretien
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CandidatsOffre;