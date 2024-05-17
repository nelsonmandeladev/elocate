"use client";

import { useLocations, useMediaQuery } from '@/hooks';
import { useMapLocationInteractions } from '@/store';
import { Session } from 'next-auth'
import React, { Fragment, useEffect, useState } from 'react'
import { EachRenderer, ExpandLocationsListZone, LocationDetails } from '../common';
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
        if (currentPosition) {
            listAllLocations(currentPosition as google.maps.LatLngLiteral, maxDistance);
        }
    }, [currentPosition, maxDistance, listAllLocations]);

    useEffect(() => {
        if (isDesktop) {
            setSelectedLocation(locationsFound[0])
        }
    }, [isDesktop, setSelectedLocation, locationsFound]);


    return (
        <Fragment>

            <div className="w-full md:max-w-[1000px] flex flex-col md:flex-row lg:gap-20">
                <div className="flex md:hidden justify-center w-full mb-4">
                    <ExpandLocationsListZone />
                </div>
                {
                    locationsFound.length === 0 ?
                        <div className=" w-full flex flex-col justify-start gap-3">
                            <span className='text-[45px]'>🥡</span>
                            <h1 className='text-xl text-gray-600'>The box is empty </h1>
                            <p className="text-gray-500">
                                Nothing to show within the selected era. Try expanding a little bit more 🦾
                            </p>
                        </div> : null
                }

                <ScrollArea className="w-full md:max-w-[35%] relative overflow-y-auto rounded">
                    {loadingLocations ?
                        <div className="absolute w-full justify-center top-0 z-20">
                            <Spinner
                                size={"large"}
                            />
                        </div> : null
                    }
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
                <div className="w-full hidden md:flex flex-col relative">
                    <div className="sticky top-10 w-full">
                        <div className="flex justify-center w-full mb-4">
                            <ExpandLocationsListZone />
                        </div>
                        {selectedLocation ?
                            <LocationDetails
                                location={selectedLocation}
                                locale={locale}
                            /> : null
                        }
                    </div>
                </div>
            </div>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className='h-[calc(100dvh-30px)] bg-gray-100'>
                    <ScrollArea className="w-full md:max-w-[35%] relative overflow-y-auto px-4 rounded">
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
