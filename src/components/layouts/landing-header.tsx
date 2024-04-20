"use client";

import React from 'react'
import { Button } from '../ui'
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common';

export function LandingPageHeader() {
    const { t } = useTranslation();
    return (
        <div className='w-full py-5 px-10 shadow-sm flex justify-between'>
            <div className="font-bold text-xl uppercase">
                ELOCATE
            </div>
            <div className=""></div>
            <div className="flex gap-2">
                <Button variant={"link"}>
                    {t("common:login_btn")}
                </Button>
                <Button>
                    {t("common:register_btn")}
                </Button>
                <LanguageSwitcher />
            </div>
        </div>
    )
}
