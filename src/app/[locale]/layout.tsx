
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
import { Toaster } from "@/components";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Easily Locate | ELOCATE",
    description: "This application helps anyone looking to get a voter card in Cameroon or anywhere else find a nearby enrollment point and obtain the fastest route to get there.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_SITE_URL ?? ""),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en',
            'fr-FR': '/fr',
        },
    },
    openGraph: {
        images: '/src/app/[locale]/opengraph-image.png',
    },
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
                        <Toaster />
                    </TranslationProvider>
                </div>
            </body>
        </html>
    );
}