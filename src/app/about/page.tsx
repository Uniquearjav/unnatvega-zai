import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Unnat Vega — your trusted partner in international trade and digital excellence. We bridge the gap between Indian businesses and global opportunities with 8+ years of experience.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Unnat Vega',
    description:
      'Learn about Unnat Vega — your trusted partner in international trade and digital excellence.',
    url: '/about',
  },
};

export { default } from './page-client';
