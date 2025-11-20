import { Upload, Settings, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Step {
  key: string;
  icon: LucideIcon;
  gradient: string;
  number: string;
}

export const STEPS: Step[] = [
  {
    key: 'step1',
    icon: Upload,
    gradient: 'from-blue-500 to-cyan-500',
    number: '01',
  },
  {
    key: 'step2',
    icon: Settings,
    gradient: 'from-purple-500 to-pink-500',
    number: '02',
  },
  {
    key: 'step3',
    icon: Download,
    gradient: 'from-green-500 to-emerald-500',
    number: '03',
  },
];
