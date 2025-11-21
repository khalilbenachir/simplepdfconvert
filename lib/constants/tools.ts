import { Merge, Minimize2, Scissors, FileText, File } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Tool {
  key: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  bgGradient: string;
}

export const TOOLS: Tool[] = [
  {
    key: 'merge',
    icon: Merge,
    href: '/tools/merge',
    gradient: 'from-gradient-orange to-gradient-red',
    bgGradient: 'from-gradient-orange/10 to-gradient-red/10'
  },
  {
    key: 'compress',
    icon: Minimize2,
    href: '/tools/compress',
    gradient: 'from-gradient-red to-gradient-pink',
    bgGradient: 'from-gradient-red/10 to-gradient-pink/10'
  },
  {
    key: 'split',
    icon: Scissors,
    href: '/tools/split',
    gradient: 'from-gradient-pink to-gradient-purple',
    bgGradient: 'from-gradient-pink/10 to-gradient-purple/10'
  },
  {
    key: 'pdfToWord',
    icon: FileText,
    href: '/tools/pdf-to-word',
    gradient: 'from-gradient-purple to-gradient-blue',
    bgGradient: 'from-gradient-purple/10 to-gradient-blue/10'
  },
  {
    key: 'wordToPdf',
    icon: File,
    href: '/tools/word-to-pdf',
    gradient: 'from-gradient-blue to-gradient-cyan',
    bgGradient: 'from-gradient-blue/10 to-gradient-cyan/10'
  }
];
