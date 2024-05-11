"use client"

import React from 'react';
import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import { useLocations, useMediaQuery, useReverseCoding } from '@/hooks';
import { useMapLocationInteractions } from '@/store';
import { LocationType } from '@/types/app.type';
import { LocationMarker } from '../map-markers';
import { ExpandLocationsListZone } from './area-extender';
import { debounce } from '@/lib';
import { MapPin } from 'lucide-react';
import { Spinner } from '@/components/ui';


export function LocationsMapLoader() {
    const { listAllLocations } = useLocations();
    const {
        locationsFound,
        maxDistance,
        loadingLocations,
        loadingReverseCoding,
        currentPosition
    } = useMapLocationInteractions();
    const [titlesLoaded, setTitlesLoaded] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    useEffect(() => {
        (currentPosition && locationsFound.length === 0) && listAllLocations(currentPosition as google.maps.LatLngLiteral, maxDistance);
    }, [listAllLocations, currentPosition, maxDistance, locationsFound]);


    return (
        <div className='relative rounded' style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
                {currentPosition ?
                    <Map
                        defaultCenter={currentPosition}
                        defaultZoom={isDesktop ? 15 : 13}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID as string}
                        disableDefaultUI={true}
                        backgroundColor={"none"}
                        onTilesLoaded={(event) => {
                            setTitlesLoaded(true);
                        }}
                        style={{
                            borderRadius: 5
                        }}
                    >
                        <Locations
                            locations={locationsFound}
                            currentPosition={currentPosition}
                        />
                    </Map> : null
                }
            </APIProvider>
            <div className="absolute bottom-10 w-full flex justify-center px-2.5">
                <ExpandLocationsListZone />
            </div>
            {loadingLocations || loadingReverseCoding || !titlesLoaded ?
                <div className="absolute top-0  w-full flex justify-center items-end">
                    <Spinner size={"large"} />
                </div> : null
            }
        </div>
    )
}

type Props = {
    locations: LocationType[],
    currentPosition: google.maps.LatLngLiteral
};



const Locations = ({ locations, currentPosition }: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);
    const { handelReversCoding } = useReverseCoding();

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    return (
        <>
            {locations.map((location) => (
                <AdvancedMarker
                    position={location}
                    key={location.id}
                    ref={(marker) => setMarkerRef(marker, location.id)}
                    onClick={() => {
                        console.log({ location })
                    }}
                >
                    <LocationMarker
                        location={location}
                    />
                </AdvancedMarker>
            ))}

            <AdvancedMarker
                position={currentPosition}
                ref={(marker) => setMarkerRef(marker, "current-position")}
                onDragEnd={(event) => {
                    const position = event.latLng?.toJSON() as google.maps.LatLngLiteral;
                    debounce(() => {
                        handelReversCoding(position);
                    }, 1000)();
                }}
                draggable
            >
                <MapPin className='text-primary cursor-pointer' size={50} />
            </AdvancedMarker>
        </>
    );
};