"use client";

import React, { useTransition } from 'react'
import BaseMarker from './base-marker';
import { MapPin } from 'lucide-react';
import { debounce } from '@/lib';
import { Button, Spinner } from '@/components/ui';

interface LocationMarkerProps {
    map: google.maps.Map | null;
    position: google.maps.LatLngLiteral;
}


export function CurrentLocationMarker(props: LocationMarkerProps) {
    const { map, position } = props;
    const [pending, startTransition] = useTransition();


    async function handleReverseGeocoding(position: google.maps.LatLngLiteral) {
        const response = await fetch("/api/geocoding", {
            method: "POST",
            body: JSON.stringify(position)
        });
        const responseData = await response.json();
        console.log({ responseData })
    }
    function handleDragEnd(position: google.maps.LatLngLiteral) {
        debounce(async () => {
            handleReverseGeocoding(position)
        }, 1000)();
    }
    return (
        <BaseMarker
            position={position}
            map={map}
            draggable={true}
            onDragEnd={(position) => {
                handleDragEnd(position)
            }}

        >
            <Button size={"icon"} variant={"ghost"} disabled={pending} className='size-[60px]'>
                <MapPin className='text-primary cursor-pointer' size={60} />
            </Button>

        </BaseMarker>
    )
}
