"use client";
import { Slider } from '@/components'
import { cn, debounce } from '@/lib';
import { useMapLocationInteractions } from '@/store';
import React from 'react';


type SliderProps = React.ComponentProps<typeof Slider>

export function ExpandLocationsListZone({ className, ...props }: SliderProps) {
    const { maxDistance, setMaxDistance, locationsFound } = useMapLocationInteractions();
    return (
        <div className={cn("bg-white rounded border border-primary w-full md:w-96 shadow-sm p-5")}>

            <h4 className="mb-4 text-gray-500 m-0 flex justify-between items-center">
                <span>Showing: <span className="text-primary font-bold">{locationsFound.length} locations </span></span>
                <span>Within: <span className="text-primary font-bold">{maxDistance} KM</span></span>
            </h4>
            <Slider
                onValueCommit={(value) => {
                    debounce(() => {
                        setMaxDistance(value[0] / 10)
                    }, 1000)()
                }}
                defaultValue={[maxDistance * 10]}
                max={100}
                step={1}
                className={cn("w-full", className)}
                {...props}
            />
        </div>
    )
}
