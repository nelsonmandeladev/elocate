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

    return (
        <BaseMarker
            position={position}
            map={map}
        // draggable={!loadingReverseCoding}
        // onDragEnd={(position) => {
        //     handleDragEnd(position)
        // }}

        >
            <Button size={"icon"} variant={"ghost"} className='size-[60px] bg-transparent hover:bg-transparent'>
                <MapPin className='text-primary cursor-pointer' size={60} />
            </Button>

        </BaseMarker>
    )
}
