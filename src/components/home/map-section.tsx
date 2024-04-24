"use client";

import React from 'react'
import { LocationsMap, Show } from '../common'
import { useMapManagementHomeStore } from '@/store';
import { Session } from 'next-auth';
import { cn } from '@/lib';
import { Alert, AlertDescription, AlertTitle, Button } from '../ui';
import { CircleAlert, Terminal, X } from 'lucide-react';
import { LoginForm } from '../forms';
import { useTranslation } from 'react-i18next';


interface MapSectionProps {
    session: Session | null
}
export function MapSection({ session }: MapSectionProps) {
    const { showFeaturesPanel, setShowFeaturePanel } = useMapManagementHomeStore();
    const { t } = useTranslation()
    return (
        <div
            className={`h-full w-full relative grid md:p-6 lg:px-6 xl:px-6 3xl:px-0 ${showFeaturesPanel ? 'grid-cols-[500px,1fr] gap-10' : 'grid-cols-[0,1fr]'}`}
        >
            <div className={cn("w-full relative")}>
                <div className={cn("absolute bg-white rounded-[10px] w-full h-full flex flex-col overflow-y-auto", !showFeaturesPanel && "hidden")}>
                    <div className="sticky bg-white top-0 z-10 flex w-full justify-between items-center px-5 py-2 shadow-sm">
                        <h4 className="text-xl text-gray-600 font-semibold">
                            {t("common:login_required")}
                        </h4>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            className='rounded-full text-gray-600'
                            onClick={() => setShowFeaturePanel(false)}
                        >
                            <X />
                        </Button>
                    </div>
                    <div className="p-5 z-0">
                        <Show>
                            <Show.When
                                isTrue={session?.user ? true : false}
                            >
                                <div className="">
                                    Logged in
                                </div>
                            </Show.When>
                            <Show.Else
                            >
                                <Alert>
                                    <AlertDescription className='flex justify-start gap-2 text-yellow-600'>
                                        {t("common:login_required_add_location")}
                                    </AlertDescription>
                                </Alert>
                                <LoginForm />
                            </Show.Else>
                        </Show>
                    </div>
                </div>
            </div>
            <div className="h-full w-full transition-all duration-500 relative">
                <LocationsMap />
            </div>
        </div>
    )
}
