export interface NavLink {
  key: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'tools', href: '/tools' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];
