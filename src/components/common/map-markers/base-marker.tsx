"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";


interface MarkerProps {
    map: google.maps.Map | null;
    children: ReactNode;
    position: google.maps.LatLngLiteral
}


/**
 * Component for the current location marker.
 * @param avatar - The avatar of the user.
 * @param position - The position of the marker.
 * @param map - The map.
 * @returns A Marker component.
 */
function BaseMarker({ map, position, children }: MarkerProps): ReactNode {
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
    const rootRef = useRef<Root | null>(null);

    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement("div");
            rootRef.current = createRoot(container);

            markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                position,
                content: container
            });

        }
    }, [position])

    useEffect(() => {
        rootRef.current?.render(children);
        if (markerRef.current) {
            markerRef.current.position = position;
            markerRef.current.map = map;
        }
    }, [map, position, children]);

    return <></>;
}

export default BaseMarker;