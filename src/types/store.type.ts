import { LocationType } from "./app.type";

export type MapManagementHomeType = {
    showFeaturesPanel: boolean;
    setShowFeaturePanel: (panelState: boolean) => void;
}

export type MapLocationInteractionsType = {
    loadingReverseCoding: boolean;
    setLoadingReverseCoding: () => void;

    reverseCodingResults: google.maps.GeocoderResult[] | null;
    setReverseCodingResults: (results: google.maps.GeocoderResult[]) => void;

    selectedPlace: google.maps.GeocoderResult | null;
    setSelectedPlace: (place: google.maps.GeocoderResult | null) => void;

    locationsFound: LocationType[];
    setLocationFound: (locations: LocationType[]) => void;

    loadingLocations: boolean;
    setLoadingLocations: () => void;

    maxDistance: number;
    setMaxDistance: (distance: number) => void;

    currentPosition: google.maps.LatLngLiteral | null,
    setCurrentPosition: (position: google.maps.LatLngLiteral | null) => void;

    addNewLocation: (location: LocationType) => void;

    selectedLocation: LocationType | null;
    setSelectedLocation: (location: LocationType | null) => void;
}

export type DrawerStoreType = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: () => void;
}