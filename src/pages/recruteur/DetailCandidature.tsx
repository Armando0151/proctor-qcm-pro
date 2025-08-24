import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Award,
  FileText,
  Download,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Briefcase,
  GraduationCap,
  MessageSquare
} from "lucide-react";

interface CandidatureDetail {
  id: string;
  candidatId: string;
  candidatNom: string;
  candidatEmail: string;
  candidatTelephone: string;
  candidatAdresse: string;
  datePostulation: string;
  statut: 'en_attente' | 'accepte' | 'refuse' | 'entretien';
  
  // Offre
  offreId: string;
  offreTitre: string;
  offreCompany: string;
  
  // Documents
  cvUrl?: string;
  lettreMotivationUrl?: string;
  lettreMotivationTexte: string;
  
  // Expérience et compétences
  experience: string;
  competences: string[];
  formation: string;
  langues: string[];
  
  // Test et évaluation
  noteTest?: number;
  detailsTest?: {
    tempsTotal: number;
    bonnesReponses: number;
    totalQuestions: number;
    datePassage: string;
  };
  
  // Entretien
  dateEntretien?: string;
  noteEntretien?: number;
  commentairesEntretien?: string;
  
  // RH
  commentairesRH?: string;
  evaluationGlobale?: number;
  recommandation?: 'recommande' | 'mitige' | 'non_recommande';
}

const DetailCandidature = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [candidature, setCandidature] = useState<CandidatureDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentairesRH, setCommentairesRH] = useState("");
  const [evaluationGlobale, setEvaluationGlobale] = useState("");
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    // Simulation de récupération des données
    setTimeout(() => {
      const mockCandidature: CandidatureDetail = {
        id: id || "1",
        candidatId: "c1",
        candidatNom: "Marie Dubois",
        candidatEmail: "marie.dubois@email.com",
        candidatTelephone: "06 12 34 56 78",
        candidatAdresse: "123 rue de la Paix, 75001 Paris",
        datePostulation: "2024-01-15T10:30:00Z",
        statut: "en_attente",
        
        offreId: "1",
        offreTitre: "Développeur React Senior",
        offreCompany: "TechCorp",
        
        cvUrl: "/documents/cv-marie-dubois.pdf",
        lettreMotivationUrl: "/documents/lettre-marie-dubois.pdf",
        lettreMotivationTexte: `Madame, Monsieur,

Je vous écris pour exprimer mon vif intérêt pour le poste de Développeur React Senior au sein de votre entreprise TechCorp.

Fort de mes 5 années d'expérience en développement front-end, j'ai eu l'occasion de travailler sur de nombreux projets utilisant React, TypeScript et Node.js. Mon expertise technique, combinée à ma passion pour le développement d'interfaces utilisateur innovantes, me permet de créer des applications web performantes et intuitives.

Ce qui m'attire particulièrement dans ce poste, c'est la possibilité de travailler sur des projets à la pointe de la technologie et de contribuer à l'innovation de votre équipe. Votre réputation d'excellence et votre engagement envers les nouvelles technologies correspondent parfaitement à mes aspirations professionnelles.

Je serais ravi de discuter plus en détail de ma candidature lors d'un entretien.

Cordialement,
Marie Dubois`,
        
        experience: "5 ans",
        competences: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Git", "Jest"],
        formation: "Master en Informatique - École Centrale Paris",
        langues: ["Français (natif)", "Anglais (courant)", "Espagnol (intermédiaire)"],
        
        noteTest: 85,
        detailsTest: {
          tempsTotal: 45,
          bonnesReponses: 17,
          totalQuestions: 20,
          datePassage: "2024-01-16T14:30:00Z"
        },
        
        commentairesRH: "Candidate très prometteuse avec un excellent profil technique.",
        evaluationGlobale: 4,
        recommandation: "recommande"
      };
      
      setCandidature(mockCandidature);
      setCommentairesRH(mockCandidature.commentairesRH || "");
      setEvaluationGlobale(mockCandidature.evaluationGlobale?.toString() || "");
      setRecommendation(mockCandidature.recommandation || "");
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusChange = (newStatus: CandidatureDetail['statut']) => {
    if (candidature) {
      setCandidature({ ...candidature, statut: newStatus });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la candidature a été modifié avec succès.",
      });
    }
  };

  const handleSaveEvaluation = () => {
    if (candidature) {
      setCandidature({
        ...candidature,
        commentairesRH: commentairesRH,
        evaluationGlobale: parseInt(evaluationGlobale) || undefined,
        recommandation: recommendation as CandidatureDetail['recommandation']
      });
      
      toast({
        title: "Évaluation sauvegardée",
        description: "L'évaluation a été enregistrée avec succès.",
      });
    }
  };

  const scheduleInterview = () => {
    // Simulation de planification d'entretien
    toast({
      title: "Entretien programmé",
      description: "Un email de confirmation a été envoyé au candidat.",
    });
  };

  const sendEmail = () => {
    // Simulation d'envoi d'email
    window.open(`mailto:${candidature?.candidatEmail}`, '_blank');
  };

  const getStatusBadge = (statut: CandidatureDetail['statut']) => {
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

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'recommande':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Recommandé</Badge>;
      case 'mitige':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Mitigé</Badge>;
      case 'non_recommande':
        return <Badge variant="destructive">Non recommandé</Badge>;
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
            <p className="text-muted-foreground">Chargement de la candidature...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!candidature) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-lg font-semibold mb-2">Candidature introuvable</h3>
              <p className="text-muted-foreground mb-4">Cette candidature n'existe pas ou a été supprimée.</p>
              <Link to="/recruteur/gestion-candidatures">
                <Button>Retour aux candidatures</Button>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/recruteur/gestion-candidatures">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux candidatures
              </Button>
            </Link>
            {getStatusBadge(candidature.statut)}
          </div>

          {/* Candidat Info Header */}
          <Card className="mb-8">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {candidature.candidatNom}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Candidature pour: {candidature.offreTitre}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chez {candidature.offreCompany}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                  <Button onClick={sendEmail} variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contacter
                  </Button>
                  <Button onClick={scheduleInterview} variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Planifier entretien
                  </Button>
                  <Select value={candidature.statut} onValueChange={handleStatusChange}>
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
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {candidature.candidatEmail}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  {candidature.candidatTelephone}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Postulé le {new Date(candidature.datePostulation).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="motivation">Motivation</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="evaluation">Évaluation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Informations personnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Adresse</Label>
                      <p className="text-muted-foreground">{candidature.candidatAdresse}</p>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Langues</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {candidature.langues.map((langue, index) => (
                          <Badge key={index} variant="secondary">{langue}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expérience et formation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Expérience & Formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Expérience</Label>
                      <p className="text-muted-foreground">{candidature.experience}</p>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Formation</Label>
                      <p className="text-muted-foreground">{candidature.formation}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Compétences */}
              <Card>
                <CardHeader>
                  <CardTitle>Compétences techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidature.competences.map((competence, index) => (
                      <Badge key={index} variant="outline">{competence}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="motivation">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Lettre de motivation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg">
                    {candidature.lettreMotivationTexte}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test">
              {candidature.detailsTest ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Résultats du test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {candidature.noteTest}/100
                        </div>
                        <p className="text-sm text-muted-foreground">Note globale</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {candidature.detailsTest.bonnesReponses}/{candidature.detailsTest.totalQuestions}
                        </div>
                        <p className="text-sm text-muted-foreground">Bonnes réponses</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {candidature.detailsTest.tempsTotal}min
                        </div>
                        <p className="text-sm text-muted-foreground">Temps total</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {Math.round((candidature.detailsTest.bonnesReponses / candidature.detailsTest.totalQuestions) * 100)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Taux de réussite</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Test passé le {new Date(candidature.detailsTest.datePassage).toLocaleDateString('fr-FR')} 
                        à {new Date(candidature.detailsTest.datePassage).toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-8 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun test passé</h3>
                    <p className="text-muted-foreground">Ce candidat n'a pas encore passé de test.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidature.cvUrl && (
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="mr-3 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">CV - {candidature.candidatNom}</p>
                            <p className="text-sm text-muted-foreground">Document PDF</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(candidature.cvUrl, '_blank')}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </div>
                    )}
                    
                    {candidature.lettreMotivationUrl && (
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="mr-3 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Lettre de motivation</p>
                            <p className="text-sm text-muted-foreground">Document PDF</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(candidature.lettreMotivationUrl, '_blank')}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation">
              <div className="space-y-6">
                {/* Évaluation actuelle */}
                {candidature.evaluationGlobale && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Évaluation actuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= candidature.evaluationGlobale!
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold">
                            {candidature.evaluationGlobale}/5
                          </span>
                        </div>
                        {candidature.recommandation && getRecommendationBadge(candidature.recommandation)}
                      </div>
                      
                      {candidature.commentairesRH && (
                        <div className="bg-muted/20 p-4 rounded-lg">
                          <p className="text-muted-foreground">{candidature.commentairesRH}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Nouvelle évaluation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Évaluer cette candidature</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="evaluation-globale">Évaluation globale (1-5 étoiles)</Label>
                      <Select value={evaluationGlobale} onValueChange={setEvaluationGlobale}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une note" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 étoile - Très faible</SelectItem>
                          <SelectItem value="2">2 étoiles - Faible</SelectItem>
                          <SelectItem value="3">3 étoiles - Moyen</SelectItem>
                          <SelectItem value="4">4 étoiles - Bon</SelectItem>
                          <SelectItem value="5">5 étoiles - Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="recommendation">Recommandation</Label>
                      <Select value={recommendation} onValueChange={setRecommendation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Votre recommandation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommande">Recommandé</SelectItem>
                          <SelectItem value="mitige">Mitigé</SelectItem>
                          <SelectItem value="non_recommande">Non recommandé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="commentaires-rh">Commentaires RH</Label>
                      <Textarea
                        id="commentaires-rh"
                        placeholder="Ajoutez vos commentaires et observations..."
                        value={commentairesRH}
                        onChange={(e) => setCommentairesRH(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <Button onClick={handleSaveEvaluation} className="w-full">
                      Sauvegarder l'évaluation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DetailCandidature;