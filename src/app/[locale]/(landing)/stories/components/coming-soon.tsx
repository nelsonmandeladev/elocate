"use client";
import { Button, StayConnectForm } from '@/components'
import { useDrawerStore } from '@/store';
import { MessagesSquare } from 'lucide-react'
import { Session } from 'next-auth';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface ComingSoongProps {
    session: Session | null;
}

export default function ComingSoong(props: ComingSoongProps) {
    const { session } = props;
    const { t: translate } = useTranslation();
    const { setIsDrawerOpen } = useDrawerStore();
    return (
        <div className="h-dvh w-full flex justify-center items-center">
            <div className="w-full md:w-[500px] h-full md:h-[600px] bg-white shadow-sm rounded-sm flex flex-col justify-center items-center p-6">
                <div className="text-2xl font-bold text-gray-600 flex flex-col items-center flex-wrap justify-center gap-5 text-center">
                    <MessagesSquare size={120} className='text-gray-300' />
                    <h4 className="">
                        {translate("coming-soon:key_story_header")}
                    </h4>
                </div>
                <p className="text-center text-gray-500 mt-10">
                    {translate("coming-soon:key_story_content")}
                </p>
                <Button
                    onClick={() => { setIsDrawerOpen() }}
                    className="mt-5"
                >
                    {translate("coming-soon:key_story_btn")}
                </Button>
            </div>
            <StayConnectForm session={session} />
        </div>
    )
}
