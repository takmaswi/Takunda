import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TAKUNDA - Portfolio',
  description: 'A photorealistic 3D portfolio experience showcasing my work and services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
