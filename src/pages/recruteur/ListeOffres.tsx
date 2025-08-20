import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Eye,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

interface Offre {
  id: number;
  titre: string;
  description: string;
  type: string;
  lieu: string;
  competences: string;
  dateCreation: string;
  statut: 'active' | 'inactive' | 'draft';
  candidatures: number;
  qcm: any[];
}

const ListeOffres = () => {
  const { user, logout } = useAuth();
  const [offres, setOffres] = useState<Offre[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");

  useEffect(() => {
    // Charger les offres depuis le localStorage
    const offresStockees = localStorage.getItem('offres');
    if (offresStockees) {
      setOffres(JSON.parse(offresStockees));
    } else {
      // Données de démonstration
      const offresDemo: Offre[] = [
        {
          id: 1,
          titre: "Développeur React Senior",
          description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe...",
          type: "CDI",
          lieu: "Paris",
          competences: "React, TypeScript, Node.js",
          dateCreation: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "active",
          candidatures: 12,
          qcm: []
        },
        {
          id: 2,
          titre: "Designer UX/UI",
          description: "Poste de designer pour créer des interfaces utilisateur exceptionnelles...",
          type: "CDI",
          lieu: "Lyon",
          competences: "Figma, Adobe XD, Sketch",
          dateCreation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "active",
          candidatures: 8,
          qcm: [{ id: 1, question: "Question test" }]
        },
        {
          id: 3,
          titre: "Chef de Projet Digital",
          description: "Nous cherchons un chef de projet expérimenté...",
          type: "CDD",
          lieu: "Remote",
          competences: "Gestion de projet, Scrum, Agile",
          dateCreation: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "draft",
          candidatures: 0,
          qcm: []
        }
      ];
      setOffres(offresDemo);
      localStorage.setItem('offres', JSON.stringify(offresDemo));
    }
  }, []);

  const supprimerOffre = (id: number) => {
    const nouvellesOffres = offres.filter(offre => offre.id !== id);
    setOffres(nouvellesOffres);
    localStorage.setItem('offres', JSON.stringify(nouvellesOffres));
    toast({
      title: "Offre supprimée",
      description: "L'offre a été supprimée avec succès.",
    });
  };

  const changerStatut = (id: number, nouveauStatut: 'active' | 'inactive') => {
    const nouvellesOffres = offres.map(offre => 
      offre.id === id ? { ...offre, statut: nouveauStatut } : offre
    );
    setOffres(nouvellesOffres);
    localStorage.setItem('offres', JSON.stringify(nouvellesOffres));
    toast({
      title: "Statut modifié",
      description: `L'offre est maintenant ${nouveauStatut === 'active' ? 'active' : 'inactive'}.`,
    });
  };

  const offresFiltrees = offres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.competences.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filtreStatut === "tous" || offre.statut === filtreStatut;
    return matchesSearch && matchesStatut;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'active':
        return <Badge className="bg-success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestion des offres
              </h1>
              <p className="text-muted-foreground">
                Gérez vos offres d'emploi et suivez les candidatures
              </p>
            </div>
            <Link to="/recruteur/creer-offre">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Créer une offre
              </Button>
            </Link>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une offre..."
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des offres */}
          <div className="space-y-4">
            {offresFiltrees.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucune offre trouvée
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || filtreStatut !== "tous" 
                      ? "Aucune offre ne correspond à vos critères de recherche."
                      : "Vous n'avez pas encore créé d'offre d'emploi."
                    }
                  </p>
                  <Link to="/recruteur/creer-offre">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Créer votre première offre
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              offresFiltrees.map((offre) => (
                <Card key={offre.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {offre.titre}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(offre.dateCreation)}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {offre.lieu}
                              </div>
                              <Badge variant="outline">{offre.type}</Badge>
                            </div>
                          </div>
                          {getStatutBadge(offre.statut)}
                        </div>

                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {offre.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center text-primary">
                            <Users className="h-4 w-4 mr-1" />
                            {offre.candidatures} candidature{offre.candidatures > 1 ? 's' : ''}
                          </div>
                          {offre.qcm && offre.qcm.length > 0 && (
                            <div className="flex items-center text-accent">
                              <Clock className="h-4 w-4 mr-1" />
                              QCM inclus ({offre.qcm.length} question{offre.qcm.length > 1 ? 's' : ''})
                            </div>
                          )}
                          <div className="text-muted-foreground">
                            Compétences: {offre.competences}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                        <Link to={`/recruteur/offres/${offre.id}/candidats`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Candidats
                          </Button>
                        </Link>
                        <Link to={`/recruteur/offres/${offre.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => changerStatut(
                            offre.id, 
                            offre.statut === 'active' ? 'inactive' : 'active'
                          )}
                        >
                          {offre.statut === 'active' ? 'Désactiver' : 'Activer'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => supprimerOffre(offre.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

export default ListeOffres;