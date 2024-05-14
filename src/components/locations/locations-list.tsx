"use client";

import { useLocations, useMediaQuery } from '@/hooks';
import { useMapLocationInteractions } from '@/store';
import { Session } from 'next-auth'
import React, { Fragment, useEffect, useState } from 'react'
import { EachRenderer, LocationDetails } from '../common';
import { LocationCard } from '../cards';
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerFooter,
    ScrollArea,
    Spinner
} from '../ui';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib';

interface LocationsListProps {
    session: Session | null,
    locale: string
}

export function LocationsList(props: LocationsListProps) {
    const { session, locale } = props;
    const { t } = useTranslation();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const {
        locationsFound,
        maxDistance,
        currentPosition,
        loadingLocations,
        selectedLocation,
        setSelectedLocation
    } = useMapLocationInteractions();

    const { listAllLocations } = useLocations();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (currentPosition && locationsFound.length === 0) {
            listAllLocations(currentPosition as google.maps.LatLngLiteral, maxDistance);
        }
    }, [locationsFound, currentPosition, maxDistance, listAllLocations]);

    useEffect(() => {
        if (isDesktop) {
            setSelectedLocation(locationsFound[0])
        }
    }, [isDesktop, setSelectedLocation, locationsFound]);


    return (
        <Fragment>
            {loadingLocations ?
                <div className="">
                    <Spinner
                        size={"large"}
                    />
                </div> :
                <div className="w-full md:max-w-[1000px] flex flex-col md:flex-row lg:gap-20">
                    <ScrollArea className="w-full md:max-w-[35%] relative overflow-y-auto">
                        <div className="flex flex-col gap-6 sticky top-10">
                            <EachRenderer
                                of={locationsFound}
                                render={(location) => (
                                    <LocationCard
                                        location={location}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            !isDesktop && setDrawerOpen(true)
                                        }}

                                    />
                                )}
                            />
                        </div>
                    </ScrollArea>
                    <div className="w-full hidden md:flex relative">
                        <div className="sticky top-10 w-full">
                            {selectedLocation ?
                                <LocationDetails
                                    location={selectedLocation}
                                    locale={locale}
                                /> : null
                            }
                        </div>
                    </div>
                </div>
            }
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className='h-[calc(100dvh-30px)] bg-gray-100'>
                    <ScrollArea className="w-full md:max-w-[35%] relative overflow-y-auto px-4">
                        {selectedLocation ?
                            <LocationDetails
                                location={selectedLocation}
                                locale={locale}
                            /> : null
                        }
                    </ScrollArea>
                    <DrawerFooter className="pt-2">
                        <Button
                            className='text-sm text-gray-500' size={"sm"} variant="outline"
                            onClick={() => {
                                setDrawerOpen(false)
                            }}
                        >
                            {t("common:key_cancel")}

                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}
