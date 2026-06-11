import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Study Tracker',
  description: 'Daily placement study routine tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
