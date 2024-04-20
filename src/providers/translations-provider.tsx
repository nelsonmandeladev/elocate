"use client";

import { TRANSlATIONS_NAMESPACES } from "@/constants";
import initTranslations from "@/lib/i18n";
import { Resource, createInstance } from "i18next";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next"


interface TranslationProviderProps {
    children: ReactNode,
    locale: string,
    resources: Resource
}
export function TranslationProvider({ children, locale, resources }: TranslationProviderProps) {
    const i18n = createInstance();

    initTranslations(locale, TRANSlATIONS_NAMESPACES, i18n, resources)
    return <I18nextProvider i18n={i18n}>
        {children}
    </I18nextProvider>
}