import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Briefcase, 
  Users, 
  ClipboardList, 
  TrendingUp,
  PlusCircle,
  Eye,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";

const DashboardRecruteur = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: "Offres publiées",
      value: "12",
      change: "+2 ce mois",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      title: "Candidats inscrits",
      value: "248",
      change: "+15 cette semaine",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Tests passés",
      value: "156",
      change: "+24 aujourd'hui",
      icon: ClipboardList,
      color: "text-warning"
    },
    {
      title: "Score moyen",
      value: "78%",
      change: "+5% vs mois dernier",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  const recentActivities = [
    {
      type: "test",
      message: "Nouveau test passé par Marie Dupont",
      time: "Il y a 5 minutes",
      icon: ClipboardList,
      status: "success"
    },
    {
      type: "candidat",
      message: "Nouvelle candidature pour 'Développeur React'",
      time: "Il y a 12 minutes",
      icon: Users,
      status: "info"
    },
    {
      type: "offre",
      message: "Offre 'Designer UX' publiée avec succès",
      time: "Il y a 1 heure",
      icon: Briefcase,
      status: "success"
    },
    {
      type: "alert",
      message: "Anomalie détectée dans un test en cours",
      time: "Il y a 2 heures",
      icon: AlertCircle,
      status: "warning"
    }
  ];

  const quickActions = [
    {
      title: "Créer une offre",
      description: "Publier une nouvelle offre d'emploi",
      icon: PlusCircle,
      href: "/recruteur/creer-offre",
      variant: "default" as const
    },
    {
      title: "Voir les résultats",
      description: "Consulter les résultats des tests",
      icon: BarChart3,
      href: "/recruteur/resultats",
      variant: "outline" as const
    },
    {
      title: "Gérer les offres",
      description: "Modifier vos offres existantes",
      icon: Eye,
      href: "/recruteur/offres",
      variant: "secondary" as const
    }
  ];

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Bienvenue, {user?.name} 👋
                </h1>
                <p className="text-white/80 text-lg">
                  Voici un aperçu de votre activité de recrutement
                </p>
              </div>
              <div className="hidden md:block">
                <Link to="/recruteur/creer-offre">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Nouvelle offre
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <p className="text-xs text-success">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5 text-primary" />
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link key={index} to={action.href}>
                        <div className="flex items-center p-4 rounded-lg border border-border hover:bg-accent hover:shadow-card transition-all duration-200 group">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                              <Icon className="h-5 w-5 text-primary group-hover:text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'success' ? 'bg-success/10 text-success' :
                            activity.status === 'warning' ? 'bg-warning/10 text-warning' :
                            'bg-primary/10 text-primary'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">
                              {activity.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Quick Action */}
          <div className="md:hidden mt-8">
            <Link to="/recruteur/creer-offre">
              <Button className="w-full" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Créer une nouvelle offre
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardRecruteur;