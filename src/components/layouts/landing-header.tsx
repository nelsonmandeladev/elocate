"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '../ui'
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common';
import { MapPin } from 'lucide-react';

export function LandingPageHeader() {
    const { t } = useTranslation();

    return (
        <div className='w-full py-5 px-10 shadow-sm flex justify-between items-center'>
            <div className="font-bold text-xl uppercase">
                ELOCATE
            </div>
            <div className=""></div>
            <div className="flex gap-2 items-center">
                <Button>
                    <MapPin className='mr-2' />
                    {t("common:add_location_btn")}
                </Button>
                <div className="ml-10">
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    )
}
