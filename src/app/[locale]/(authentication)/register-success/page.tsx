import { auth } from '@/lib/auth-config'
import { headers } from 'next/headers';
import React from 'react'
import SuccessCard from './components/success-card';
import { notFound } from 'next/navigation';

export default async function page() {
    const session = await auth();

    if (!session) {
        return notFound();
    }
    return (
        <SuccessCard
            session={session}
        />
    )
}
