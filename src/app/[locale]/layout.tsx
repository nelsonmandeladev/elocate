
import { Inter } from "next/font/google";

import { Metadata } from "next";
import "./globals.scss";
import { cn } from "@/lib/utils";
import initTranslations from "@/lib/i18n";
import { ReactNode } from "react";
import { TRANSlATIONS_NAMESPACES } from "@/constants";
import { TranslationProvider } from "@/providers";
import { dir } from "i18next";
import i18nConfig from "@/lib/i18nConfig";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Localiser elecam facilement | ELEPOINTS",
    description: "Cette application aide toute personne desireuse de faire une carte d'electeur au cameroun et partout ailleur de trouver un point d'enrolement pres de lui et obtenir le trajet le plus rapide pour s'y rendre",
};

interface LayoutProps {
    children: ReactNode,
    params: {
        locale: string
    }
}


export function generateStaticParams() {
    return i18nConfig.locales.map(locale => ({ locale }));
}


export default async function layout({
    children,
    params: { locale }
}: LayoutProps) {
    const { resources } = await initTranslations(locale, TRANSlATIONS_NAMESPACES)
    return (
        <html lang={locale} dir={dir(locale)}>
            <body className={cn(inter.className, "w-full flex justify-center bg-gray-100")}>
                <div className="w-full max-w-[1728px]">
                    <TranslationProvider
                        locale={locale}
                        resources={resources}
                    >
                        {children}
                    </TranslationProvider>
                </div>
            </body>
        </html>
    );
}