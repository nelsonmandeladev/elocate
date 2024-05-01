"use client";

import React from 'react'
import { UploadFiles } from '../common'
import { Button } from '../ui'
import { CloudUpload } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function CreateLocationForm() {
    const { t } = useTranslation()
    return (
        <div className='w-full'>
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
        </div>
    )
}
