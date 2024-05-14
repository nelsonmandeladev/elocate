import React from 'react'
import { ManageUserSettings } from './components/settings'
import { auth } from '@/lib/auth-config'
import { notFound } from 'next/navigation';

export default async function page() {
    const session = await auth();

    if (!session?.user?.id) {
        return notFound();
    }
    return (
        <div>
            <ManageUserSettings
                session={session}
            />
        </div>
    )
}
