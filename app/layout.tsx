import type { Metadata } from 'next';
import './globals.css';

const title = 'Feasibility Intelligence';
const description = 'Filter non-starters early, explain why, and surface the opportunities worth expert time.';
const siteUrl = 'https://feasibility-intelligence.thedeploylab.au';
const imageUrl = `${siteUrl}/og/feasibility-intelligence-preview.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: '/icons/favicon.svg',
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'Feasibility Intelligence preview card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
