import { MapSection } from '@/components'
import { auth } from '@/lib/auth-config'
import initTranslations from '@/lib/i18n'
import React from 'react'

interface PageProps {
    params: {
        locale: string
    }
}
export default async function page({ params: { locale } }: PageProps) {
    const { t } = await initTranslations(locale, ['home', 'common']);
    const session = await auth();
    return (
        <main
            className='h-[calc(100dvh-100px)] rounded'
        >
            <MapSection
                session={session}
            />
        </main>
    )
}
