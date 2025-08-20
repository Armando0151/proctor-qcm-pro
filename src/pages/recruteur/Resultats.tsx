import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Award, 
  Eye, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  User,
  Target,
  Camera,
  AlertCircle,
  FileText
} from "lucide-react";

interface ResultatCandidat {
  id: string;
  nom: string;
  email: string;
  offreTitre: string;
  score: number;
  scoreCredibilite: number;
  tempsTotal: number;
  dateTest: string;
  statut: 'termine' | 'en_cours' | 'abandonne';
  anomalies: string[];
  reponses: any[];
}

const Resultats = () => {
  const { user, logout } = useAuth();
  const [resultats, setResultats] = useState<ResultatCandidat[]>([]);
  const [filtreOffre, setFiltreOffre] = useState("toutes");
  const [filtreStatut, setFiltreStatut] = useState("tous");

  useEffect(() => {
    // Données de démonstration
    const resultatsDemo: ResultatCandidat[] = [
      {
        id: "1",
        nom: "Marie Dupont",
        email: "marie.dupont@email.com",
        offreTitre: "Développeur React Senior",
        score: 88,
        scoreCredibilite: 95,
        tempsTotal: 1245, // en secondes
        dateTest: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        statut: "termine",
        anomalies: [],
        reponses: []
      },
      {
        id: "2",
        nom: "Pierre Martin",
        email: "pierre.martin@email.com",
        offreTitre: "Développeur React Senior",
        score: 76,
        scoreCredibilite: 82,
        tempsTotal: 1680,
        dateTest: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        statut: "termine",
        anomalies: ["Regard ailleurs détecté", "Perte de focus (2x)"],
        reponses: []
      },
      {
        id: "3",
        nom: "Sophie Leblanc",
        email: "sophie.leblanc@email.com",
        offreTitre: "Designer UX/UI",
        score: 92,
        scoreCredibilite: 98,
        tempsTotal: 1120,
        dateTest: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        statut: "termine",
        anomalies: [],
        reponses: []
      },
      {
        id: "4",
        nom: "Thomas Durand",
        email: "thomas.durand@email.com",
        offreTitre: "Designer UX/UI",
        score: 45,
        scoreCredibilite: 65,
        tempsTotal: 2100,
        dateTest: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        statut: "termine",
        anomalies: ["Plusieurs visages détectés", "Changement d'onglet (3x)", "DevTools ouvert"],
        reponses: []
      },
      {
        id: "5",
        nom: "Julie Moreau",
        email: "julie.moreau@email.com",
        offreTitre: "Chef de Projet Digital",
        score: 0,
        scoreCredibilite: 0,
        tempsTotal: 0,
        dateTest: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        statut: "en_cours",
        anomalies: [],
        reponses: []
      }
    ];
    setResultats(resultatsDemo);
  }, []);

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
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Abandonné</Badge>;
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

  const resulttatsFiltres = resultats.filter(resultat => {
    const matchesOffre = filtreOffre === "toutes" || resultat.offreTitre === filtreOffre;
    const matchesStatut = filtreStatut === "tous" || resultat.statut === filtreStatut;
    return matchesOffre && matchesStatut;
  });

  const offresUniques = [...new Set(resultats.map(r => r.offreTitre))];

  const exportCSV = () => {
    const headers = ['Nom', 'Email', 'Offre', 'Score', 'Crédibilité', 'Temps', 'Date', 'Statut', 'Anomalies'];
    const csvContent = [
      headers.join(','),
      ...resulttatsFiltres.map(r => [
        r.nom,
        r.email,
        r.offreTitre,
        r.score,
        r.scoreCredibilite,
        formatTemps(r.tempsTotal),
        formatDate(r.dateTest),
        r.statut,
        r.anomalies.join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultats_tests.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Résultats des tests
              </h1>
              <p className="text-muted-foreground">
                Analysez les performances et la crédibilité des candidats
              </p>
            </div>
            <Button onClick={exportCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter CSV
            </Button>
          </div>

          {/* Stats générales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tests passés</p>
                    <div className="text-2xl font-bold text-foreground">
                      {resultats.filter(r => r.statut === 'termine').length}
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
                    <div className="text-2xl font-bold text-foreground">
                      {Math.round(resultats.filter(r => r.statut === 'termine').reduce((acc, r) => acc + r.score, 0) / resultats.filter(r => r.statut === 'termine').length || 0)}%
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Crédibilité moyenne</p>
                    <div className="text-2xl font-bold text-foreground">
                      {Math.round(resultats.filter(r => r.statut === 'termine').reduce((acc, r) => acc + r.scoreCredibilite, 0) / resultats.filter(r => r.statut === 'termine').length || 0)}%
                    </div>
                  </div>
                  <Camera className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Anomalies détectées</p>
                    <div className="text-2xl font-bold text-foreground">
                      {resultats.reduce((acc, r) => acc + r.anomalies.length, 0)}
                    </div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-64">
                  <label className="text-sm font-medium text-foreground mb-2 block">Filtrer par offre</label>
                  <select
                    value={filtreOffre}
                    onChange={(e) => setFiltreOffre(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="toutes">Toutes les offres</option>
                    {offresUniques.map(offre => (
                      <option key={offre} value={offre}>{offre}</option>
                    ))}
                  </select>
                </div>
                <div className="md:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">Filtrer par statut</label>
                  <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="termine">Terminé</option>
                    <option value="en_cours">En cours</option>
                    <option value="abandonne">Abandonné</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des résultats */}
          <div className="space-y-4">
            {resulttatsFiltres.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-muted-foreground">
                    Aucun test ne correspond à vos critères de filtrage.
                  </p>
                </CardContent>
              </Card>
            ) : (
              resulttatsFiltres.map((resultat) => (
                <Card key={resultat.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <User className="h-5 w-5 text-primary" />
                              <h3 className="text-xl font-semibold text-foreground">
                                {resultat.nom}
                              </h3>
                              {getStatutBadge(resultat.statut)}
                            </div>
                            <p className="text-muted-foreground mb-1">{resultat.email}</p>
                            <p className="text-sm font-medium text-primary">{resultat.offreTitre}</p>
                          </div>
                        </div>

                        {resultat.statut === 'termine' && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Score QCM</span>
                                <span className={`font-bold ${getScoreColor(resultat.score)}`}>
                                  {resultat.score}%
                                </span>
                              </div>
                              <Progress value={resultat.score} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Crédibilité</span>
                                <span className={`font-bold ${getCredibiliteColor(resultat.scoreCredibilite)}`}>
                                  {resultat.scoreCredibilite}%
                                </span>
                              </div>
                              <Progress value={resultat.scoreCredibilite} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Temps total</span>
                                <span className="font-bold text-foreground">
                                  {formatTemps(resultat.tempsTotal)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(resultat.dateTest)}
                          </div>
                          {resultat.anomalies.length > 0 && (
                            <div className="flex items-center text-warning">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {resultat.anomalies.length} anomalie{resultat.anomalies.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>

                        {resultat.anomalies.length > 0 && (
                          <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                            <h4 className="font-semibold text-warning mb-2 text-sm">
                              Anomalies détectées :
                            </h4>
                            <ul className="text-sm space-y-1">
                              {resultat.anomalies.map((anomalie, index) => (
                                <li key={index} className="text-warning">• {anomalie}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0 lg:ml-6">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Détails
                        </Button>
                        {resultat.statut === 'termine' && (
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Rapport PDF
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

export default Resultats;