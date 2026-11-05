import { Compass, Feather, Flame, Home, Orbit, PenLine, Shapes, Signature, Smartphone, Sparkles, Sunrise, TrendingUp, Watch, type LucideIcon } from "lucide-react";
const map: Record<string, LucideIcon> = { Compass, Feather, Flame, Home, Orbit, PenLine, Shapes, Signature, Smartphone, Sparkles, Sunrise, TrendingUp, Watch };
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? Sparkles;
  return <I className={className} strokeWidth={1.4} aria-hidden />;
}
export const serviceIconNames = Object.keys(map);
