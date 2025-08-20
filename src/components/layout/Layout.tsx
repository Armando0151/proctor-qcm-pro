import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'recruteur' | 'candidat';
  } | null;
  onLogout?: () => void;
}

export function Layout({ children, user, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}