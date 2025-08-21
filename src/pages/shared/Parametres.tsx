import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  Download,
  Moon,
  Sun,
  Globe,
  Save,
  Info
} from "lucide-react";

const Parametres = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // État des paramètres
  const [notifications, setNotifications] = useState({
    email: true,
    nouvelleCandidature: true,
    rappelTest: true,
    resultatsTest: false,
    newsletter: false
  });
  
  const [preferences, setPreferences] = useState({
    theme: 'system', // 'light', 'dark', 'system'
    langue: 'fr',
    timezone: 'Europe/Paris'
  });
  
  const [confidentialite, setConfidentialite] = useState({
    profilPublic: false,
    partagerStatistiques: true,
    cookiesAnalytiques: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConfidentialiteChange = (key: string, value: boolean) => {
    setConfidentialite(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sauvegarder dans le localStorage
      const parametres = {
        notifications,
        preferences,
        confidentialite,
        userId: user?.id,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('parametres', JSON.stringify(parametres));
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences ont été mises à jour avec succès.",
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);

    try {
      // Simulation d'export des données
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Créer un fichier JSON avec les données utilisateur
      const userData = {
        profil: user,
        parametres: { notifications, preferences, confidentialite },
        dateExport: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `donnees-utilisateur-${user?.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export réussi",
        description: "Vos données ont été exportées avec succès.",
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'export des données.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Paramètres
            </h1>
            <p className="text-muted-foreground">
              Configurez vos préférences et gérez votre confidentialité
            </p>
          </div>

          <div className="space-y-8">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications importantes par email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Separator />

                {user?.role === 'recruteur' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Nouvelles candidatures</Label>
                        <p className="text-sm text-muted-foreground">
                          Être notifié lorsqu'un candidat postule à une offre
                        </p>
                      </div>
                      <Switch
                        checked={notifications.nouvelleCandidature}
                        onCheckedChange={(checked) => handleNotificationChange('nouvelleCandidature', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Résultats des tests</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification quand un candidat termine un test QCM
                        </p>
                      </div>
                      <Switch
                        checked={notifications.resultatsTest}
                        onCheckedChange={(checked) => handleNotificationChange('resultatsTest', checked)}
                      />
                    </div>
                  </>
                )}

                {user?.role === 'candidat' && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Rappels de test</Label>
                      <p className="text-sm text-muted-foreground">
                        Rappels pour passer les tests QCM en attente
                      </p>
                    </div>
                    <Switch
                      checked={notifications.rappelTest}
                      onCheckedChange={(checked) => handleNotificationChange('rappelTest', checked)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir les actualités et conseils de la plateforme
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Préférences d'affichage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" />
                  Préférences d'affichage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Thème</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Clair', icon: Sun },
                      { value: 'dark', label: 'Sombre', icon: Moon },
                      { value: 'system', label: 'Système', icon: Settings }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        className={`flex items-center justify-center space-x-2 p-3 rounded-md border-2 transition-colors ${
                          preferences.theme === value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handlePreferenceChange('theme', value)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base">Langue</Label>
                  <select
                    value={preferences.langue}
                    onChange={(e) => handlePreferenceChange('langue', e.target.value)}
                    className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Fuseau horaire</Label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Confidentialité et sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Confidentialité et sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Ces paramètres vous permettent de contrôler la visibilité de vos données 
                    et l'utilisation des cookies sur la plateforme.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profil public</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux recruteurs de voir votre profil dans les recherches
                    </p>
                  </div>
                  <Switch
                    checked={confidentialite.profilPublic}
                    onCheckedChange={(checked) => handleConfidentialiteChange('profilPublic', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Partager les statistiques anonymes</Label>
                    <p className="text-sm text-muted-foreground">
                      Aider à améliorer la plateforme en partageant des données anonymisées
                    </p>
                  </div>
                  <Switch
                    checked={confidentialite.partagerStatistiques}
                    onCheckedChange={(checked) => handleConfidentialiteChange('partagerStatistiques', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Cookies analytiques</Label>
                    <p className="text-sm text-muted-foreground">
                      Autoriser les cookies pour analyser l'utilisation du site
                    </p>
                  </div>
                  <Switch
                    checked={confidentialite.cookiesAnalytiques}
                    onCheckedChange={(checked) => handleConfidentialiteChange('cookiesAnalytiques', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Export des données */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Exporter mes données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Téléchargez une copie de toutes vos données stockées sur la plateforme 
                  au format JSON (RGPD).
                </p>
                <Button onClick={handleExportData} disabled={isLoading} variant="outline">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Export en cours...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Exporter mes données
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  "Sauvegarde..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les paramètres
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Parametres;