export interface NavLink {
  key: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'tools', href: '/tools' },
  { key: 'pricing', href: '/pricing' },
  { key: 'about', href: '/about' },
];
