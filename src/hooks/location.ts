import { useMapLocationInteractions } from "@/store";
import { useCallback } from "react";

export function useLocations() {
    const { setLocationFound } = useMapLocationInteractions();

    const listAllLocations = useCallback(async () => {
        const response = await fetch("/api/locations", {
            method: "GET"
        });

        if (response.status === 200) {
            const responseData = await response.json();
            setLocationFound(responseData)
        }
    }, [setLocationFound]);

    return {
        listAllLocations,
    }
}