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
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface LandingPageHeaderProps {
    session: Session | null
}


export function LandingPageHeader({ session }: LandingPageHeaderProps) {
    const { t } = useTranslation();
    const { setShowFeaturePanel, showFeaturesPanel } = useMapManagementHomeStore();
    const router = useRouter();

    async function handleLogOut() {
        await signOut({
            redirect: true,
            callbackUrl: "/"
        });
    }
    return (
        <div className='w-full py-5 px-2.5 md:px-10 shadow-sm flex justify-between items-center bg-white'>
            <Link
                className="font-bold text-2xl uppercase flex items-center gap-0"
                href={"/"}
            >
                EL<MapPin className='text-primary' />CATE
            </Link>
            <div className=""></div>
            <div className="flex items-center justify-center gap-2">
                <Button
                    className='hidden md:flex'
                    disabled={showFeaturesPanel}
                    onClick={() => {
                        router.push("/");
                        setShowFeaturePanel(true);
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
                        router.push("/");
                        setShowFeaturePanel(true);
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
                                        className="rounded-full"
                                    >
                                        <Image
                                            src={session?.user?.image || "https://xbdgwqtbznvmtego.public.blob.vercel-storage.com/image-holder-2pmCXbVYo0ZyBj3NRMBlnZeoR3xklh.png"}
                                            width={36}
                                            height={36}
                                            alt="Avatar"
                                            className="rounded-full"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className='w-52'>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-[16px] text-gray-500 font-medium'>Settings</DropdownMenuItem>
                                    <DropdownMenuItem className='text-[16px] text-gray-500 font-medium'>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className='hover:bg-red-300'
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
