import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, Briefcase, Save, ArrowLeft, BookOpen } from "lucide-react";

const CreerOffre = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    competences: "",
    type: "CDI",
    lieu: "",
    salaire: "",
    experience: ""
  });
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      reponses: ["", "", "", ""],
      bonneReponse: 0
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showQCM, setShowQCM] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const ajouterQuestion = () => {
    const nouvelleQuestion = {
      id: questions.length + 1,
      question: "",
      reponses: ["", "", "", ""],
      bonneReponse: 0
    };
    setQuestions([...questions, nouvelleQuestion]);
  };

  const modifierQuestion = (index: number, field: string, value: string | number) => {
    const nouvellesQuestions = [...questions];
    if (field === 'question') {
      nouvellesQuestions[index].question = value as string;
    } else if (field === 'bonneReponse') {
      nouvellesQuestions[index].bonneReponse = value as number;
    }
    setQuestions(nouvellesQuestions);
  };

  const modifierReponse = (questionIndex: number, reponseIndex: number, value: string) => {
    const nouvellesQuestions = [...questions];
    nouvellesQuestions[questionIndex].reponses[reponseIndex] = value;
    setQuestions(nouvellesQuestions);
  };

  const supprimerQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sauvegarde des données dans le localStorage pour la démo
      const offres = JSON.parse(localStorage.getItem('offres') || '[]');
      const nouvelleOffre = {
        id: Date.now(),
        ...formData,
        qcm: showQCM ? questions : null,
        dateCreation: new Date().toISOString(),
        statut: 'active',
        candidatures: 0
      };
      
      offres.push(nouvelleOffre);
      localStorage.setItem('offres', JSON.stringify(offres));
      
      toast({
        title: "Offre créée avec succès !",
        description: showQCM ? "L'offre et son QCM ont été sauvegardés." : "L'offre a été publiée.",
      });
      
      navigate('/recruteur/offres');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'offre.",
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/recruteur/offres">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Créer une offre d'emploi
                </h1>
                <p className="text-muted-foreground">
                  Publiez une nouvelle offre avec ou sans QCM
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations de l'offre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Informations de l'offre
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="titre">Titre du poste *</Label>
                    <Input
                      id="titre"
                      name="titre"
                      placeholder="Ex: Développeur React Senior"
                      value={formData.titre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de contrat</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleSelectChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description du poste *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lieu">Lieu de travail</Label>
                    <Input
                      id="lieu"
                      name="lieu"
                      placeholder="Ex: Paris, Remote, Hybride"
                      value={formData.lieu}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaire">Salaire (optionnel)</Label>
                    <Input
                      id="salaire"
                      name="salaire"
                      placeholder="Ex: 45-55k€, À négocier"
                      value={formData.salaire}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="competences">Compétences requises</Label>
                    <Input
                      id="competences"
                      name="competences"
                      placeholder="Ex: React, TypeScript, Node.js"
                      value={formData.competences}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Expérience requise</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="Ex: 3-5 ans, Junior, Senior"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QCM Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    QCM d'évaluation (optionnel)
                  </CardTitle>
                  <Button
                    type="button"
                    variant={showQCM ? "default" : "outline"}
                    onClick={() => setShowQCM(!showQCM)}
                  >
                    {showQCM ? "Masquer QCM" : "Ajouter un QCM"}
                  </Button>
                </div>
              </CardHeader>
              
              {showQCM && (
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertDescription>
                      Les candidats devront passer ce QCM avant de finaliser leur candidature.
                      La surveillance IA sera activée automatiquement.
                    </AlertDescription>
                  </Alert>

                  {questions.map((question, questionIndex) => (
                    <Card key={question.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Question {questionIndex + 1}</h3>
                          {questions.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => supprimerQuestion(questionIndex)}
                            >
                              Supprimer
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Textarea
                            placeholder="Tapez votre question ici..."
                            value={question.question}
                            onChange={(e) => modifierQuestion(questionIndex, 'question', e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label>Réponses possibles</Label>
                          {question.reponses.map((reponse, reponseIndex) => (
                            <div key={reponseIndex} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                checked={question.bonneReponse === reponseIndex}
                                onChange={() => modifierQuestion(questionIndex, 'bonneReponse', reponseIndex)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <Input
                                placeholder={`Réponse ${reponseIndex + 1}`}
                                value={reponse}
                                onChange={(e) => modifierReponse(questionIndex, reponseIndex, e.target.value)}
                                className="flex-1"
                              />
                              {question.bonneReponse === reponseIndex && (
                                <span className="text-success text-sm font-medium">Bonne réponse</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={ajouterQuestion}
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une question
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <Link to="/recruteur/offres">
                <Button variant="outline" type="button">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Publication..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Publier l'offre
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreerOffre;