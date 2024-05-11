import { LocationsList } from '@/components';
import { auth } from '@/lib/auth-config'
import React, { Fragment } from 'react';

interface PageProps {
    params: {
        locale: string
    }
}
export default async function page(props: PageProps) {
    const { params: { locale } } = props;
    const session = await auth();
    return (
        <div className="w-full h-dvh flex justify-center px-2.5 py-5 md:py-10">
            <LocationsList
                session={session}
                locale={locale}
            />
        </div>
    )
}
