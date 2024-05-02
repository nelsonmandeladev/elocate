"use client";

import React from 'react'
import { EachRenderer, Show, UploadFiles } from '../common'
import { Button, ScrollArea } from '../ui'
import { ArrowRight, CloudUpload, Map, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { useMapLocationInteractions, useMapManagementHomeStore } from '@/store';
import { useMediaQuery } from '@/hooks';

export default function CreateLocationForm() {
    const { t } = useTranslation();
    const { reverseCodingResults } = useMapLocationInteractions();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { setShowFeaturePanel } = useMapManagementHomeStore();


    return (
        <div className='w-full'>
            <Show>
                <Show.When
                    isTrue={reverseCodingResults ? true : false}
                >
                    <div className="">
                        <UploadFiles
                            trigger={<Button
                                className='flex justify-center gap-5 items-center py-8 w-full bg-gray-100 text-gray-600 font-normal'
                                variant={"outline"}
                                size={"lg"}
                            >
                                <CloudUpload />
                                {t("common:select_image_btn")}
                            </Button>}
                        />

                        <ScrollArea className="h-[430px] md:h-[580px] w-full rounded-md mt-3 md:mt-6 py-0">
                            <div className="flex flex-col gap-3 md:gap-5">
                                <EachRenderer<google.maps.GeocoderResult>
                                    of={reverseCodingResults as google.maps.GeocoderResult[]}
                                    render={(item) => (
                                        <div
                                            className="p-3 md:p-5 bg-white md:bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-[background] duration-300"
                                        >
                                            <p className="text-sm md:text-[16px] text-gray-500">
                                                {item.formatted_address}
                                            </p>
                                        </div>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                    </div>

                </Show.When>
                <Show.Else>
                    <div className="">
                        <p className="text-gray-500 m-0">
                            {t("common:create_location_description")}
                        </p>
                    </div>
                    <ScrollArea className="h-[400px] md:h-auto w-full rounded-md mt-3 md:mt-6 py-0">
                        <div className="flex flex-col gap-4 md:gap-8">
                            <div className="p-5 bg-white md:bg-gray-100 rounded flex flex-col justify-start items-start gap-3 md:gap-6 ">
                                <MapPin
                                    size={isDesktop ? 50 : 30}
                                    className='text-primary'
                                />
                                <div className="">
                                    <h4 className="font-semibold text-[15px] md:text-lg text-gray-600">
                                        {t("common:create_location_current_location_title")}
                                    </h4>
                                    <p className="mt-3 text-sm text-gray-500">
                                        {t("common:create_location_current_location_content")}
                                    </p>
                                    <Button
                                        variant={"outline"}
                                        size={"sm"}
                                        className='flex md:hidden gap-3 justify-start items-center mt-3 text-sm text-gray-600'
                                    >
                                        {t("register_success:get_started_btn")} <ArrowRight size={20} />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-5 bg-white md:bg-gray-100 rounded flex flex-col justify-start items-start gap-3 md:gap-6">
                                <Map
                                    size={isDesktop ? 50 : 30}
                                    className='text-primary'
                                />
                                <div className="">
                                    <h4 className="font-semibold text-[16px] md:text-lg text-gray-600">
                                        {t("common:create_location_choose_location_title")}
                                    </h4>
                                    <p className="mt-3 text-sm text-gray-500">
                                        {t("common:create_location_choose_location_content")}
                                    </p>
                                    <Button
                                        onClick={() => setShowFeaturePanel(false)}
                                        variant={"outline"}
                                        size={"sm"}
                                        className='flex md:hidden gap-3 justify-start items-center mt-3 text-sm text-gray-600'
                                    >
                                        {t("register_success:get_started_btn")} <ArrowRight size={20} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </Show.Else>
            </Show>


        </div>
    )
}
