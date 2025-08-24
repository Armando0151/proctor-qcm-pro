import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { 
  Search, 
  HelpCircle, 
  Users, 
  Shield, 
  Briefcase,
  Award,
  Settings,
  MessageCircle,
  Mail,
  Phone
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'candidat' | 'recruteur' | 'technique' | 'securite';
  tags: string[];
}

const FAQ = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "Comment fonctionne la surveillance IA pendant les tests ?",
      answer: "Notre système de surveillance IA utilise des algorithmes avancés pour détecter les comportements suspects pendant les tests. Il analyse les mouvements oculaires, les changements d'onglets, l'utilisation du clavier et de la souris, ainsi que l'environnement audio et vidéo. Toutes les données sont traitées en temps réel et les alertes sont générées automatiquement en cas d'anomalie détectée.",
      category: "technique",
      tags: ["surveillance", "IA", "test", "sécurité"]
    },
    {
      id: "2",
      question: "Mes données personnelles sont-elles sécurisées ?",
      answer: "Absolument. Nous respectons strictement le RGPD et toutes les réglementations en matière de protection des données. Vos informations personnelles sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais vos données avec des tiers sans votre consentement explicite. Vous avez le droit d'accéder, modifier ou supprimer vos données à tout moment.",
      category: "securite",
      tags: ["RGPD", "sécurité", "données", "confidentialité"]
    },
    {
      id: "3",
      question: "Comment postuler à une offre d'emploi ?",
      answer: "Pour postuler à une offre, connectez-vous à votre compte candidat, naviguez vers la section 'Offres', cliquez sur l'offre qui vous intéresse, puis sur 'Postuler'. Vous devrez remplir vos informations, télécharger votre CV et lettre de motivation, et accepter les conditions RGPD. Si l'offre inclut un test, vous devrez le passer avant que votre candidature soit complète.",
      category: "candidat",
      tags: ["postulation", "candidature", "CV", "offre"]
    },
    {
      id: "4",
      question: "Comment créer et publier une offre d'emploi ?",
      answer: "En tant que recruteur, allez dans votre dashboard, cliquez sur 'Créer une offre', remplissez toutes les informations requises (titre, description, compétences, etc.). Vous pouvez optionnellement ajouter un QCM personnalisé. Une fois l'offre créée, elle est immédiatement visible par les candidats et vous recevrez les candidatures dans votre espace de gestion.",
      category: "recruteur",
      tags: ["offre", "création", "publication", "QCM"]
    },
    {
      id: "5",
      question: "Que se passe-t-il si je suis déconnecté pendant un test ?",
      answer: "Si vous êtes déconnecté pendant un test, ne paniquez pas. Le système sauvegarde automatiquement vos réponses toutes les 30 secondes. Reconnectez-vous rapidement avec les mêmes identifiants et vous pourrez reprendre le test où vous vous êtes arrêté. Cependant, le temps continue de s'écouler, alors reconnectez-vous le plus rapidement possible.",
      category: "technique",
      tags: ["déconnexion", "test", "sauvegarde", "reprise"]
    },
    {
      id: "6",
      question: "Comment interpréter les résultats d'un test ?",
      answer: "Les résultats de test incluent votre score global (sur 100), le nombre de bonnes réponses, le temps passé, et un pourcentage de réussite. Pour les recruteurs, des détails supplémentaires sont disponibles incluant l'analyse par compétence, les questions les plus difficiles, et un rapport de surveillance. Les candidats voient leurs résultats généraux et peuvent demander plus de détails.",
      category: "general",
      tags: ["résultats", "score", "évaluation", "analyse"]
    },
    {
      id: "7",
      question: "Puis-je modifier une offre après publication ?",
      answer: "Oui, vous pouvez modifier une offre publiée à tout moment depuis votre espace recruteur. Cliquez sur 'Mes offres', sélectionnez l'offre à modifier, puis 'Éditer'. Attention : si des candidatures ont déjà été reçues, certains changements majeurs (comme modifier le test) peuvent affecter l'équité du processus de sélection.",
      category: "recruteur",
      tags: ["modification", "offre", "édition", "publication"]
    },
    {
      id: "8",
      question: "Comment fonctionne le système de notation ?",
      answer: "Le système de notation est automatique et transparent. Chaque question a un poids spécifique, le score final est calculé en pourcentage des bonnes réponses. Les questions à choix multiples valent 1 point chacune, les questions ouvertes sont évaluées selon des critères prédéfinis. Le temps de réponse peut aussi influencer le score selon les paramètres définis par le recruteur.",
      category: "general",
      tags: ["notation", "score", "calcul", "évaluation"]
    },
    {
      id: "9",
      question: "Que faire si je rencontre un problème technique ?",
      answer: "Si vous rencontrez un problème technique, vérifiez d'abord votre connexion internet et actualisez la page. Pour les problèmes persistants, contactez notre support technique via le chat en ligne (disponible 24/7) ou envoyez un email à support@proctorqcm.com. Incluez des détails sur le problème, votre navigateur, et des captures d'écran si possible.",
      category: "technique",
      tags: ["problème", "support", "technique", "aide"]
    },
    {
      id: "10",
      question: "Comment supprimer mon compte ?",
      answer: "Pour supprimer votre compte, allez dans 'Paramètres' > 'Confidentialité et sécurité' > 'Supprimer le compte'. Vous devrez confirmer cette action en tapant 'SUPPRIMER'. Attention : cette action est irréversible et supprimera toutes vos données, candidatures, et historiques. Vous pouvez aussi nous contacter pour une suppression assistée.",
      category: "general",
      tags: ["suppression", "compte", "données", "RGPD"]
    }
  ];

  const categories = [
    { id: "all", name: "Toutes", icon: HelpCircle },
    { id: "general", name: "Général", icon: Users },
    { id: "candidat", name: "Candidats", icon: Briefcase },
    { id: "recruteur", name: "Recruteurs", icon: Award },
    { id: "technique", name: "Technique", icon: Settings },
    { id: "securite", name: "Sécurité", icon: Shield }
  ];

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout user={user} onLogout={logout}>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Foire aux Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Rechercher dans la FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg py-6"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>

          {/* FAQ Items */}
          {filteredFAQ.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQ.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-start space-x-3">
                          <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <span className="font-medium">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-6">
                        <div className="ml-8">
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {item.answer}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune question trouvée
                </h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos critères de recherche ou contactez notre support.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Besoin d'aide supplémentaire ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Si vous ne trouvez pas la réponse à votre question, notre équipe de support est là pour vous aider.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@proctorqcm.com</p>
                    <p className="text-xs text-muted-foreground">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Chat en direct</p>
                    <p className="text-sm text-muted-foreground">Disponible 24/7</p>
                    <Button size="sm" className="mt-2">Ouvrir le chat</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;