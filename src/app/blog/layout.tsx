import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Insights & Resources for Global Trade',
  description:
    'Stay ahead in international trade with expert insights, compliance guides, and digital strategy tips from the Unnat Vega team. Read our latest articles on export, import, and business growth.',
  openGraph: {
    title: 'Blog — Unnat Vega Insights & Resources',
    description:
      'Expert insights, compliance guides, and digital strategy tips for exporters, importers, and businesses.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
