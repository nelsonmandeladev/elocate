import { Button } from '@/components'
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
            className='h-dvh flex justify-center items-center'
        >
            <Button >
                {t("hello_world")}
            </Button>
        </main>
    )
}
