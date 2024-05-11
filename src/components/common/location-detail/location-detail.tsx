"use client";

import { LocationType } from '@/types/app.type'
import { ArrowRightLeft, CalendarDays, MapPinned, UserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { formatDistance } from 'date-fns'
import { useTranslation } from 'react-i18next';
import { fr, enUS } from "date-fns/locale";
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useMapLocationInteractions } from '@/store';
import { SocialShareButtons } from '../share-buttons';


interface LocationDetailsProps {
    location: LocationType,
    locale: string
}
export function LocationDetails(props: LocationDetailsProps) {
    const { location, locale } = props;
    const { t } = useTranslation();
    const { currentPosition } = useMapLocationInteractions();

    return (
        <div className="">
            <div className='bg-white shadow-ms rounded w-full flex flex-col gap-4 pb-5'>
                <div className="aspect-auto rounded relative h-[300px] md:min-h-[350px] md:max-h-[350px] bg-gray-200">
                    <Image
                        src={location.image.url}
                        alt={location.image.pathname}
                        width={500}
                        height={500}
                        className='w-full h-full rounded object-cover'
                    />
                </div>
                <div className="flex flex-col gap-2 p-5">
                    <h4 className="text-xl font-semibold text-gray-600 flex justify-start items-start gap-3">

                        <div className="min-W-[10%]">
                            <MapPinned size={30} className='text-primary' />
                        </div>
                        {location.formatted_address}
                    </h4>
                    <p className="text-[16px] text-gray-600">
                        {location.description}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center px-5">
                    <div className="flex justify-start items-center bg-gray-100 px-5 py-2.5 rounded-full gap-3 text-gray-600 font-semibold">
                        <CalendarDays />
                        <p className="">
                            {formatDistance(new Date(location.createdAt), new Date(), {
                                addSuffix: true,
                                locale: locale === "fr" ? fr : enUS
                            })}
                        </p>
                    </div>
                    <div className="flex justify-start items-center border border-primary px-5 py-2.5 rounded-full gap-3 text-primary font-normal">
                        <UserRound />
                        <p className="">
                            {location.user.name}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-4 mt-6 md:mt-10 px-5">
                    <h4 className="text-lg text-gray-700 font-medium">
                        Share
                    </h4>
                    <SocialShareButtons />
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-6 md:mt-10">
                <h4 className="text-lg text-gray-700 font-medium">
                    Direction

                </h4>
                <Link
                    href={`https://www.google.com/maps/dir/${currentPosition?.lat},${currentPosition?.lng}/${location.lat},${location.lng}`}
                    target='_blank'
                >
                    <Button
                        size={"sm"} variant={"default"} className='flex gap-2 text-[16px] font-normal'

                    >
                        <ArrowRightLeft />
                        {t("common:key_get_direction")}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
