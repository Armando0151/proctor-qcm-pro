import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CGU = () => {
  const { user, logout } = useAuth();

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-muted-foreground text-lg">
              Modalités d'utilisation de la plateforme ProctorQCM
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
            {/* Informations légales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="mr-2 h-5 w-5 text-primary" />
                  Informations légales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Éditeur :</strong> ProctorQCM SAS</p>
                  <p><strong>Capital social :</strong> 100 000 €</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  <p><strong>RCS :</strong> Paris B 123 456 789</p>
                  <p><strong>TVA Intracommunautaire :</strong> FR12345678901</p>
                  <p><strong>Adresse :</strong> 123 Rue de la Tech, 75001 Paris, France</p>
                  <p><strong>Directeur de publication :</strong> Jean Dupont</p>
                  <p><strong>Hébergeur :</strong> OVH SAS, 2 rue Kellermann, 59100 Roubaix</p>
                </div>
              </CardContent>
            </Card>

            {/* Objet et champ d'application */}
            <Card>
              <CardHeader>
                <CardTitle>1. Objet et champ d'application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme ProctorQCM, 
                  service de tests QCM en ligne avec surveillance par intelligence artificielle.
                </p>
                <p className="text-sm">
                  L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.
                </p>
              </CardContent>
            </Card>

            {/* Définitions */}
            <Card>
              <CardHeader>
                <CardTitle>2. Définitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <strong className="text-sm">Plateforme :</strong>
                    <p className="text-sm text-muted-foreground">Le site web ProctorQCM et l'ensemble de ses fonctionnalités</p>
                  </div>
                  <div>
                    <strong className="text-sm">Utilisateur :</strong>
                    <p className="text-sm text-muted-foreground">Toute personne physique utilisant la plateforme</p>
                  </div>
                  <div>
                    <strong className="text-sm">Recruteur :</strong>
                    <p className="text-sm text-muted-foreground">Utilisateur créant et gérant des offres d'emploi et tests</p>
                  </div>
                  <div>
                    <strong className="text-sm">Candidat :</strong>
                    <p className="text-sm text-muted-foreground">Utilisateur postulant aux offres et passant les tests</p>
                  </div>
                  <div>
                    <strong className="text-sm">Surveillance IA :</strong>
                    <p className="text-sm text-muted-foreground">Système de surveillance automatisé par intelligence artificielle pendant les tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accès aux services */}
            <Card>
              <CardHeader>
                <CardTitle>3. Accès aux services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">3.1 Conditions d'accès</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Être âgé de 16 ans minimum</li>
                    <li>Disposer d'un accès internet stable</li>
                    <li>Utiliser un navigateur web récent et compatible</li>
                    <li>Autoriser l'accès à la caméra et au microphone pour les tests surveillés</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">3.2 Création de compte</h4>
                  <p className="text-sm text-muted-foreground">
                    L'inscription est gratuite et nécessite la fourniture d'informations exactes et à jour. 
                    Vous vous engagez à maintenir la confidentialité de vos identifiants.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Utilisation de la plateforme */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                  4. Utilisation de la plateforme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">4.1 Utilisation autorisée</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Utilisation conforme aux finalités du service</li>
                    <li>Respect des droits de propriété intellectuelle</li>
                    <li>Fourniture d'informations exactes et véridiques</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">4.2 Utilisation interdite</h4>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                      <li>Tentative de contournement de la surveillance IA</li>
                      <li>Utilisation de logiciels de triche ou d'aide externe</li>
                      <li>Partage des questions ou réponses des tests</li>
                      <li>Création de faux comptes ou usurpation d'identité</li>
                      <li>Attaques informatiques ou tentatives de piratage</li>
                      <li>Diffusion de contenu illégal ou diffamatoire</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Surveillance par IA */}
            <Card>
              <CardHeader>
                <CardTitle>5. Surveillance par Intelligence Artificielle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-sm mb-2 text-blue-900">5.1 Principe</h4>
                  <p className="text-sm text-blue-800">
                    Les tests QCM sont surveillés par un système d'intelligence artificielle pour garantir leur intégrité. 
                    Cette surveillance inclut l'analyse vidéo, audio et comportementale en temps réel.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">5.2 Données analysées</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Mouvements oculaires et direction du regard</li>
                    <li>Présence d'autres personnes dans la pièce</li>
                    <li>Changements de fenêtre ou applications</li>
                    <li>Bruits suspects ou conversations</li>
                    <li>Tentatives de copier-coller</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">5.3 Conséquences des anomalies</h4>
                  <p className="text-sm text-muted-foreground">
                    Toute anomalie détectée peut entraîner l'invalidation du test et l'exclusion du processus de recrutement. 
                    Les données de surveillance sont conservées à des fins probatoires.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Responsabilités */}
            <Card>
              <CardHeader>
                <CardTitle>6. Responsabilités</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">6.1 Responsabilité de ProctorQCM</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Assurer la disponibilité de la plateforme dans la mesure du possible</li>
                    <li>Protéger les données personnelles conformément au RGPD</li>
                    <li>Maintenir la confidentialité des tests et résultats</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">6.2 Responsabilité des utilisateurs</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Utilisation loyale et conforme de la plateforme</li>
                    <li>Exactitude des informations fournies</li>
                    <li>Respect de la confidentialité des tests</li>
                    <li>Configuration technique appropriée</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card>
              <CardHeader>
                <CardTitle>7. Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  L'ensemble du contenu de la plateforme (textes, images, logos, algorithmes IA) est protégé par le droit d'auteur 
                  et appartient à ProctorQCM ou à ses partenaires.
                </p>
                <p className="text-sm text-muted-foreground">
                  Toute reproduction, représentation ou diffusion non autorisée est interdite et pourra faire l'objet de poursuites.
                </p>
              </CardContent>
            </Card>

            {/* Suspension et résiliation */}
            <Card>
              <CardHeader>
                <CardTitle>8. Suspension et résiliation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  ProctorQCM se réserve le droit de suspendre ou résilier l'accès à la plateforme en cas de :
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Non-respect des présentes CGU</li>
                  <li>Tentative de fraude ou de triche</li>
                  <li>Comportement nuisant au bon fonctionnement du service</li>
                  <li>Inactivité prolongée du compte</li>
                </ul>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardHeader>
                <CardTitle>9. Modifications des CGU</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  ProctorQCM se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les modifications prennent effet dès leur publication sur la plateforme. 
                  Il est recommandé de consulter régulièrement cette page.
                </p>
              </CardContent>
            </Card>

            {/* Droit applicable */}
            <Card>
              <CardHeader>
                <CardTitle>10. Droit applicable et litiges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Les présentes CGU sont soumises au droit français. 
                  En cas de litige, une solution amiable sera recherchée en priorité.
                </p>
                <p className="text-sm text-muted-foreground">
                  À défaut d'accord, les tribunaux de Paris seront seuls compétents.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-800 mb-2">
                    Pour toute question relative aux présentes CGU :
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email :</strong> support@proctorqcm.com</p>
                    <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                    <p><strong>Courrier :</strong> Support CGU - ProctorQCM, 123 Rue de la Tech, 75001 Paris</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date */}
            <Card>
              <CardHeader>
                <CardTitle>Date d'entrée en vigueur</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Version :</strong> 1.0<br />
                  <strong>Date d'entrée en vigueur :</strong> {new Date().toLocaleDateString('fr-FR')}<br />
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

export default CGU;