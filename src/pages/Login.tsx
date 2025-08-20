import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, Users } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur ProctorQCM !",
        });
        
        // Redirection basée sur le rôle (simulé par l'email)
        const role = email.includes('recruteur') ? 'recruteur' : 'candidat';
        navigate(`/${role}/dashboard`);
      } else {
        setError(result.error || "Erreur de connexion");
      }
    } catch (err) {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-elegant">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Connexion
            </h1>
            <p className="text-white/80">
              Accédez à votre espace ProctorQCM
            </p>
          </div>

          {/* Login Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-foreground">
                Se connecter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Utilisez "recruteur@test.com" ou "candidat@test.com" pour tester
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Connexion..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Se connecter
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-glow transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-center text-sm text-muted-foreground">
                  Pas encore de compte ?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary hover:text-primary-glow transition-colors"
                  >
                    S'inscrire
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Info */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-card">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-3">Comptes de démonstration :</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Recruteur :</span>
                  <code className="bg-muted px-2 py-1 rounded text-xs">recruteur@test.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Candidat :</span>
                  <code className="bg-muted px-2 py-1 rounded text-xs">candidat@test.com</code>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Mot de passe : n'importe lequel (démo)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;