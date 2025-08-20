import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection } from "@/components/ui/hero-section";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Shield, 
  Brain, 
  Users, 
  CheckCircle, 
  Eye, 
  Award,
  ArrowRight,
  TrendingUp,
  Lock,
  Zap
} from "lucide-react";

const Index = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      icon: Shield,
      title: "Surveillance IA Avancée",
      description: "Détection en temps réel des tentatives de triche grâce à l'intelligence artificielle."
    },
    {
      icon: Brain,
      title: "QCM Intelligents",
      description: "Création et gestion de questionnaires adaptatifs et personnalisés."
    },
    {
      icon: Eye,
      title: "Proctoring Automatique",
      description: "Surveillance automatisée par caméra et analyse comportementale."
    },
    {
      icon: TrendingUp,
      title: "Analytics Complets",
      description: "Tableaux de bord détaillés et rapports de performance."
    },
    {
      icon: Lock,
      title: "Sécurité Maximale",
      description: "Chiffrement des données et conformité RGPD."
    },
    {
      icon: Zap,
      title: "Résultats Instantanés",
      description: "Correction automatique et notation en temps réel."
    }
  ];

  const stats = [
    { number: "99.9%", label: "Fiabilité" },
    { number: "50ms", label: "Temps de réponse" },
    { number: "24/7", label: "Disponibilité" },
    { number: "RGPD", label: "Conformité" }
  ];

  return (
    <Layout user={user} onLogout={logout}>
      {/* Hero Section */}
      <HeroSection variant="gradient" className="py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Recrutement Intelligent
              <br />
              <span className="text-white/90">avec Surveillance IA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
              La première plateforme de recrutement avec tests QCM surveillés par intelligence artificielle. 
              Sécurisez vos évaluations et trouvez les meilleurs talents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!user ? (
                <>
                  <Link to="/register">
                    <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                      Commencer gratuitement
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                      Se connecter
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to={user.role === 'recruteur' ? '/recruteur/dashboard' : '/candidat/dashboard'}>
                  <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                    Accéder au dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une suite complète d'outils pour révolutionner vos processus de recrutement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 bg-gradient-card border-0"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Prêt à révolutionner votre recrutement ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez les entreprises qui font confiance à ProctorQCM pour leurs évaluations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <span>Configuration en 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <span>Essai gratuit</span>
            </div>
          </div>
          
          {!user && (
            <div className="mt-8">
              <Link to="/register">
                <Button variant="premium" size="xl">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-bold">ProctorQCM</span>
              </div>
              <p className="text-primary-foreground/80 max-w-md">
                La plateforme de recrutement nouvelle génération avec surveillance IA intégrée.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Sécurité</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Confidentialité</li>
                <li>CGU</li>
                <li>RGPD</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 ProctorQCM. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
