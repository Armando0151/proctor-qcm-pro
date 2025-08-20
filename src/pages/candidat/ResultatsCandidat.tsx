import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Award, 
  Calendar, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  TrendingUp
} from "lucide-react";

interface MonResultat {
  offreId: string;
  offreTitre?: string;
  score: number;
  scoreCredibilite: number;
  tempsTotal: number;
  dateTest: string;
  statut: 'termine' | 'en_cours' | 'abandonne';
  anomalies: string[];
}

const ResultatsCandidat = () => {
  const { user, logout } = useAuth();
  const [resultats, setResultats] = useState<MonResultat[]>([]);
  const [filtreStatut, setFiltreStatut] = useState("tous");

  useEffect(() => {
    // Charger les résultats depuis le localStorage
    const resultatsStockes = localStorage.getItem('mesResultats');
    if (resultatsStockes) {
      const resultatsData = JSON.parse(resultatsStockes);
      // Ajouter les titres d'offres (simulation)
      const resultatsAvecTitres = resultatsData.map((resultat: MonResultat) => ({
        ...resultat,
        offreTitre: getOffreTitre(resultat.offreId)
      }));
      setResultats(resultatsAvecTitres);
    } else {
      // Données de démonstration
      const resultatsDemo: MonResultat[] = [
        {
          offreId: "1",
          offreTitre: "Développeur React Senior",
          score: 88,
          scoreCredibilite: 95,
          tempsTotal: 1245,
          dateTest: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "termine",
          anomalies: []
        },
        {
          offreId: "2",
          offreTitre: "Designer UX/UI",
          score: 76,
          scoreCredibilite: 82,
          tempsTotal: 1680,
          dateTest: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "termine",
          anomalies: ["Regard ailleurs détecté", "Perte de focus (1x)"]
        },
        {
          offreId: "4",
          offreTitre: "Développeur Full Stack",
          score: 92,
          scoreCredibilite: 98,
          tempsTotal: 1120,
          dateTest: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          statut: "termine",
          anomalies: []
        }
      ];
      setResultats(resultatsDemo);
    }
  }, []);

  const getOffreTitre = (offreId: string) => {
    const titres: { [key: string]: string } = {
      "1": "Développeur React Senior",
      "2": "Designer UX/UI",
      "3": "Chef de Projet Digital",
      "4": "Développeur Full Stack",
      "5": "Data Scientist"
    };
    return titres[offreId] || "Offre inconnue";
  };

  const formatTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const heures = Math.floor(minutes / 60);
    const minutesRestantes = minutes % 60;
    
    if (heures > 0) {
      return `${heures}h ${minutesRestantes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'termine':
        return <Badge className="bg-success"><CheckCircle className="w-3 h-3 mr-1" />Terminé</Badge>;
      case 'en_cours':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />En cours</Badge>;
      case 'abandonne':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Abandonné</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getCredibiliteColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-success" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const resultatsFiltres = resultats.filter(resultat => {
    return filtreStatut === "tous" || resultat.statut === filtreStatut;
  });

  const resultatsTermines = resultats.filter(r => r.statut === 'termine');
  const scoreMoyen = resultatsTermines.length > 0 
    ? Math.round(resultatsTermines.reduce((acc, r) => acc + r.score, 0) / resultatsTermines.length)
    : 0;
  const credibiliteMoyenne = resultatsTermines.length > 0
    ? Math.round(resultatsTermines.reduce((acc, r) => acc + r.scoreCredibilite, 0) / resultatsTermines.length)
    : 0;

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mes résultats de tests
            </h1>
            <p className="text-muted-foreground">
              Consultez vos performances et suivez vos progrès
            </p>
          </div>

          {/* Stats générales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tests passés</p>
                    <div className="text-2xl font-bold text-foreground">
                      {resultatsTermines.length}
                    </div>
                  </div>
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Score moyen</p>
                    <div className={`text-2xl font-bold ${getScoreColor(scoreMoyen)}`}>
                      {scoreMoyen}%
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Crédibilité moyenne</p>
                    <div className={`text-2xl font-bold ${getCredibiliteColor(credibiliteMoyenne)}`}>
                      {credibiliteMoyenne}%
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux de réussite</p>
                    <div className="text-2xl font-bold text-foreground">
                      {resultatsTermines.length > 0 
                        ? Math.round((resultatsTermines.filter(r => r.score >= 60).length / resultatsTermines.length) * 100)
                        : 0}%
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtre */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-foreground">Filtrer par statut :</label>
                <select
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="termine">Terminé</option>
                  <option value="en_cours">En cours</option>
                  <option value="abandonne">Abandonné</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Liste des résultats */}
          <div className="space-y-4">
            {resultatsFiltres.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {filtreStatut !== "tous" 
                      ? `Aucun test ${filtreStatut} trouvé.`
                      : "Vous n'avez pas encore passé de test."
                    }
                  </p>
                  <Button onClick={() => window.location.href = '/candidat/offres'}>
                    Voir les offres disponibles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              resultatsFiltres.map((resultat, index) => (
                <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-foreground">
                                {resultat.offreTitre}
                              </h3>
                              {getStatutBadge(resultat.statut)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(resultat.dateTest)}
                              </div>
                              {resultat.statut === 'termine' && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Durée: {formatTemps(resultat.tempsTotal)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {resultat.statut === 'termine' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground flex items-center">
                                  {getScoreIcon(resultat.score)}
                                  <span className="ml-2">Score QCM</span>
                                </span>
                                <span className={`font-bold text-lg ${getScoreColor(resultat.score)}`}>
                                  {resultat.score}%
                                </span>
                              </div>
                              <Progress value={resultat.score} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {resultat.score >= 80 ? 'Excellent résultat !' : 
                                 resultat.score >= 60 ? 'Bon résultat' : 
                                 'À améliorer'}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Crédibilité</span>
                                <span className={`font-bold text-lg ${getCredibiliteColor(resultat.scoreCredibilite)}`}>
                                  {resultat.scoreCredibilite}%
                                </span>
                              </div>
                              <Progress value={resultat.scoreCredibilite} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {resultat.scoreCredibilite >= 90 ? 'Test très crédible' : 
                                 resultat.scoreCredibilite >= 70 ? 'Test crédible' : 
                                 'Comportement suspect détecté'}
                              </p>
                            </div>
                          </div>
                        )}

                        {resultat.anomalies.length > 0 && (
                          <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="h-4 w-4 text-warning mr-2" />
                              <h4 className="font-semibold text-warning text-sm">
                                Anomalies détectées pendant le test :
                              </h4>
                            </div>
                            <ul className="text-sm space-y-1">
                              {resultat.anomalies.map((anomalie, idx) => (
                                <li key={idx} className="text-warning">• {anomalie}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0 lg:ml-6">
                        {resultat.statut === 'termine' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </>
                        )}
                        {resultat.statut === 'en_cours' && (
                          <Button size="sm">
                            Reprendre le test
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultatsCandidat;