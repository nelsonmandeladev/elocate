import { LandingPageFooter, LandingPageHeader } from '@/components'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}
export default function layout({ children }: LayoutProps) {
    return (
        <div>
            <LandingPageHeader />
            {children}
            <LandingPageFooter />
        </div>
    )
}
