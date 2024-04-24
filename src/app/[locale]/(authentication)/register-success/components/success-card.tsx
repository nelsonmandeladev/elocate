"use client";

import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { notFound } from 'next/navigation';


interface SuccessCardProps {
    session: Session | null
}
export default function SuccessCard({ session }: SuccessCardProps) {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    if (!callbackUrl) {
        return notFound();
    }

    return (
        <div className='w-full h-dvh flex justify-center items-center'>
            <div className="w-full md:w-[500px] h-full md:h-[600px] bg-white shadow-sm rounded-sm flex flex-col justify-center items-center p-6">
                <div className="flex flex-col items-center">
                    <Image
                        src={session?.user?.image ?? ""}
                        alt={session?.user?.name ?? ""}
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                    <p className="text-lg text-gray-500 font-semibold mt-3">
                        {session?.user?.name}
                    </p>
                    <p className="text-sm text-gray-600 font-normal">
                        {session?.user?.email}
                    </p>
                </div>
                <div className="mt-20 flex flex-col items-center gap-2">
                    <h4 className="text-2xl font-bold text-primary">
                        {t("register_success:welcome_header")} 🎊
                    </h4>
                    <p className="text-center text-gray-500">
                        <span className="font-bold">{session?.user?.name}</span>, {t("register_success:welcome_text")}
                    </p>
                    <Link
                        href={callbackUrl ?? ""}
                        className='mt-5 text-lg bg-primary text-white px-10 py-2 rounded'
                    >
                        {t("register_success:get_started_btn")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
