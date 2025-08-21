import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Send,
  CheckCircle,
  Building,
  MapPin,
  Calendar
} from "lucide-react";

interface Offre {
  id: number;
  titre: string;
  company: string;
  type: string;
  lieu: string;
  dateCreation: string;
}

const PostulerOffre = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [offre, setOffre] = useState<Offre | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    telephone: "",
    adresse: "",
    lettreMotivation: "",
    cv: null as File | null,
    lettreMotivationFile: null as File | null,
    salaireSouhaite: "",
    disponibilite: "",
    experience: ""
  });

  useEffect(() => {
    // Récupérer les détails de l'offre
    const offreDetail: Offre = {
      id: parseInt(id || '1'),
      titre: "Développeur React Senior",
      company: "TechCorp",
      type: "CDI",
      lieu: "Paris / Hybride",
      dateCreation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    };
    setOffre(offreDetail);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'envoi de candidature
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sauvegarder la candidature
      const candidatures = JSON.parse(localStorage.getItem('candidatures') || '[]');
      const nouvelleCandidature = {
        id: Date.now(),
        offreId: offre?.id,
        candidatId: user?.id,
        ...formData,
        datePostulation: new Date().toISOString(),
        statut: 'en_attente'
      };
      
      candidatures.push(nouvelleCandidature);
      localStorage.setItem('candidatures', JSON.stringify(candidatures));
      
      toast({
        title: "Candidature envoyée !",
        description: "Votre candidature a été envoyée avec succès. Vous recevrez une réponse sous 48h.",
      });
      
      setIsSubmitted(true);
      
      // Redirection après 3 secondes
      setTimeout(() => {
        navigate('/candidat/offres');
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (isSubmitted) {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Candidature envoyée !</h3>
                <p className="text-muted-foreground mb-4">
                  Votre candidature pour le poste <strong>{offre?.titre}</strong> chez {offre?.company} a été envoyée avec succès.
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous allez être redirigé vers la liste des offres...
                </p>
              </div>
              <Link to="/candidat/offres">
                <Button className="w-full">
                  Retour aux offres
                </Button>
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
            <Link to={`/candidat/offres/${id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'offre
              </Button>
            </Link>
          </div>

          {/* Informations de l'offre */}
          {offre && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Postuler pour : {offre.titre}
                  </h1>
                  <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {offre.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {offre.lieu}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(offre.dateCreation)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input
                      id="nom"
                      value={user?.name || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaireSouhaite">Salaire souhaité</Label>
                    <Input
                      id="salaireSouhaite"
                      name="salaireSouhaite"
                      placeholder="Ex: 45-50k€, À négocier"
                      value={formData.salaireSouhaite}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse complète</Label>
                  <Input
                    id="adresse"
                    name="adresse"
                    placeholder="123 rue de la Paix, 75001 Paris"
                    value={formData.adresse}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="disponibilite">Disponibilité</Label>
                    <Input
                      id="disponibilite"
                      name="disponibilite"
                      placeholder="Ex: Immédiate, Dans 2 semaines, 1 mois de préavis"
                      value={formData.disponibilite}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'expérience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="Ex: 3 ans, Junior, Senior"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cv">CV * (PDF, DOC, DOCX)</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'cv')}
                        required
                        className="flex-1"
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {formData.cv && (
                      <p className="text-sm text-success">
                        ✓ {formData.cv.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lettreMotivationFile">Lettre de motivation (PDF, DOC, DOCX)</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        id="lettreMotivationFile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'lettreMotivationFile')}
                        className="flex-1"
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {formData.lettreMotivationFile && (
                      <p className="text-sm text-success">
                        ✓ {formData.lettreMotivationFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lettre de motivation */}
            <Card>
              <CardHeader>
                <CardTitle>Lettre de motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="lettreMotivation">
                    Présentez-vous et expliquez votre motivation pour ce poste *
                  </Label>
                  <Textarea
                    id="lettreMotivation"
                    name="lettreMotivation"
                    placeholder="Expliquez pourquoi vous êtes intéressé(e) par ce poste et ce que vous pourrez apporter à l'entreprise..."
                    value={formData.lettreMotivation}
                    onChange={handleInputChange}
                    rows={8}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 100 caractères recommandés
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <Link to={`/candidat/offres/${id}`}>
                <Button variant="outline" type="button">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma candidature
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PostulerOffre;