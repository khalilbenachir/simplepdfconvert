import { Zap, DollarSign, Download, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Feature {
  key: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
}

export const FEATURES: Feature[] = [
  {
    key: 'fast',
    icon: Zap,
    gradient: 'from-gradient-yellow to-gradient-orange',
    bgGradient: 'from-gradient-yellow/10 to-gradient-orange/10',
  },
  {
    key: 'free',
    icon: DollarSign,
    gradient: 'from-gradient-green to-gradient-emerald',
    bgGradient: 'from-gradient-green/10 to-gradient-emerald/10',
  },
  {
    key: 'noInstall',
    icon: Download,
    gradient: 'from-gradient-blue to-gradient-indigo',
    bgGradient: 'from-gradient-blue/10 to-gradient-indigo/10',
  },
  {
    key: 'secure',
    icon: Shield,
    gradient: 'from-gradient-purple to-gradient-pink',
    bgGradient: 'from-gradient-purple/10 to-gradient-pink/10',
  },
];
