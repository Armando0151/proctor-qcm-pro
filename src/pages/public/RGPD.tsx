import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const RGPD = () => {
  const { user, logout } = useAuth();

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Politique de Confidentialité RGPD
            </h1>
            <p className="text-muted-foreground text-lg">
              Protection et traitement de vos données personnelles
            </p>
          </div>

          {/* Navigation */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            {/* Responsable du traitement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Responsable du traitement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Société :</strong> ProctorQCM SAS</p>
                  <p><strong>Adresse :</strong> 123 Rue de la Tech, 75001 Paris, France</p>
                  <p><strong>Email :</strong> contact@proctorqcm.com</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                </div>
              </CardContent>
            </Card>

            {/* Données collectées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-primary" />
                  Données collectées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Données d'identification :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Nom, prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse postale</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Données de surveillance (pendant les tests) :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Flux vidéo de la caméra (analyse comportementale)</li>
                    <li>Audio ambiant du microphone</li>
                    <li>Mouvements de souris et clavier</li>
                    <li>Changements de fenêtre et applications ouvertes</li>
                    <li>Métadonnées techniques (IP, navigateur, résolution d'écran)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Données de candidature :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>CV et lettres de motivation</li>
                    <li>Réponses aux questionnaires</li>
                    <li>Scores et résultats des tests</li>
                    <li>Historique des candidatures</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Finalités du traitement */}
            <Card>
              <CardHeader>
                <CardTitle>Finalités du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Gestion des candidatures :</strong> Traitement et suivi des candidatures, organisation des entretiens
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Surveillance anti-triche :</strong> Garantir l'intégrité des tests QCM par analyse comportementale IA
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Amélioration du service :</strong> Analyse des performances et optimisation de la plateforme
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Obligations légales :</strong> Respect des réglementations en vigueur
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Base légale */}
            <Card>
              <CardHeader>
                <CardTitle>Base légale du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p><strong>Consentement explicite</strong> pour la surveillance par IA pendant les tests</p>
                  <p><strong>Intérêt légitime</strong> pour la gestion des candidatures et la prévention de la fraude</p>
                  <p><strong>Exécution d'un contrat</strong> pour les prestations de service</p>
                  <p><strong>Obligation légale</strong> pour la conservation de certaines données</p>
                </div>
              </CardContent>
            </Card>

            {/* Durée de conservation */}
            <Card>
              <CardHeader>
                <CardTitle>Durée de conservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">Données de candidature</h4>
                      <p className="text-sm text-muted-foreground">24 mois après fin du processus</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">Données de surveillance</h4>
                      <p className="text-sm text-muted-foreground">12 mois après le test</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">Comptes utilisateurs</h4>
                      <p className="text-sm text-muted-foreground">3 ans après dernière connexion</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">Logs techniques</h4>
                      <p className="text-sm text-muted-foreground">6 mois maximum</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vos droits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  Vos droits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit d'accès</h4>
                      <p className="text-xs text-muted-foreground">Obtenir une copie de vos données</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit de rectification</h4>
                      <p className="text-xs text-muted-foreground">Corriger des données inexactes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit à l'effacement</h4>
                      <p className="text-xs text-muted-foreground">Supprimer vos données personnelles</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit à la limitation</h4>
                      <p className="text-xs text-muted-foreground">Limiter le traitement de vos données</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit à la portabilité</h4>
                      <p className="text-xs text-muted-foreground">Récupérer vos données dans un format standard</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit d'opposition</h4>
                      <p className="text-xs text-muted-foreground">S'opposer au traitement pour intérêt légitime</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Retrait du consentement</h4>
                      <p className="text-xs text-muted-foreground">Retirer votre consentement à tout moment</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Droit de réclamation</h4>
                      <p className="text-xs text-muted-foreground">Saisir la CNIL en cas de problème</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact DPO */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Délégué à la Protection des Données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-2">
                    Pour exercer vos droits ou pour toute question relative au traitement de vos données :
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email :</strong> dpo@proctorqcm.com</p>
                    <p><strong>Courrier :</strong> DPO - ProctorQCM, 123 Rue de la Tech, 75001 Paris</p>
                    <p><strong>Délai de réponse :</strong> 30 jours maximum</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle>Sécurité des données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• <strong>Chiffrement :</strong> Toutes les données sont chiffrées en transit (TLS) et au repos (AES-256)</p>
                  <p>• <strong>Accès :</strong> Contrôle d'accès strict avec authentification forte</p>
                  <p>• <strong>Surveillance :</strong> Monitoring 24/7 des systèmes et détection d'intrusion</p>
                  <p>• <strong>Sauvegardes :</strong> Sauvegardes automatiques et chiffrées</p>
                  <p>• <strong>Audit :</strong> Audits de sécurité réguliers par des tiers</p>
                </div>
              </CardContent>
            </Card>

            {/* Mise à jour */}
            <Card>
              <CardHeader>
                <CardTitle>Mise à jour de cette politique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cette politique de confidentialité peut être mise à jour périodiquement. 
                  La date de dernière modification est indiquée ci-dessous. 
                  Nous vous informerons de tout changement significatif par email.
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RGPD;