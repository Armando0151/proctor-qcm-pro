import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Shield, 
  Eye, 
  Mic, 
  Camera, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft 
} from "lucide-react";

const ConsentementRGPD = () => {
  const { offreId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [consentements, setConsentements] = useState({
    camera: false,
    micro: false,
    surveillance: false,
    donnees: false,
    conditions: false
  });

  const handleConsentementChange = (type: keyof typeof consentements) => {
    setConsentements(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const tousConsententsDonnes = Object.values(consentements).every(Boolean);

  const handleCommencerTest = () => {
    if (!tousConsententsDonnes) return;
    
    // Enregistrer les consentements
    const consentement = {
      candidatId: user?.id,
      offreId,
      consentements,
      dateConsentement: new Date().toISOString(),
      ipAddress: '192.168.1.1' // Simulation
    };
    
    const consentementsExistants = JSON.parse(localStorage.getItem('consentements_rgpd') || '[]');
    consentementsExistants.push(consentement);
    localStorage.setItem('consentements_rgpd', JSON.stringify(consentementsExistants));
    
    // Rediriger vers le test
    navigate(`/candidat/test/${offreId}`);
  };

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-gradient-hero py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Consentement RGPD
            </h1>
            <p className="text-white/80 text-lg">
              Conditions d'utilisation pour le test QCM surveillé
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span>Informations importantes sur la collecte de données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Collecte de données */}
              <Alert>
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  <strong>Surveillance par IA :</strong> Ce test utilise une technologie de surveillance par intelligence artificielle pour garantir l'intégrité de l'examen. Votre comportement sera analysé en temps réel.
                </AlertDescription>
              </Alert>

              {/* Données collectées */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-foreground">Données collectées pendant le test :</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <Camera className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Flux vidéo :</strong> Enregistrement de votre visage pour détecter les mouvements oculaires, les changements d'attention et la présence d'autres personnes.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mic className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Audio ambiant :</strong> Détection des conversations ou bruits suspects pouvant indiquer une aide extérieure.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Activité écran :</strong> Surveillance des changements de fenêtre, tentatives de copier-coller, et ouverture d'outils de développement.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Métadonnées :</strong> Horodatage, adresse IP, navigateur utilisé, et réponses au questionnaire.
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilisation des données */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Utilisation et conservation des données :</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Finalité :</strong> Vérification de l'intégrité du test et prévention de la fraude</li>
                  <li>• <strong>Durée de conservation :</strong> 12 mois après la fin du processus de recrutement</li>
                  <li>• <strong>Accès :</strong> Seuls le recruteur et notre équipe technique y ont accès</li>
                  <li>• <strong>Transfert :</strong> Aucun transfert vers des pays tiers</li>
                  <li>• <strong>Vos droits :</strong> Accès, rectification, suppression et portabilité de vos données</li>
                </ul>
              </div>

              {/* Consentements individuels */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Consentements requis :</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="camera"
                      checked={consentements.camera}
                      onCheckedChange={() => handleConsentementChange('camera')}
                    />
                    <label htmlFor="camera" className="text-sm font-medium cursor-pointer flex-1">
                      J'autorise l'activation de ma caméra pour la surveillance visuelle durant le test
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="micro"
                      checked={consentements.micro}
                      onCheckedChange={() => handleConsentementChange('micro')}
                    />
                    <label htmlFor="micro" className="text-sm font-medium cursor-pointer flex-1">
                      J'autorise l'activation de mon microphone pour la surveillance audio durant le test
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="surveillance"
                      checked={consentements.surveillance}
                      onCheckedChange={() => handleConsentementChange('surveillance')}
                    />
                    <label htmlFor="surveillance" className="text-sm font-medium cursor-pointer flex-1">
                      J'accepte que mes actions soient surveillées par IA (mouvements oculaires, changements de fenêtre, etc.)
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="donnees"
                      checked={consentements.donnees}
                      onCheckedChange={() => handleConsentementChange('donnees')}
                    />
                    <label htmlFor="donnees" className="text-sm font-medium cursor-pointer flex-1">
                      J'accepte que mes données personnelles soient collectées et traitées conformément au RGPD
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="conditions"
                      checked={consentements.conditions}
                      onCheckedChange={() => handleConsentementChange('conditions')}
                    />
                    <label htmlFor="conditions" className="text-sm font-medium cursor-pointer flex-1">
                      J'ai lu et j'accepte les conditions générales d'utilisation et la politique de confidentialité
                    </label>
                  </div>
                </div>
              </div>

              {/* Contact DPO */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Contact Délégué à la Protection des Données (DPO)</h4>
                <p className="text-sm text-blue-800">
                  Pour toute question relative au traitement de vos données personnelles : 
                  <br />
                  <strong>Email :</strong> dpo@proctorqcm.com
                  <br />
                  <strong>Adresse :</strong> ProctorQCM, 123 Rue de la Tech, 75001 Paris
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <Link to={`/candidat/offres/${offreId}`}>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'offre
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleCommencerTest}
                  disabled={!tousConsententsDonnes}
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {tousConsententsDonnes ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Commencer le test
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Accepter tous les consentements
                    </>
                  )}
                </Button>
              </div>

              {!tousConsententsDonnes && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Vous devez accepter tous les consentements pour pouvoir commencer le test QCM.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ConsentementRGPD;