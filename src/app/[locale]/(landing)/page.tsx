import { MapSection } from '@/components'
import initTranslations from '@/lib/i18n'
import React from 'react'

interface PageProps {
    params: {
        locale: string
    }
}
export default async function page({ params: { locale } }: PageProps) {
    const { t } = await initTranslations(locale, ['home', 'common'])
    return (
        <main
            className='h-[calc(100dvh-100px)] flex justify-center items-center'
        >
            <MapSection />
        </main>
    )
}
