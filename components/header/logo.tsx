import { Logo as SharedLogo } from '@/components/logo';

interface LogoProps {
  t: (key: string) => string;
}

export function Logo({ t }: LogoProps) {
  return <SharedLogo variant="header" showDecorations={true} />;
}
