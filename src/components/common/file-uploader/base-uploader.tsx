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
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Button,
    UploadFilesForm
} from "@/components"

import { Show } from "../renderers";
import { useMediaQuery } from "@/hooks";
import { CloudUpload } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UploadFilesProps {
    trigger?: ReactNode
}

export function UploadFiles({ trigger }: UploadFilesProps) {

    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { t } = useTranslation();


    if (!isDesktop) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <Button
                    className='flex justify-center text-[16px] gap-5 items-center w-full bg-gray-100 text-gray-600 font-normal'
                    variant={"outline"}
                    onClick={() => setOpen(true)}
                >
                    <CloudUpload size={20} />
                    {t("common:add_media_trigger_btn")}
                </Button>
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
                        <UploadFilesForm />
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
        <Dialog>
            <DialogTrigger className="w-full">
                <Show>
                    <Show.When
                        isTrue={trigger ? true : false}
                    >
                        {trigger}
                    </Show.When>
                    <Show.When
                        isTrue={!trigger ? true : false}
                    >
                        <Button
                            className='flex justify-center gap-5 items-center py-8 w-full bg-gray-100 text-gray-600 font-normal'
                            variant={"outline"}
                            size={"lg"}
                        >
                            <CloudUpload />
                            {t("common:add_media_trigger_btn")}
                        </Button>
                    </Show.When>
                </Show>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] min-w-[800px] min-h-[600px] bg-gray-100">
                <DialogHeader>
                    <DialogTitle>
                        {t("common:media_manager_title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("common:media_manager_content")}
                    </DialogDescription>
                    <div className="h-full w-full pt-5">
                        <UploadFilesForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}