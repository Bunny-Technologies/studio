import type { Question } from "@/lib/data";
import { BrainCircuit, HeartPulse, Sparkles, TrendingUp, WifiOff } from "lucide-react";

interface CategoryIconProps {
  category: Question["category"];
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  switch (category) {
    case "Awareness":
      return <Sparkles className={className} />;
    case "Physical-Health":
      return <HeartPulse className={className} />;
    case "Mentality":
      return <BrainCircuit className={className} />;
    case "Productivity":
      return <TrendingUp className={className} />;
    case "Digital-Wellbeing":
      return <WifiOff className={className} />;
    default:
      return null;
  }
}
