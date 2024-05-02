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
    setSelectedPlace: (place: google.maps.GeocoderResult) => void;
}