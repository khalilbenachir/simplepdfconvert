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
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10'
  },
  {
    key: 'compress',
    icon: Minimize2,
    href: '/tools/compress',
    gradient: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-500/10 to-pink-500/10'
  },
  {
    key: 'split',
    icon: Scissors,
    href: '/tools/split',
    gradient: 'from-pink-500 to-purple-500',
    bgGradient: 'from-pink-500/10 to-purple-500/10'
  },
  {
    key: 'pdfToWord',
    icon: FileText,
    href: '/tools/pdf-to-word',
    gradient: 'from-purple-500 to-blue-500',
    bgGradient: 'from-purple-500/10 to-blue-500/10'
  },
  {
    key: 'wordToPdf',
    icon: File,
    href: '/tools/word-to-pdf',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10'
  }
];
