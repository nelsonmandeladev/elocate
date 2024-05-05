import { MapLocationInteractionsType } from "@/types";
import { LocationType } from "@aws-sdk/client-s3";
import { create } from "zustand";

export const useMapLocationInteractions = create<MapLocationInteractionsType>((set) => ({
    reverseCodingResults: null,
    selectedPlace: null,
    loadingReverseCoding: false,
    locationsFound: [],
    setReverseCodingResults: (results) => set((state) => ({
        reverseCodingResults: results
    })),
    setSelectedPlace: (place) => set((state) => ({
        selectedPlace: place
    })),
    setLoadingReverseCoding: () => set((state) => ({
        loadingReverseCoding: !state.loadingReverseCoding,
    })),
    setLocationFound: (locations) => set((state) => ({
        locationsFound: locations,
    })),
}))