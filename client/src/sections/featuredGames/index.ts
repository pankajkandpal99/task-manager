import { ReactNode } from "react";

export interface Feature {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  variant?: "default" | "boxed";
  columns?: 3 | 4;
}
