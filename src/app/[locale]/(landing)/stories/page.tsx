import React from 'react'
import ComingSoong from './components/coming-soon'
import { auth } from '@/lib/auth-config';

interface PageProps {
    params: {
        locale: string
    }
}
export default async function page(props: PageProps) {
    const { params: { locale } } = props;
    const session = await auth();
    return (
        <ComingSoong session={session} />
    )
}
