'use client';

import {
    ReactNode,
    useCallback,
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
    UploadFilesToVercelForm
} from "@/components"

import { Show } from "../../renderers";
import { useDropzone } from 'react-dropzone'
import { useMediaQuery } from "@/hooks";

interface UploadFilesToVercelProps {
    trigger?: ReactNode
}

export function UploadFilesToVercel({ trigger }: UploadFilesToVercelProps) {

    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");


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
                            <Button size={"icon"} variant={"outline"}>
                                Ajouter une image
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
                        <UploadFilesToVercelForm />
                    </div>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button size={"sm"} variant="outline">Cancel</Button>
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
                        <Button size={"icon"} variant={"outline"}>
                            Ajouter une image
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
                        <UploadFilesToVercelForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}