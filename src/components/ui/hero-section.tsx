import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient";
}

export function HeroSection({ 
  children, 
  className, 
  variant = "default" 
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "gradient" && "bg-gradient-hero",
        variant === "default" && "bg-background",
        className
      )}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-black/10" />
      )}
      <div className="relative">
        {children}
      </div>
    </section>
  );
}