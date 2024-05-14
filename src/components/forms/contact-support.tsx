"use client";

import React, { useTransition } from 'react'
import { Session } from 'next-auth'
import {
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
import { useDrawerStore } from '@/store';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContactSupportFormType, contactSupportSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface ContactSupportFormProps {
    session: Session | null;
}
export function ContactSupportForm(props: ContactSupportFormProps) {
    const { session } = props;
    const { setIsDrawerOpen } = useDrawerStore();
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation();
    const form = useForm<ContactSupportFormType>({
        resolver: zodResolver(contactSupportSchema),
        defaultValues: {
            email: session?.user?.email ?? "",
            message: ""
        }
    });

    async function onSubmit(data: ContactSupportFormType) {

        startTransition(async () => {
            const response = await fetch("/api/contact-support", {
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.status === 201) {
                toast.success(t("setting:add_contact_support_success"), { duration: 10000 });
                setIsDrawerOpen();
            } else {
                toast.error(t("common:add_stay_tunned_error"), { duration: 10000 })
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6 md:space-y-10">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-gray-500 text-[16px] font-normal'>
                                {t("setting:contact_support_label")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("setting:contact_support_placeholder")}
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
                                {t("setting:contact_support_message")}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t("setting:contact_support_message_placeholder")}
                                    className="resize-none bg-gray-100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-300' />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {t("setting:contact_support_btn")}
                </Button>
            </form>
        </Form>
    )
}
