import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Calendar, 
  Clock,
  PlayCircle,
  CheckCircle,
  Users,
  Euro,
  Briefcase,
  Award,
  AlertTriangle
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
  experience?: string;
  dateCreation: string;
  hasTest: boolean;
  testStatus?: 'not_started' | 'completed' | 'in_progress';
  applicationStatus?: 'not_applied' | 'applied' | 'rejected';
  detailsSupplementaires?: {
    avantages: string[];
    mission: string;
    profil: string;
    processus: string[];
  };
}

const DetailOffre = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [offre, setOffre] = useState<Offre | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de récupération des données
    setTimeout(() => {
      const offreDetail: Offre = {
        id: parseInt(id || '1'),
        titre: "Développeur React Senior",
        description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe tech en pleine croissance. Vous travaillerez sur des projets innovants avec les dernières technologies et contribuerez à l'architecture de nos applications web.",
        company: "TechCorp",
        type: "CDI",
        lieu: "Paris / Hybride",
        competences: "React, TypeScript, Node.js, AWS, Docker",
        salaire: "50-65k€",
        experience: "3-5 ans",
        dateCreation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        hasTest: true,
        testStatus: "not_started",
        applicationStatus: "not_applied",
        detailsSupplementaires: {
          avantages: [
            "Télétravail partiel (3j/semaine)",
            "Tickets restaurant",
            "Mutuelle prise en charge à 100%",
            "RTT et congés payés",
            "Formation continue",
            "Stock-options"
          ],
          mission: "En tant que Développeur React Senior, vous serez en charge du développement et de la maintenance de nos applications front-end. Vous travaillerez en étroite collaboration avec l'équipe UX/UI et l'équipe backend pour créer des expériences utilisateur exceptionnelles.",
          profil: "Diplômé(e) d'une école d'ingénieur ou formation équivalente, vous justifiez d'une expérience significative en développement React. Vous maîtrisez TypeScript, les hooks React, et avez une bonne compréhension des outils de build modernes.",
          processus: [
            "Entretien téléphonique (30 min)",
            "Test technique en ligne",
            "Entretien technique avec l'équipe (1h)",
            "Entretien final avec le responsable (45 min)"
          ]
        }
      };
      setOffre(offreDetail);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handlePostuler = () => {
    if (offre?.hasTest && offre.testStatus === 'not_started') {
      navigate(`/candidat/test/${offre.id}`);
    } else {
      navigate(`/candidat/postuler/${offre.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const getStatusBadge = () => {
    if (!offre) return null;
    
    switch (offre.applicationStatus) {
      case 'applied':
        return <Badge className="bg-success">Candidature envoyée</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejetée</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de l'offre...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!offre) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Offre introuvable</h3>
              <p className="text-muted-foreground mb-4">Cette offre n'existe pas ou a été supprimée.</p>
              <Link to="/candidat/offres">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/candidat/offres">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux offres
              </Button>
            </Link>
            {getStatusBadge()}
          </div>

          {/* En-tête de l'offre */}
          <Card className="mb-8">
            <CardContent className="pt-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-3">{offre.titre}</h1>
                <div className="flex items-center justify-center space-x-6 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    {offre.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {offre.lieu}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Publié {formatDate(offre.dateCreation)}
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Badge variant="outline" className="text-sm">{offre.type}</Badge>
                  {offre.salaire && (
                    <div className="flex items-center text-primary font-semibold">
                      <Euro className="h-4 w-4 mr-1" />
                      {offre.salaire}
                    </div>
                  )}
                  {offre.hasTest && (
                    <Badge variant="outline" className="text-accent border-accent">
                      <Clock className="w-3 h-3 mr-1" />
                      Test requis
                    </Badge>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {offre.applicationStatus === 'not_applied' ? (
                  <>
                    <Button size="lg" onClick={handlePostuler} className="min-w-48">
                      {offre.hasTest && offre.testStatus === 'not_started' ? (
                        <>
                          <PlayCircle className="mr-2 h-5 w-5" />
                          Passer le test d'abord
                        </>
                      ) : (
                        <>
                          <Users className="mr-2 h-5 w-5" />
                          Postuler maintenant
                        </>
                      )}
                    </Button>
                    {offre.hasTest && offre.testStatus === 'completed' && (
                      <div className="flex items-center text-success text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Test réussi
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">Candidature déjà envoyée</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    Description du poste
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{offre.description}</p>
                  {offre.detailsSupplementaires?.mission && (
                    <>
                      <h4 className="font-semibold text-foreground mb-3">Vos missions</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {offre.detailsSupplementaires.mission}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Profil recherché */}
              {offre.detailsSupplementaires?.profil && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Profil recherché
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {offre.detailsSupplementaires.profil}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Processus de recrutement */}
              {offre.detailsSupplementaires?.processus && (
                <Card>
                  <CardHeader>
                    <CardTitle>Processus de recrutement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {offre.detailsSupplementaires.processus.map((etape, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground">{etape}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations clés */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations clés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Type de contrat</h4>
                    <p className="text-muted-foreground">{offre.type}</p>
                  </div>
                  {offre.experience && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Expérience</h4>
                      <p className="text-muted-foreground">{offre.experience}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Localisation</h4>
                    <p className="text-muted-foreground">{offre.lieu}</p>
                  </div>
                  {offre.salaire && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Rémunération</h4>
                      <p className="text-muted-foreground">{offre.salaire}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Compétences */}
              <Card>
                <CardHeader>
                  <CardTitle>Compétences requises</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {offre.competences.split(', ').map((competence, index) => (
                      <Badge key={index} variant="secondary">{competence}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Avantages */}
              {offre.detailsSupplementaires?.avantages && (
                <Card>
                  <CardHeader>
                    <CardTitle>Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {offre.detailsSupplementaires.avantages.map((avantage, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                          {avantage}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailOffre;