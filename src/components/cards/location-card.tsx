import { cn, truncateText } from '@/lib';
import { LocationType } from '@/types/app.type'
import { ArrowRightLeft, Eye, Link, MapPinned } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Button } from '../ui';
import { useMapLocationInteractions } from '@/store';

interface LocationCardProps {
    location: LocationType,
    onClick?: () => void
}
export function LocationCard(props: LocationCardProps) {
    const { location, onClick } = props;
    const { selectedLocation } = useMapLocationInteractions();
    return (
        <div
            className={cn("flex flex-col gap-3 w-ful bg-white rounded cursor-pointer hover:shadow-md transition-all duration-300", location.id === selectedLocation?.id ? "shadow-md " : "shadow-sm")}
            onClick={() => onClick && onClick()}
        >
            <div className="aspect-auto rounded relative cursor-pointer h-[300px] md:min-h-[250px] md:max-h-[250px] bg-gray-200">
                <Image
                    src={location.image.url}
                    alt={location.image.pathname}
                    width={500}
                    height={500}
                    className='w-full h-full rounded object-cover'
                />
            </div>
            <div className="flex flex-col gap-4 p-3">
                <h4 className="text-lg font-semibold text-gray-600 flex justify-start items-start gap-3">

                    <div className="min-W-[10%]">
                        <MapPinned size={30} className='text-primary' />
                    </div>
                    {truncateText(location.formatted_address, 32)}
                </h4>
                <p className="text-[16px] text-gray-600">
                    {truncateText(location.description, 50)}
                </p>
            </div>
        </div>
    )
}
