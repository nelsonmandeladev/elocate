import {
    useMapLocationInteractions,
    useMapManagementHomeStore
} from "@/store";


interface ReverseCodingReturnParams {
    handelReversCoding: (position: google.maps.LatLngLiteral) => Promise<void>;
}


export const useReverseCoding = (): ReverseCodingReturnParams => {

    const { setReverseCodingResults, setLoadingReverseCoding } = useMapLocationInteractions();
    const { setShowFeaturePanel } = useMapManagementHomeStore();

    async function handelReversCoding(position: google.maps.LatLngLiteral) {
        setLoadingReverseCoding();
        const response = await fetch("/api/geocoding", {
            method: "POST",
            body: JSON.stringify(position)
        });

        const responseData = await response.json() as google.maps.GeocoderResponse;
        const results = responseData.results;
        setReverseCodingResults(results);
        setShowFeaturePanel(true);
        setLoadingReverseCoding();
    }

    return {
        handelReversCoding
    }
}