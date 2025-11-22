export const TESTIMONIAL_KEYS = ['testimonial1', 'testimonial2', 'testimonial3'];

export const FAQ_KEYS = ['question1', 'question2', 'question3', 'question4'];

// Animation timing constants
export const ANIMATION_DELAYS = {
  STEP: 200,
  INITIAL: 200,
  CTA: 800,
} as const;

// Icon color mapping for steps
export const STEP_ICON_COLORS = [
  { bg: 'bg-blue-500' },
  { bg: 'bg-purple-500' },
  { bg: 'bg-green-500' },
] as const;

// Background SVG pattern
export const BACKGROUND_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` as const;
