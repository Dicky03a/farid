import type {Metadata} from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css'; // Global styles

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sahabat BK - Game Version',
  description: 'Bimbingan konseling interaktif gamified',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${fredoka.variable}`}>
      <body className="font-sans antialiased text-black selection:bg-yellow-400" suppressHydrationWarning>{children}</body>
    </html>
  );
}
