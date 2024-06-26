import { useMapLocationInteractions } from "@/store";
import { useCallback } from "react";

export function useLocations() {
    const { setLocationFound, setLoadingLocations } = useMapLocationInteractions();

    const listAllLocations = useCallback(async (position: google.maps.LatLngLiteral, distance: number) => {
        setLoadingLocations()
        const response = await fetch(`/api/locations?lat=${position.lat}&lng=${position.lng}&distance=${distance}`, {
            method: "GET"
        });

        if (response.status === 200) {
            const responseData = await response.json();
            setLocationFound(responseData)
        }
        setLoadingLocations()
    }, [setLocationFound, setLoadingLocations]);

    return {
        listAllLocations,
    }
}