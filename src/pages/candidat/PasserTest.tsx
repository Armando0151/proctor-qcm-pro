import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { 
  Clock, 
  Camera, 
  Mic, 
  AlertTriangle, 
  Eye, 
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  reponses: string[];
  bonneReponse: number;
}

interface ReponseDonnee {
  questionId: number;
  reponseIndex: number;
}

const PasserTest = () => {
  const { user, logout } = useAuth();
  const { offreId } = useParams();
  const navigate = useNavigate();
  
  const [etape, setEtape] = useState<'consentement' | 'test' | 'fini'>('consentement');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [reponses, setReponses] = useState<ReponseDonnee[]>([]);
  const [tempsRestant, setTempsRestant] = useState(1800); // 30 minutes en secondes
  const [cameraActive, setCameraActive] = useState(false);
  const [microActive, setMicroActive] = useState(false);
  const [anomaliesDetectees, setAnomaliesDetectees] = useState<string[]>([]);
  const [consentementDonne, setConsentementDonne] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Charger les questions du test (simulation)
    const questionsDemo: Question[] = [
      {
        id: 1,
        question: "Quelle est la différence principale entre React et Vue.js ?",
        reponses: [
          "React utilise JSX, Vue utilise des templates",
          "React est plus rapide que Vue",
          "Vue est plus difficile à apprendre",
          "Il n'y a aucune différence"
        ],
        bonneReponse: 0
      },
      {
        id: 2,
        question: "Qu'est-ce que le Virtual DOM ?",
        reponses: [
          "Une base de données virtuelle",
          "Une représentation en mémoire du DOM réel",
          "Un serveur virtuel",
          "Un framework CSS"
        ],
        bonneReponse: 1
      },
      {
        id: 3,
        question: "Quelle méthode HTTP est utilisée pour créer une ressource ?",
        reponses: [
          "GET",
          "PUT",
          "POST",
          "DELETE"
        ],
        bonneReponse: 2
      },
      {
        id: 4,
        question: "Qu'est-ce que TypeScript ?",
        reponses: [
          "Un framework JavaScript",
          "Un superset de JavaScript avec typage statique",
          "Une base de données",
          "Un serveur web"
        ],
        bonneReponse: 1
      },
      {
        id: 5,
        question: "Quelle est la principale différence entre let et var en JavaScript ?",
        reponses: [
          "let a une portée de bloc, var a une portée de fonction",
          "var est plus moderne que let",
          "let est plus rapide que var",
          "Il n'y a aucune différence"
        ],
        bonneReponse: 0
      }
    ];
    setQuestions(questionsDemo);
  }, []);

  // Timer
  useEffect(() => {
    if (isTestStarted && tempsRestant > 0 && etape === 'test') {
      const timer = setTimeout(() => {
        setTempsRestant(tempsRestant - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (tempsRestant === 0 && etape === 'test') {
      terminerTest();
    }
  }, [tempsRestant, isTestStarted, etape]);

  // Surveillance anti-triche
  useEffect(() => {
    if (isTestStarted) {
      // Détection perte de focus
      const handleBlur = () => {
        setAnomaliesDetectees(prev => [...prev, "Perte de focus détectée"]);
        toast({
          title: "Attention !",
          description: "Changement de fenêtre détecté. Restez sur la page du test.",
          variant: "destructive",
        });
      };

      // Détection clic droit
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setAnomaliesDetectees(prev => [...prev, "Tentative d'accès au menu contextuel"]);
      };

      // Détection raccourcis clavier
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          setAnomaliesDetectees(prev => [...prev, "Tentative d'ouverture des outils développeur"]);
        }
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
          e.preventDefault();
          setAnomaliesDetectees(prev => [...prev, "Tentative de copier/coller"]);
        }
      };

      window.addEventListener('blur', handleBlur);
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('blur', handleBlur);
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isTestStarted]);

  const demarrerCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setMicroActive(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra. Le test ne peut pas commencer.",
        variant: "destructive",
      });
    }
  };

  const arreterCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
    setMicroActive(false);
  };

  const commencerTest = async () => {
    if (!consentementDonne) {
      toast({
        title: "Consentement requis",
        description: "Vous devez accepter les conditions pour commencer le test.",
        variant: "destructive",
      });
      return;
    }

    await demarrerCamera();
    setEtape('test');
    setIsTestStarted(true);
    toast({
      title: "Test commencé",
      description: "La surveillance est maintenant active. Bonne chance !",
    });
  };

  const selectionnerReponse = (reponseIndex: number) => {
    const nouvellesReponses = reponses.filter(r => r.questionId !== questions[questionActuelle].id);
    nouvellesReponses.push({
      questionId: questions[questionActuelle].id,
      reponseIndex
    });
    setReponses(nouvellesReponses);
  };

  const questionSuivante = () => {
    if (questionActuelle < questions.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
    }
  };

  const questionPrecedente = () => {
    if (questionActuelle > 0) {
      setQuestionActuelle(questionActuelle - 1);
    }
  };

  const terminerTest = () => {
    // Calcul du score
    let bonnesReponses = 0;
    reponses.forEach(reponse => {
      const question = questions.find(q => q.id === reponse.questionId);
      if (question && question.bonneReponse === reponse.reponseIndex) {
        bonnesReponses++;
      }
    });

    const score = Math.round((bonnesReponses / questions.length) * 100);
    const scoreCredibilite = Math.max(100 - (anomaliesDetectees.length * 15), 0);

    // Sauvegarder le résultat
    const resultat = {
      offreId,
      score,
      scoreCredibilite,
      tempsTotal: 1800 - tempsRestant,
      anomalies: anomaliesDetectees,
      dateTest: new Date().toISOString(),
      statut: 'termine'
    };

    const resultatsExistants = JSON.parse(localStorage.getItem('mesResultats') || '[]');
    resultatsExistants.push(resultat);
    localStorage.setItem('mesResultats', JSON.stringify(resultatsExistants));

    arreterCamera();
    setEtape('fini');

    toast({
      title: "Test terminé !",
      description: `Votre score : ${score}% (Crédibilité : ${scoreCredibilite}%)`,
    });
  };

  const formatTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const sec = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const reponseSelectionnee = reponses.find(r => r.questionId === questions[questionActuelle]?.id);

  if (etape === 'consentement') {
    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4">
          <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground mb-4">
                Consentement RGPD - Test QCM Surveillé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Ce test utilise la surveillance par intelligence artificielle pour garantir son intégrité.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Données collectées pendant le test :</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Camera className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Flux vidéo</p>
                      <p className="text-sm text-muted-foreground">Surveillance comportementale</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Mic className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Flux audio</p>
                      <p className="text-sm text-muted-foreground">Détection d'anomalies sonores</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Eye className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Activité écran</p>
                      <p className="text-sm text-muted-foreground">Changements de fenêtre</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Temps de réponse</p>
                      <p className="text-sm text-muted-foreground">Analyse des patterns</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2">Comportements surveillés :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Changement de fenêtre ou d'onglet</li>
                    <li>• Présence de plusieurs personnes</li>
                    <li>• Regard dirigé ailleurs que vers l'écran</li>
                    <li>• Utilisation d'outils externes (calculatrice, notes)</li>
                    <li>• Tentatives de copier/coller</li>
                  </ul>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Informations importantes :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Durée du test : 30 minutes maximum</li>
                    <li>• Les données sont traitées de manière sécurisée</li>
                    <li>• Vous pouvez demander la suppression de vos données</li>
                    <li>• Seuls les recruteurs autorisés accèdent aux résultats</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="consentement"
                  checked={consentementDonne}
                  onChange={(e) => setConsentementDonne(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="consentement" className="text-sm text-foreground">
                  J'accepte que mes données soient collectées et traitées selon les conditions RGPD décrites ci-dessus. Je comprends que la surveillance IA sera active pendant toute la durée du test.
                </label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button 
                  onClick={commencerTest}
                  disabled={!consentementDonne}
                  className="min-w-[200px]"
                >
                  Commencer le test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (etape === 'fini') {
    const bonnesReponses = reponses.filter(reponse => {
      const question = questions.find(q => q.id === reponse.questionId);
      return question && question.bonneReponse === reponse.reponseIndex;
    }).length;
    const score = Math.round((bonnesReponses / questions.length) * 100);
    const scoreCredibilite = Math.max(100 - (anomaliesDetectees.length * 15), 0);

    return (
      <Layout user={user} onLogout={logout}>
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Test terminé avec succès !
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Score QCM</h3>
                  <div className="text-3xl font-bold text-foreground">{score}%</div>
                  <p className="text-sm text-muted-foreground">
                    {bonnesReponses}/{questions.length} bonnes réponses
                  </p>
                </div>
                <div className="p-6 bg-success/10 rounded-lg">
                  <h3 className="font-semibold text-success mb-2">Crédibilité</h3>
                  <div className="text-3xl font-bold text-foreground">{scoreCredibilite}%</div>
                  <p className="text-sm text-muted-foreground">
                    {anomaliesDetectees.length} anomalie{anomaliesDetectees.length > 1 ? 's' : ''} détectée{anomaliesDetectees.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {anomaliesDetectees.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Certains comportements ont été détectés pendant le test et peuvent affecter votre score de crédibilité.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Vos résultats ont été sauvegardés et transmis au recruteur.
                  Vous recevrez une notification par email concernant la suite du processus.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/candidat/resultats')}>
                    Voir mes résultats
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/candidat/offres')}>
                    Retour aux offres
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Interface du test
  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        {/* Header fixe avec timer et caméra */}
        <div className="sticky top-16 z-40 bg-card border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span className="font-mono text-lg font-semibold text-foreground">
                    {formatTemps(tempsRestant)}
                  </span>
                </div>
                <Progress 
                  value={((questionActuelle + 1) / questions.length) * 100} 
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">
                  Question {questionActuelle + 1} sur {questions.length}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${cameraActive ? 'bg-success' : 'bg-destructive'}`} />
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${microActive ? 'bg-success' : 'bg-destructive'}`} />
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </div>
                {anomaliesDetectees.length > 0 && (
                  <div className="flex items-center space-x-2 text-warning">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">{anomaliesDetectees.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Question principale */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {questions[questionActuelle]?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {questions[questionActuelle]?.reponses.map((reponse, index) => (
                    <label
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        reponseSelectionnee?.reponseIndex === index
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reponse"
                        checked={reponseSelectionnee?.reponseIndex === index}
                        onChange={() => selectionnerReponse(index)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="flex-1 text-foreground">{reponse}</span>
                    </label>
                  ))}

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={questionPrecedente}
                      disabled={questionActuelle === 0}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédente
                    </Button>

                    {questionActuelle === questions.length - 1 ? (
                      <Button
                        onClick={terminerTest}
                        disabled={reponses.length !== questions.length}
                        className="bg-success hover:bg-success/90"
                      >
                        Terminer le test
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={questionSuivante}
                        disabled={!reponseSelectionnee}
                      >
                        Suivante
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar avec caméra et infos */}
            <div className="space-y-6">
              {/* Flux caméra */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Camera className="mr-2 h-4 w-4" />
                    Surveillance active
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full rounded-lg bg-muted"
                    style={{ aspectRatio: '4/3' }}
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Restez dans le cadre et regardez l'écran
                  </p>
                </CardContent>
              </Card>

              {/* Progression */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Progression</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {questions.map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index === questionActuelle
                          ? 'bg-primary text-primary-foreground'
                          : reponses.find(r => r.questionId === questions[index].id)
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-sm ${
                        index === questionActuelle ? 'font-medium text-foreground' : 'text-muted-foreground'
                      }`}>
                        Question {index + 1}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PasserTest;