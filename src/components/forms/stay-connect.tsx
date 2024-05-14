"use client";

import React, { useTransition } from 'react'
import { DrawerBase } from '../common';
import {
    SheetDescription,
    SheetHeader,
    SheetTitle,
    Button,
    Input,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Textarea
} from "@/components";
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StayConnectFormType, stayConnectSchema } from '@/types';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useDrawerStore } from '@/store';

interface StayConnectFormProps {
    session: Session | null;
}

export function StayConnectForm(props: StayConnectFormProps) {
    const { session } = props;
    const { setIsDrawerOpen } = useDrawerStore();
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation();
    const form = useForm<StayConnectFormType>({
        resolver: zodResolver(stayConnectSchema),
        defaultValues: {
            email: session?.user?.email ?? "",
            message: ""
        }
    });

    async function onSubmit(data: StayConnectFormType) {


        startTransition(async () => {
            const response = await fetch("/api/stay-tunned", {
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.status === 201) {
                toast.success(t("common:add_stay_tunned_success"), { duration: 10000 });
                setIsDrawerOpen();
            } else {
                toast.error(t("common:add_stay_tunned_error"), { duration: 10000 })
            }
        })
    }
    return (
        <DrawerBase>
            <SheetHeader>
                <SheetTitle className='text-xl text-gray-700 font-medium'>
                    {t("common:stay_tunned_drawer_header")}
                </SheetTitle>
                <SheetDescription>
                    {t("common:stay_tunned_drawer_description")}
                </SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6 md:space-y-10">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-500 text-[16px] font-normal'>
                                    {t("common:key_stay_tunned_email_label")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='helolo'
                                        className="bg-gray-100 py-6"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-500 text-[16px] font-normal'>
                                    {t("common:key_stay_tunned_message_label")}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none bg-gray-100"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {t("common:stay_tunned")}
                    </Button>
                </form>
            </Form>
        </DrawerBase>
    )
}
