import { LandingPageFooter, LandingPageHeader } from '@/components'
import { auth } from '@/lib/auth-config'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}
export default async function layout({ children }: LayoutProps) {
    const session = await auth();
    return (
        <div className='relative'>
            <LandingPageHeader
                session={session}
            />
            {children}
            {/* <LandingPageFooter /> */}
        </div>
    )
}
