import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruteur' | 'candidat';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification du token au chargement
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulation d'un appel API - à remplacer par un vrai appel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation de données utilisateur
      const mockUser: User = {
        id: '1',
        name: email.includes('recruteur') ? 'Jean Recruteur' : 'Marie Candidat',
        email,
        role: email.includes('recruteur') ? 'recruteur' : 'candidat'
      };

      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'recruteur' | 'candidat'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role
      };

      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };
}