"use client";

import React from 'react'
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    LanguageSwitcher,
    ContactSupportForm
} from "@/components"
import { } from "@/components/ui/input"
import { Session } from 'next-auth';
import { useTranslation } from 'react-i18next';

interface ManageUserSettingsProps {
    session: Session
}

export function ManageUserSettings(props: ManageUserSettingsProps) {
    const { session } = props;
    const { t } = useTranslation();
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">
                        {t("setting:settings_header")}
                    </h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="#" className="font-semibold text-primary">
                            {t("setting:general_label")}
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle className='text-gray-600 font-medium text-xl'>
                                    {t("setting:email_label")}
                                </CardTitle>
                                <CardDescription>
                                    {t("setting:email_description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <Input
                                        placeholder="Store Name"
                                        disabled
                                        className='py-6 bg-gray-200'
                                        defaultValue={session.user?.email ?? ""}
                                    />
                                </form>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle className='text-gray-600 font-medium text-xl'>
                                    {t("setting:name_label")}
                                </CardTitle>
                                <CardDescription>
                                    {t("setting:name_description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="flex flex-col gap-4">
                                    <Input
                                        className='py-6 bg-gray-200'
                                        disabled
                                        placeholder="Project Name"
                                        defaultValue={session.user?.name ?? ""}
                                    />
                                </form>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle className='text-gray-600 font-medium text-xl'>
                                    {t("setting:languages_label")}
                                </CardTitle>
                                <CardDescription>
                                    {t("setting:languages_description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LanguageSwitcher />
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle className='text-gray-600 font-medium text-xl'>
                                    {t("setting:contact_support_title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("setting:contact_support_description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactSupportForm session={session} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
