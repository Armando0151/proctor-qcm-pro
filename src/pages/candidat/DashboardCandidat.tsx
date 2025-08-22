import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Briefcase, 
  ClipboardList, 
  TrendingUp,
  Clock,
  CheckCircle,
  Play,
  Award,
  Target,
  Eye
} from "lucide-react";

const DashboardCandidat = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: "Candidatures",
      value: "8",
      description: "Offres postulées",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      title: "Tests passés",
      value: "5",
      description: "Tests terminés",
      icon: ClipboardList,
      color: "text-success"
    },
    {
      title: "Score moyen",
      value: "82%",
      description: "Vos performances",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      title: "En attente",
      value: "3",
      description: "Tests à passer",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const availableJobs = [
    {
      id: 1,
      title: "Développeur React Senior",
      company: "TechCorp",
      location: "Paris",
      type: "CDI",
      hasTest: true,
      testStatus: "not_started",
      posted: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Designer UX/UI",
      company: "Design Studio",
      location: "Lyon",
      type: "CDI",
      hasTest: true,
      testStatus: "not_started",
      posted: "Il y a 3 jours"
    },
    {
      id: 3,
      title: "Chef de Projet Digital",
      company: "Digital Agency",
      location: "Remote",
      type: "CDI",
      hasTest: false,
      testStatus: null,
      posted: "Il y a 1 semaine"
    }
  ];

  const testHistory = [
    {
      id: 1,
      jobTitle: "Développeur Frontend",
      company: "WebTech",
      score: 88,
      status: "passed",
      date: "15 Nov 2024",
      credibilityScore: 95
    },
    {
      id: 2,
      jobTitle: "Analyste Data",
      company: "DataCorp",
      score: 76,
      status: "passed",
      date: "12 Nov 2024",
      credibilityScore: 92
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      score: 65,
      status: "failed",
      date: "8 Nov 2024",
      credibilityScore: 88
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
                  Bonjour, {user?.name} 👋
                </h1>
                <p className="text-white/80 text-lg">
                  Découvrez les nouvelles opportunités qui vous attendent
                </p>
              </div>
              <div className="hidden md:block">
                <Link to="/candidat/offres">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Eye className="mr-2 h-5 w-5" />
                    Voir toutes les offres
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
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stat.description}
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available Jobs */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    Offres disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {job.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-muted-foreground">
                            {job.posted}
                          </span>
                          {job.hasTest && (
                            <Badge variant="outline" className="text-xs">
                              <ClipboardList className="mr-1 h-3 w-3" />
                              Test requis
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/candidat/offres/${job.id}`}>
                              Voir détails
                            </Link>
                          </Button>
                          {job.hasTest && job.testStatus === 'not_started' ? (
                            <Button size="sm" asChild>
                              <Link to={`/consentement/${job.id}`}>
                                <Play className="mr-1 h-3 w-3" />
                                Passer le test
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" asChild>
                              <Link to={`/consentement/${job.id}`}>
                                Postuler
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Link to="/candidat/offres">
                      <Button variant="outline">
                        Voir toutes les offres
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test History */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Historique des tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testHistory.map((test) => (
                    <div key={test.id} className="p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {test.jobTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {test.company}
                          </p>
                        </div>
                        <Badge 
                          variant={test.status === 'passed' ? 'default' : 'destructive'}
                          className={test.status === 'passed' ? 'bg-success' : ''}
                        >
                          {test.status === 'passed' ? (
                            <>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Réussi
                            </>
                          ) : (
                            'Échoué'
                          )}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">
                            Score: <span className="font-semibold text-foreground">{test.score}%</span>
                          </span>
                          <span className="text-muted-foreground">
                            Crédibilité: <span className="font-semibold text-success">{test.credibilityScore}%</span>
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {test.date}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Link to="/candidat/resultats">
                      <Button variant="outline">
                        <Target className="mr-2 h-4 w-4" />
                        Voir tous les résultats
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Action Button */}
          <div className="md:hidden mt-8">
            <Link to="/candidat/offres">
              <Button className="w-full" size="lg">
                <Eye className="mr-2 h-5 w-5" />
                Voir toutes les offres
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardCandidat;