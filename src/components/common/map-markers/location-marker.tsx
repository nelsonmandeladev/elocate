"use client";

import React, { useState, useTransition } from 'react'
import BaseMarker from './base-marker';
import { MapPin } from 'lucide-react';
import { debounce } from '@/lib';
import { Button, Spinner } from '@/components/ui';
import { useReverseCoding } from '@/hooks';
import { useMapLocationInteractions } from '@/store';
interface LocationMarkerProps {
    map: google.maps.Map | null;
    position: google.maps.LatLngLiteral;
}


export function CurrentLocationMarker(props: LocationMarkerProps) {
    const { map, position } = props;
    const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral>();

    const { handelReversCoding } = useReverseCoding();
    const { loadingReverseCoding } = useMapLocationInteractions();

    async function handleReverseGeocoding(position: google.maps.LatLngLiteral) {
        setSelectedPosition(position);
        handelReversCoding(position);
    }


    function handleDragEnd(position: google.maps.LatLngLiteral) {
        debounce(async () => {
            handleReverseGeocoding(position)
        }, 1000)();
    }


    return (
        <BaseMarker
            position={selectedPosition ?? position}
            map={map}
            draggable={!loadingReverseCoding}
            onDragEnd={(position) => {
                handleDragEnd(position)
            }}

        >
            <Button size={"icon"} variant={"ghost"} className='size-[60px] bg-transparent hover:bg-transparent'>
                {loadingReverseCoding ?
                    <Spinner /> :
                    <MapPin className='text-primary cursor-pointer' size={60} />
                }
            </Button>

        </BaseMarker>
    )
}
