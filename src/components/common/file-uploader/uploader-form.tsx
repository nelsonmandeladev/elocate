"use client"

import { Button, Input, ScrollArea, Skeleton, Spinner } from '@/components';
import { cn, debounce } from '@/lib';
import { StorageType } from '@/types/app.type';
import { CheckCircle, Grid, List, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment, useCallback, useEffect, useState, useTransition } from 'react'
import { useDropzone } from 'react-dropzone';
import { EachRenderer } from '../renderers/list-items';

export function UploadFilesToVercelForm() {
    const [storage, setStorage] = useState<StorageType | null>(null);
    const [storages, setStorages] = useState<StorageType[]>([]);
    const [isPending, startTransitions] = useTransition();
    const [loadFiles, startLoading] = useTransition();


    const handleSaveFile = useCallback((formData: FormData) => {
        startTransitions(async () => {
            const response = await fetch("/api/files?destination=aws-s3", {
                method: "POST",
                body: formData
            });

            if (response.status === 201) {
                const responseData = await response.json();
                setStorage(responseData);
                setStorages([responseData, ...storages]);
            } else {
                const error = await response.json();
                console.log({ error })
            }
        })
    }, [storages]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData: FormData = new FormData();
        formData.append("file", acceptedFiles[0]);

        debounce(() => {
            handleSaveFile(formData);
        }, 1000)();

    }, [handleSaveFile]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const handleFetchFiles = useCallback(() => {
        startLoading(async () => {
            const response = await fetch("/api/files?for=user");

            if (response.status === 200) {
                const responseData = await response.json();
                setStorages(responseData)
            } else {
                const error = await response.json();
                console.log({ error })
            }
        });
    }, []);


    useEffect(() => {
        handleFetchFiles();
    }, [handleFetchFiles])



    return (
        <Fragment>
            <div className='relative'>
                <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className="border p-2 rounded-md max-w-min mx-auto">
                            {isPending ? <Spinner size={"small"} /> : <UploadCloud size={20} />}
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10 MB &#41;
                        </p>
                    </div>
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                    disabled={isPending}
                />
            </div>
            <div className="flex mt-5 justify-between items-center gap-4">
                <h3 className="ext-lg md:text-xl text-gray-600 font-medium m-0">Your filles</h3>
                <div className="flex gap-2 items-center justify-center">
                    <Button size={"icon"} variant={"outline"} className='text-gray-600'>
                        <List />
                    </Button>
                    <Button size={"icon"}>
                        <Grid />
                    </Button>
                </div>
            </div>
            <ScrollArea className="h-[250px] md:h-[400px] w-full rounded-md mt-4">
                <div className="grid grid-cols-4 gap-2 mt-5">
                    {loadFiles ?
                        Array.from({ length: 8 }, (_, index) => (
                            <Skeleton key={index} className="h-[75px] md:h-[180px] w-full  rounded bg-gray-400/50" />
                        )) :
                        null
                    }
                    <EachRenderer<StorageType>
                        of={storages}
                        render={(item) => (
                            <div
                                className={cn("aspect-auto rounded relative cursor-pointer min-h-[175px] max-h-[175px]")}
                                onClick={() => setStorage(item)}
                            >
                                <Image
                                    src={item.url}
                                    alt={item.pathname}
                                    width={100}
                                    height={100}
                                    className='w-full h-full rounded object-cover'
                                />
                                {item.id === storage?.id ?
                                    <div className="absolute text-white left-1 top-1">
                                        <CheckCircle className='' size={15} />
                                    </div> : null
                                }
                            </div>
                        )}
                    />
                </div>
            </ScrollArea>
        </Fragment>
    )
}
