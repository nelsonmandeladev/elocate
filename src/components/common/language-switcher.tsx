'use client';

import i18nConfig from '@/lib/i18nConfig';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const onLanguageChange = (newLocale: string) => {

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    {currentLocale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className={cn(currentLocale === "en" && "bg-foreground text-white hover:bg-foreground/90", 'cursor-pointer')}
                    onClick={() => onLanguageChange("en")}
                >
                    {t("common:key_en")}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(currentLocale === "fr" && "bg-foreground text-white", 'cursor-pointer')}
                    onClick={() => onLanguageChange("fr")}
                >
                    {t("common:key_fr")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}