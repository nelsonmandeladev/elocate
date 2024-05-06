"use client";

import { RadialAnimation, Spinner } from '@/components';
import React from 'react'

export default function Loading() {
    return (
        <div className='h-dvh flex justify-center items-center'>
            <Spinner
                size={"large"}
            />
            {/* <RadialAnimation /> */}
        </div>
    )
}
