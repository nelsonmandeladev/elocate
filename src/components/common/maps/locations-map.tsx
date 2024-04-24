"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseMap } from './base-map-loader';
import { CurrentLocationMarker } from '../map-markers';

function LocationsMapLoader() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lng: 0, lat: 0 });

    const handleInitMap = useCallback(() => {
        if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: currentLocation,
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: false,
                mapId: "8d26521b58a10775",

            });
            setMap(map);
        }
    }, [currentLocation]);

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
            />

            <CurrentLocationMarker
                map={map}
                position={currentLocation}
            />
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