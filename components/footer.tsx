'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Logo } from '@/components/logo';
import { useEffect, useRef } from 'react';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 20 + 350, // Red/pink hues around #FF4C4C
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.speedY *= -1;

        ctx.fillStyle = `hsla(${particle.hue}, 100%, 65%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-linear-to-br from-background via-background to-primary/5">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Decorative Floating Shapes */}
      <div className="absolute top-10 left-[10%] w-20 h-20 rounded-full bg-primary/5 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-[15%] w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/2 right-[30%] w-16 h-16 rounded-full bg-primary/5 blur-xl animate-pulse delay-1000" />

      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        {/* Main Content - Centered Layout */}
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Brand Logo with Playful Animation */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <Logo variant="footer" showDecorations={false} />
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in delay-100">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation Links - Flowing Layout */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-fade-in delay-200">
            <Link
              href="/"
              className="group relative text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10">{t('home')}</span>
              <span className="absolute inset-0 -z-10 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm" />
            </Link>

            <span className="text-muted-foreground/30">•</span>

            <Link
              href="/tools"
              className="group relative text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10">{t('tools')}</span>
              <span className="absolute inset-0 -z-10 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm" />
            </Link>

            <span className="text-muted-foreground/30">•</span>

            <Link
              href="/pricing"
              className="group relative text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10">{t('pricing')}</span>
              <span className="absolute inset-0 -z-10 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm" />
            </Link>

            <span className="text-muted-foreground/30">•</span>

            <Link
              href="/about"
              className="group relative text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10">{t('about')}</span>
              <span className="absolute inset-0 -z-10 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm" />
            </Link>

            <span className="text-muted-foreground/30">•</span>

            <Link
              href="/contact"
              className="group relative text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10">{t('contact')}</span>
              <span className="absolute inset-0 -z-10 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm" />
            </Link>
          </nav>

          {/* Legal Links - Subtle Secondary Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm animate-fade-in delay-300">
            <Link
              href="/privacy"
              className="text-muted-foreground/70 hover:text-primary transition-colors duration-200 relative group"
            >
              {t('privacy')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>

            <span className="text-muted-foreground/30">•</span>

            <Link
              href="/terms"
              className="text-muted-foreground/70 hover:text-primary transition-colors duration-200 relative group"
            >
              {t('terms')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Copyright - Clean & Simple */}
          <div className="pt-8 border-t border-border/30 animate-fade-in delay-400">
            <p className="text-sm text-muted-foreground/60">
              {t('copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </footer>
  );
}
