import { MapLocationInteractionsType } from "@/types";
import { create } from "zustand";

export const useMapLocationInteractions = create<MapLocationInteractionsType>((set) => ({
    reverseCodingResults: null,
    selectedPlace: null,
    loadingReverseCoding: false,
    setReverseCodingResults: (results) => set((state) => ({
        reverseCodingResults: results
    })),
    setSelectedPlace: (place) => set((state) => ({
        selectedPlace: place
    })),
    setLoadingReverseCoding: () => set((state) => ({
        loadingReverseCoding: !state.loadingReverseCoding,
    }))
}))