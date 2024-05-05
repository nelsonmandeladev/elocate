"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseMap } from './base-map-loader';
import { useReverseCoding } from '@/hooks';
import { debounce } from '@/lib';
import { Spinner } from '@/components/ui';
import { useMapLocationInteractions } from '@/store';

function LocationsMapLoader() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lng: 0, lat: 0 });
    const { handelReversCoding } = useReverseCoding();
    const { loadingReverseCoding } = useMapLocationInteractions();

    const handleInitMap = useCallback(() => {
        if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: currentLocation,
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: false,
                mapId: "8d26521b58a10775",

            });
            const draggableMarker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: currentLocation,
                gmpDraggable: true,
            })
            draggableMarker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
                const position = draggableMarker.position as google.maps.LatLngLiteral;
                debounce(() => {
                    handelReversCoding(position);
                }, 1000)()

            })
            setMap(map);
        }
    }, [currentLocation, handelReversCoding]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                lng: position.coords.longitude,
                lat: position.coords.latitude
            })
        });
    }, []);

    useEffect(() => {
        if (currentLocation) {
            handleInitMap();
        }
    }, [currentLocation, handleInitMap])

    return (
        <>
            <div
                ref={mapRef}
                id="map"
                style={{
                    height: "100%",
                    borderRadius: "10px",
                }}
                className='relative'
            />
            <div className="absolute right-[50%] bottom-10">
                {loadingReverseCoding ?
                    <Spinner
                        size={"large"}
                    /> : null
                }
            </div>

            {/* <CurrentLocationMarker
                map={map}
                position={currentLocation}

            /> */}
        </>
    )
}


export function LocationsMap() {
    return (
        <BaseMap>
            <LocationsMapLoader />
        </BaseMap>
    )
}