import {
    useMapLocationInteractions,
    useMapManagementHomeStore
} from "@/store";
import { useCallback } from "react";


interface ReverseCodingReturnParams {
    handelReversCoding: (position: google.maps.LatLngLiteral) => Promise<void>;
}


export const useReverseCoding = (): ReverseCodingReturnParams => {

    const { setReverseCodingResults, setLoadingReverseCoding, setSelectedPlace } = useMapLocationInteractions();
    const { setShowFeaturePanel } = useMapManagementHomeStore();

    const handelReversCoding = useCallback(async (position: google.maps.LatLngLiteral) => {
        setLoadingReverseCoding();
        const response = await fetch("/api/geocoding", {
            method: "POST",
            body: JSON.stringify(position)
        });

        const responseData = await response.json() as google.maps.GeocoderResponse;
        const results = responseData.results;
        setReverseCodingResults(results);
        setSelectedPlace(null);
        setShowFeaturePanel(true);
        setLoadingReverseCoding();
    }, [setLoadingReverseCoding, setReverseCodingResults, setShowFeaturePanel, setSelectedPlace])

    return {
        handelReversCoding
    }
}