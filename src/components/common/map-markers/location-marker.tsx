"use client";

import React from 'react'
import BaseMarker from './base-marker';
import { Button } from '@/components/ui';


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
        >
            <Button variant={"outline"} size={"icon"} className='rounded-full p-6'>
                ME
            </Button>
        </BaseMarker>
    )
}
