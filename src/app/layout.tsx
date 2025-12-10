import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stitch Party Challenge',
  description: 'Добро пожаловать на вечеринку Stitch Party Challenge!'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
