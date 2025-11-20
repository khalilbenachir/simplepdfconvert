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
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10',
  },
  {
    key: 'free',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    key: 'noInstall',
    icon: Download,
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    key: 'secure',
    icon: Shield,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
];
