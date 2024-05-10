import { LocationDetails } from '@/components'
import { BASE_URL } from '@/constants';
import { LocationType } from '@/types/app.type';
import { notFound } from 'next/navigation';
import React from 'react'

interface PageProps {
    params: {
        id: string,
        locale: string,
    }
}
export default async function page(props: PageProps) {
    const { params: { id, locale } } = props;

    // if (!id) {
    //     return notFound()
    // }

    const response = await fetch(`${BASE_URL}locations/${id}`)
    if (response.status === 404) {
        return notFound();
    }

    const location = await response.json() as LocationType;

    return (
        <div className='w-full min-h-dvh flex justify-center items-start py-5 md:py-10 px-2.5'>
            <div className="w-full md:max-w-[600px]">
                <LocationDetails
                    locale={locale}
                    location={location}
                />
            </div>
        </div>
    )
}
