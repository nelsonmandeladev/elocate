
import { Inter } from "next/font/google";

import { Metadata } from "next";
import "./globals.scss";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Localiser elecam facilement | ELEPOINTS",
    description: "Cette application aide toute personne desireuse de faire une carte d'electeur au cameroun et partout ailleur de trouver un point d'enrolement pres de lui et obtenir le trajet le plus rapide pour s'y rendre",
};


export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={cn(inter.className, "w-full flex justify-center")}>
                <div className="w-full max-w-[1728]">
                    {children}
                </div>
            </body>
        </html>
    );
}