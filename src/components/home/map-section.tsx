"use client";

import React from 'react'
import { LocationsMapLoader, Show } from '../common'
import { useMapManagementHomeStore } from '@/store';
import { Session } from 'next-auth';
import { cn } from '@/lib';
import {
    Alert,
    AlertDescription,
    Button,
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '../ui';
import { X } from 'lucide-react';
import { LoginForm } from '../forms';
import { useTranslation } from 'react-i18next';
import CreateLocationForm from '../forms/create-location';
import {
    useMediaQuery
} from '@/hooks';


interface MapSectionProps {
    session: Session | null
}
export function MapSection({ session }: MapSectionProps) {
    const {
        showFeaturesPanel,
        setShowFeaturePanel
    } = useMapManagementHomeStore();
    const { t } = useTranslation();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <div
                className={`h-full w-full relative flex md:p-6 lg:px-6 xl:px-6 3xl:px-0`}
            >
                <Drawer open={showFeaturesPanel} onOpenChange={(_open) => setShowFeaturePanel(_open)}>
                    <DrawerContent className='h-[calc(100dvh-30px)] bg-gray-100'>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className="text-xl text-gray-600 font-semibold">
                                {session ? t("common:new_location") : t("common:login_required")}
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className="px-3 mt-1 md:mt-8 w-full">
                            <Show>
                                <Show.When
                                    isTrue={session?.user ? true : false}
                                >
                                    <CreateLocationForm />
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
                        <DrawerFooter className="pt-2">
                            <Button
                                className='text-sm text-gray-500' size={"sm"} variant="outline"
                                onClick={() => {
                                    setShowFeaturePanel(false)
                                }}
                            >
                                {t("common:key_cancel")}

                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <div className="h-full w-full relative">
                    <LocationsMapLoader />
                </div>
            </div>
        )
    }

    return (
        <div
            className={`h-full w-full relative flex md:p-6 lg:px-6 xl:px-6 3xl:px-0`}
        >
            <div
                className={cn("bg-white rounded-[10px] h-full hidden md:flex flex-col overflow-y-auto",
                    showFeaturesPanel ? "min-w-[30%] max-w-[30%] mr-6" : "w-0")}
            >
                <div className={cn(showFeaturesPanel ? "flex flex-col w-full" : "hidden")}>
                    <div className="sticky bg-white top-0 z-10 flex w-full justify-between items-center px-5 py-2 shadow-sm">
                        <h4 className="text-xl text-gray-600 font-semibold">
                            {session ? t("common:new_location") : t("common:login_required")}
                        </h4>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className='text-gray-500 text-sm'
                            onClick={() => setShowFeaturePanel(false)}
                        >
                            <X />
                        </Button>
                    </div>
                    <div className="p-5 z-0 w-full">
                        <Show>
                            <Show.When
                                isTrue={session?.user ? true : false}
                            >
                                <CreateLocationForm />
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
            <div className="h-full w-full relative">
                <LocationsMapLoader />
            </div>
        </div>
    )
}
