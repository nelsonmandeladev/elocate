import { DrawerStoreType } from "@/types";
import { create } from "zustand";

export const useDrawerStore = create<DrawerStoreType>((set) => ({
    isDrawerOpen: false,
    setIsDrawerOpen: () => set((state) => ({
        isDrawerOpen: !state.isDrawerOpen
    }))
}))