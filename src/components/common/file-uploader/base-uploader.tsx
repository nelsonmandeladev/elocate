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
                <DrawerTrigger className="w-full">
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
                </DrawerTrigger>
                <DrawerContent className='h-[calc(100dvh-70px)] bg-gray-100'>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit profile</DrawerTitle>
                        <DrawerDescription>
                            {"Make changes to your profile here. Click save when you're done."}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 mt-4">
                        <UploadFilesForm />
                    </div>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button className='text-sm text-gray-500' size={"sm"} variant="outline">
                                {t("common:key_cancel")}
                            </Button>
                        </DrawerClose>
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
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        {" Make changes to your profile here. Click save when you're done."}
                    </DialogDescription>
                    <div className="h-full w-full pt-5">
                        <UploadFilesForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}