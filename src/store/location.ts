import { MapLocationInteractionsType } from "@/types";
import { create } from "zustand";

export const useMapLocationInteractions = create<MapLocationInteractionsType>((set) => ({
    reverseCodingResults: null,
    selectedPlace: null,
    loadingReverseCoding: false,
    locationsFound: [],
    maxDistance: 5,
    loadingLocations: false,
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
    setMaxDistance: (distance) => set((state) => ({
        maxDistance: distance,
    })),
    setLoadingLocations: () => set((state) => ({
        loadingLocations: !state.loadingLocations
    }))
}))