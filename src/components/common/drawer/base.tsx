"use client";

import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent,
} from "@/components";
import { useDrawerStore } from '@/store';

interface DrawerBase {
    children: ReactNode
}
export function DrawerBase(props: DrawerBase) {
    const { children } = props;
    const { isDrawerOpen, setIsDrawerOpen } = useDrawerStore();
    return (
        <Sheet open={isDrawerOpen} onOpenChange={() => { setIsDrawerOpen() }}>
            <SheetContent className='bg-gray-200'>
                {children}
            </SheetContent>
        </Sheet>
    )
}
