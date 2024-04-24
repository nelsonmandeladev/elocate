import { auth } from '@/lib/auth-config'
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import React from 'react'
import SuccessCard from './components/success-card';
import { notFound } from 'next/navigation';
interface PageProps {
    params: {
        locale: string
    },
    request: NextRequest
}

export default async function page({ params: { locale }, request }: PageProps) {
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
