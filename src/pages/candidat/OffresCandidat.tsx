import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  Clock,
  PlayCircle,
  CheckCircle,
  Building,
  Users
} from "lucide-react";

interface Offre {
  id: number;
  titre: string;
  description: string;
  company: string;
  type: string;
  lieu: string;
  competences: string;
  salaire?: string;
  dateCreation: string;
  hasTest: boolean;
  testStatus?: 'not_started' | 'completed' | 'in_progress';
  applicationStatus?: 'not_applied' | 'applied' | 'rejected';
}

const OffresCandidat = () => {
  const { user, logout } = useAuth();
  const [offres, setOffres] = useState<Offre[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtreType, setFiltreType] = useState("tous");
  const [filtreStatut, setFiltreStatut] = useState("tous");

  useEffect(() => {
    // Données de démonstration pour les candidats
    const offresDemo: Offre[] = [
      {
        id: 1,
        titre: "Développeur React Senior",
        description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe tech en pleine croissance. Vous travaillerez sur des projets innovants avec les dernières technologies.",
        company: "TechCorp",
        type: "CDI",
        lieu: "Paris",
        competences: "React, TypeScript, Node.js, AWS",
        salaire: "50-65k€",
        dateCreation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: true,
        testStatus: "not_started",
        applicationStatus: "not_applied"
      },
      {
        id: 2,
        titre: "Designer UX/UI",
        description: "Rejoignez notre studio de design pour créer des expériences utilisateur exceptionnelles. Poste en full remote avec une équipe créative et bienveillante.",
        company: "Design Studio",
        type: "CDI",
        lieu: "Remote",
        competences: "Figma, Adobe XD, Sketch, Prototyping",
        salaire: "40-50k€",
        dateCreation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: true,
        testStatus: "not_started",
        applicationStatus: "not_applied"
      },
      {
        id: 3,
        titre: "Chef de Projet Digital",
        description: "Nous cherchons un chef de projet expérimenté pour piloter nos projets web et mobile. Excellent environnement de travail et perspectives d'évolution.",
        company: "Digital Agency",
        type: "CDI",
        lieu: "Lyon",
        competences: "Gestion de projet, Scrum, Agile, JIRA",
        salaire: "45-55k€",
        dateCreation: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: false,
        applicationStatus: "not_applied"
      },
      {
        id: 4,
        titre: "Développeur Full Stack",
        description: "Startup en pleine croissance recherche un développeur full stack passionné. Stack moderne et équipe jeune et dynamique.",
        company: "StartupXYZ",
        type: "CDI",
        lieu: "Toulouse",
        competences: "Vue.js, Python, Django, PostgreSQL",
        salaire: "42-48k€",
        dateCreation: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: true,
        testStatus: "completed",
        applicationStatus: "applied"
      },
      {
        id: 5,
        titre: "Data Scientist",
        description: "Analysez les données pour aider nos équipes à prendre de meilleures décisions. Projets variés et impact business direct.",
        company: "DataCorp",
        type: "CDD",
        lieu: "Nantes",
        competences: "Python, R, Machine Learning, SQL",
        salaire: "38-45k€",
        dateCreation: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: true,
        testStatus: "completed",
        applicationStatus: "applied"
      }
    ];
    setOffres(offresDemo);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaine${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
    return date.toLocaleDateString('fr-FR');
  };

  const getApplicationBadge = (status?: string) => {
    switch (status) {
      case 'applied':
        return <Badge className="bg-success">Candidature envoyée</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejetée</Badge>;
      default:
        return null;
    }
  };

  const getTestBadge = (hasTest: boolean, testStatus?: string) => {
    if (!hasTest) return null;
    
    switch (testStatus) {
      case 'completed':
        return <Badge variant="outline" className="text-success border-success">
          <CheckCircle className="w-3 h-3 mr-1" />Test réussi
        </Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-warning border-warning">
          <Clock className="w-3 h-3 mr-1" />Test en cours
        </Badge>;
      default:
        return <Badge variant="outline" className="text-primary border-primary">
          <PlayCircle className="w-3 h-3 mr-1" />Test requis
        </Badge>;
    }
  };

  const offresFiltrees = offres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.competences.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filtreType === "tous" || offre.type === filtreType;
    const matchesStatut = filtreStatut === "tous" || offre.applicationStatus === filtreStatut;
    return matchesSearch && matchesType && matchesStatut;
  });

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Offres d'emploi disponibles
            </h1>
            <p className="text-muted-foreground">
              Découvrez les opportunités qui correspondent à votre profil
            </p>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par titre, compétences ou entreprise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <select
                    value={filtreType}
                    onChange={(e) => setFiltreType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div className="md:w-48">
                  <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="not_applied">Non postulé</option>
                    <option value="applied">Candidature envoyée</option>
                    <option value="rejected">Rejetée</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des offres */}
          <div className="space-y-6">
            {offresFiltrees.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucune offre trouvée
                  </h3>
                  <p className="text-muted-foreground">
                    Aucune offre ne correspond à vos critères de recherche.
                  </p>
                </CardContent>
              </Card>
            ) : (
              offresFiltrees.map((offre) => (
                <Card key={offre.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-foreground">
                                {offre.titre}
                              </h3>
                              {getApplicationBadge(offre.applicationStatus)}
                              {getTestBadge(offre.hasTest, offre.testStatus)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {offre.company}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {offre.lieu}
                              </div>
                              <Badge variant="outline">{offre.type}</Badge>
                              {offre.salaire && (
                                <span className="font-medium text-foreground">{offre.salaire}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {offre.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            Publié {formatDate(offre.dateCreation)}
                          </div>
                          <div className="text-muted-foreground">
                            <span className="font-medium">Compétences:</span> {offre.competences}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3 mt-4 lg:mt-0 lg:ml-6 lg:w-64">
                        {offre.applicationStatus === 'not_applied' ? (
                          <>
                            <Link to={`/candidat/offres/${offre.id}`} className="w-full">
                              <Button className="w-full">
                                Voir l'offre complète
                              </Button>
                            </Link>
                            <Link to={`/consentement/${offre.id}`} className="w-full">
                              <Button variant="success" className="w-full">
                                {offre.hasTest ? (
                                  <>
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Passer le test
                                  </>
                                ) : (
                                  <>
                                    <Users className="mr-2 h-4 w-4" />
                                    Postuler maintenant
                                  </>
                                )}
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <div className="text-center w-full">
                            <Link to={`/candidat/offres/${offre.id}`}>
                              <Button variant="outline" className="w-full">
                                Voir les détails
                              </Button>
                            </Link>
                            {offre.applicationStatus === 'applied' && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Candidature envoyée ✓
                              </p>
                            )}
                          </div>
                        )}
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

export default OffresCandidat;