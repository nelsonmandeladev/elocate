'use client';

import {
    ReactNode,
    useState
} from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    Button,
    UploadFilesForm
} from "@/components"

import { Show } from "../renderers";
import { useMediaQuery } from "@/hooks";
import { CloudUpload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StorageType } from "@/types/app.type";
import Image from "next/image";

interface UploadFilesProps {
    onFileSelected?: (file: StorageType) => void,
}

export function UploadFiles({ onFileSelected }: UploadFilesProps) {

    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { t } = useTranslation();
    const [selectedStorage, setSelectedStorage] = useState<StorageType | null>(null)


    if (!isDesktop) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <div className="flex gap-2">
                    <Button
                        className='flex justify-center text-[16px] gap-5 items-center w-full bg-gray-100 text-gray-600 font-normal'
                        variant={"outline"}
                        onClick={() => setOpen(true)}
                    >
                        <CloudUpload size={20} />
                        {t("common:add_media_trigger_btn")}
                    </Button>
                    {selectedStorage ?
                        <div className="aspect-auto rounded min-h-[50px] max-h-[50px]: min-w-[50px] max-w-[50px] bg-gray-300">
                            <Image
                                src={selectedStorage?.url ?? ""}
                                alt={selectedStorage?.pathname ?? ""}
                                width={50}
                                height={50}
                                className='w-full h-full rounded object-cover'
                            />
                        </div> : null
                    }
                </div>
                <DrawerContent className='h-[calc(100dvh-70px)] bg-gray-100'>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>
                            {t("common:media_manager_title")}
                        </DrawerTitle>
                        <DrawerDescription>
                            {t("common:media_manager_content")}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 mt-4">
                        <UploadFilesForm
                            onStorageSelected={(file) => {
                                onFileSelected && onFileSelected(file);
                                setSelectedStorage(file);
                                setOpen(false)
                            }}
                        />
                    </div>
                    <DrawerFooter className="pt-2">
                        <Button
                            className='text-sm text-gray-500' size={"sm"} variant="outline"
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            {t("common:key_cancel")}

                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex gap-2">
                <Button
                    className='flex justify-center text-[16px] gap-5 items-center w-full bg-gray-100 text-gray-600 font-normal py-10'
                    variant={"outline"}
                    onClick={() => setOpen(true)}
                >
                    <CloudUpload size={20} />
                    {t("common:add_media_trigger_btn")}
                </Button>
                {selectedStorage ?
                    <div className="aspect-auto rounded md:min-h-[150px] md:max-h-[150px] md:min-w-[150px] md:max-w-[150px] bg-gray-300">
                        <Image
                            src={selectedStorage?.url ?? ""}
                            alt={selectedStorage?.pathname ?? ""}
                            width={150}
                            height={150}
                            className='w-full h-full rounded object-cover'
                        />
                    </div> : null
                }
            </div>
            <DialogContent className="sm:max-w-[425px] min-w-[800px] min-h-[600px] bg-gray-100">
                <DialogHeader>
                    <DialogTitle>
                        {t("common:media_manager_title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("common:media_manager_content")}
                    </DialogDescription>
                    <div className="h-full w-full pt-5">
                        <UploadFilesForm
                            onStorageSelected={(file) => {
                                onFileSelected && onFileSelected(file);
                                setSelectedStorage(file);
                                setOpen(false);
                            }}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}