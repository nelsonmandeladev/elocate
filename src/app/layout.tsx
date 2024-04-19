import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Localiser elecam facilement | ELEPOINTS",
  description: "Cette application aide toute personne desireuse de faire une carte d'electeur au cameroun et partout ailleur de trouver un point d'enrolement pres de lui et obtenir le trajet le plus rapide pour s'y rendre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
