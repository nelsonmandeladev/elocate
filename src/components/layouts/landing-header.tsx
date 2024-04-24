"use client";

import React from 'react'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui'
import { useTranslation } from 'react-i18next';
import {
    LanguageSwitcher,
    Show
} from '../common';
import {
    MapPin,
    Plus
} from 'lucide-react';
import { useMapManagementHomeStore } from '@/store';
import { Session } from 'next-auth';
import { signOut } from "next-auth/react"
import Image from 'next/image';


interface LandingPageHeaderProps {
    session: Session | null
}


export function LandingPageHeader({ session }: LandingPageHeaderProps) {
    const { t } = useTranslation();
    const { setShowFeaturePanel, showFeaturesPanel } = useMapManagementHomeStore();

    async function handleLogOut() {
        await signOut({
            redirect: true,
            callbackUrl: "/"
        });
    }
    return (
        <div className='w-full py-5 px-2.5 md:px-10 shadow-sm flex justify-between items-center bg-white'>
            <div className="font-bold text-xl uppercase">
                ELOCATE {showFeaturesPanel}
            </div>
            <div className=""></div>
            <div className="flex gap-2 items-center">
                <Button
                    className='hidden md:flex'
                    disabled={showFeaturesPanel}
                    onClick={() => {
                        setShowFeaturePanel(true)
                    }}
                >
                    <MapPin className='mr-2' />
                    {t("common:add_location_btn")}
                </Button>
                <Button
                    size={"icon"}
                    className='flex md:hidden'
                    disabled={showFeaturesPanel}
                    onClick={() => {
                        setShowFeaturePanel(true)
                    }}
                >
                    <Plus />
                </Button>
                <div className="ml-2.5 md:ml-10">
                    <Show>
                        <Show.When
                            isTrue={session?.user ? true : false}
                        >
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="overflow-hidden rounded-full"
                                    >
                                        <Image
                                            src={session?.user?.image || ""}
                                            width={36}
                                            height={36}
                                            alt="Avatar"
                                            className="overflow-hidden rounded-full"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className='w-52'>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogOut}
                                    >Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Show.When>
                        <Show.When
                            isTrue={!session?.user ? true : false}
                        >
                            <LanguageSwitcher />
                        </Show.When>
                    </Show>
                </div>
            </div>
        </div>
    )
}
