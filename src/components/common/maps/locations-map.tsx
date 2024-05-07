"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseMap } from './base-map-loader';
import { useLocations, useReverseCoding } from '@/hooks';
import { debounce } from '@/lib';
import { Spinner } from '@/components/ui';
import { useMapLocationInteractions } from '@/store';
import { LocationMarker } from '../map-markers';
import { EachRenderer } from '../renderers';
import { LocationType } from '@/types/app.type';
import { ExpandLocationsListZone } from './area-extender';
import { RadialAnimation } from '../animation';


interface LocationsMapLoaderProps {
    locations: LocationType[],
    currentLocation: google.maps.LatLngLiteral
}
function LocationsMapLoader({ locations, currentLocation }: LocationsMapLoaderProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const { handelReversCoding } = useReverseCoding();
    const { loadingLocations, loadingReverseCoding } = useMapLocationInteractions();

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
                }, 1000)();

            })
            setMap(map);
        }
    }, [currentLocation, handelReversCoding]);

    useEffect(() => {
        if (currentLocation) {
            handleInitMap();
        }
    }, [currentLocation, handleInitMap]);


    return (
        <>
            <div
                ref={mapRef}
                id="map"
                style={{
                    height: "100%",
                    borderRadius: "10px",
                }}
                className='relative flex justify-center'
            />
            {loadingReverseCoding ?
                <div className="absolute right-[50%] bottom-10">
                    <Spinner
                        size={"large"}
                    />
                </div>
                : null
            }
            <EachRenderer<LocationType>
                of={locations}
                render={(location, index) => location && (
                    <LocationMarker
                        key={`location-${index}`}
                        map={loadingLocations ? null : map}
                        position={{
                            lat: location.lat,
                            lng: location.lng
                        }}
                        location={location}
                    />
                )}
            />
        </>
    )
}


export function LocationsMap() {

    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lng: 0, lat: 0 });
    const { listAllLocations } = useLocations();
    const { locationsFound, maxDistance } = useMapLocationInteractions();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                lng: position.coords.longitude,
                lat: position.coords.latitude
            })
        });
    }, []);


    useEffect(() => {
        listAllLocations(currentLocation, maxDistance);
    }, [listAllLocations, currentLocation, maxDistance]);


    return (
        <BaseMap>
            <LocationsMapLoader
                locations={locationsFound}
                currentLocation={currentLocation}
            />
            <div className="absolute bottom-10 w-full flex justify-center px-2.5">
                <ExpandLocationsListZone />
            </div>
        </BaseMap>
    )
}