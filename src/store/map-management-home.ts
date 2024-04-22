import { MapManagementHomeType } from '@/types'
import { create } from 'zustand'


export const useMapManagementHomeStore = create<MapManagementHomeType>((set) => ({
    showFeaturesPanel: false,
    setShowFeaturePanel: (panelState) => set((state) => ({
        showFeaturesPanel: panelState
    }))
}))