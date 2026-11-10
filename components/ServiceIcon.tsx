import { Activity, Compass, Feather, Flame, Gem, HeartPulse, Home, Orbit, PenLine, Shapes, Shield, Signature, Smartphone, Sparkles, Sun, Sunrise, TrendingUp, Watch, Zap, type LucideIcon } from "lucide-react";
const map: Record<string, LucideIcon> = { Activity, Compass, Feather, Flame, Gem, HeartPulse, Home, Orbit, PenLine, Shapes, Shield, Signature, Smartphone, Sparkles, Sun, Sunrise, TrendingUp, Watch, Zap };
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? Sparkles;
  return <I className={className} strokeWidth={1.4} aria-hidden />;
}
export const serviceIconNames = Object.keys(map);
