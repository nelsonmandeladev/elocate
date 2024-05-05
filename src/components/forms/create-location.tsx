"use client";

import React, { useState, useTransition } from 'react'
import { EachRenderer, Show, UploadFiles } from '../common'
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    ScrollArea,
    Textarea
} from '../ui'
import { ArrowRight, Map, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import {
    useMapLocationInteractions,
    useMapManagementHomeStore
} from '@/store';
import { useMediaQuery } from '@/hooks';
import { cn } from '@/lib';
import { CreateLocationType, StorageType } from '@/types/app.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    CreateLocationFormType,
    createLocationSchema
} from '@/types';
import { toast } from 'sonner';

export default function CreateLocationForm() {
    const { t } = useTranslation();
    const { reverseCodingResults, selectedPlace, setSelectedPlace } = useMapLocationInteractions();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { setShowFeaturePanel } = useMapManagementHomeStore();
    const [selectedPlaceImage, setSelectedPlaceImage] = useState<StorageType | null>(null);



    return (
        <div className='w-full'>
            <Show>
                <Show.When
                    isTrue={(reverseCodingResults && !selectedPlace) ? true : false}
                >
                    <p className="text-gray-500">
                        {t("common:listed_address_message")}
                    </p>
                    <ScrollArea className="h-[390px] md:h-[600px] w-full rounded-md py-0 mt-4">
                        <div className="flex flex-col gap-3 md:gap-5">
                            <EachRenderer<google.maps.GeocoderResult>
                                of={reverseCodingResults as google.maps.GeocoderResult[]}
                                render={(item) => (
                                    <div
                                        className={cn("p-3 md:p-5 rounded cursor-pointer transition-[background] duration-300", (item === selectedPlace) ? "bg-primary text-white" : "bg-white md:bg-gray-100 hover:bg-gray-200 text-gray-500")}
                                        onClick={() => {
                                            setSelectedPlace(item);
                                        }}
                                    >
                                        <p className="text-sm md:text-[16px] font-medium">
                                            {item.formatted_address}
                                        </p>
                                    </div>
                                )}
                            />
                        </div>
                    </ScrollArea>
                </Show.When>
                <Show.When
                    isTrue={selectedPlace ? true : false}
                >
                    <UploadFiles
                        onFileSelected={(file) => {
                            setSelectedPlaceImage(file);
                        }}
                    />

                    <FormElement
                        selectedPlace={selectedPlace}
                        placeImage={selectedPlaceImage}
                    />
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


interface FormElementProps {
    selectedPlace: google.maps.GeocoderResult | null,
    placeImage: StorageType | null
}


function FormElement({ selectedPlace, placeImage }: FormElementProps) {
    const { t } = useTranslation();
    const [isPending, startTransition] = useTransition();
    const form = useForm<CreateLocationFormType>({

        resolver: zodResolver(createLocationSchema),
        defaultValues: {
            formatted_address: selectedPlace?.formatted_address,
            description: ""
        }
    });

    async function onSubmit(data: CreateLocationFormType) {

        const request_data: CreateLocationType = {
            formatted_address: data.formatted_address,
            description: data.description,
            storage_id: placeImage?.id as string,
            lat: selectedPlace?.geometry.location.lat as unknown as number,
            lng: selectedPlace?.geometry.location.lng as unknown as number
        }

        startTransition(async () => {
            const response = await fetch("/api/locations", {
                method: "POST",
                body: JSON.stringify(request_data)
            })
            const response_data = await response.json();
            if (response.status === 201) {
                toast.success(t("common:add_location_success"), { duration: 10000 })
            } else {
                toast.error(t("common:add_location_success"), { duration: 10000 })
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6 md:space-y-10">
                <FormField
                    control={form.control}
                    name="formatted_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-gray-500 text-[16px] font-normal'>
                                {t("common:key_location_field_label")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='helolo'
                                    className="bg-gray-100 py-6"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-300' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-gray-500 text-[16px] font-normal'>
                                {t("common:key_description_field_label")}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none bg-gray-100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-300' />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {t("common:save_location_btn")}
                </Button>
            </form>
        </Form>
    )
}