"use client";
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    Input,
    Button,
    Separator,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/"
import Image from "next/image";
import { signIn } from "next-auth/react"
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form"
import { SingFormType, signInSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForm() {
    const { t } = useTranslation();
    const form = useForm<SingFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
        }
    })

    async function onSubmit(data: SingFormType) {
        const response = await signIn('resend', {
            email: data.email,
        });
        console.log({ response })
    }
    return (
        <Card className="w-full border-0 shadow-none p-0">
            <CardHeader className="p-0 py-6 mb-5">
                {/* <CardTitle className="text-2xl">Login</CardTitle> */}
                <CardDescription>
                    {t("common:login_sub_title")}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                {/* <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("common:key_email")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="m@example.com"
                                            className="bg-gray-100 py-6"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {t("common:login_btn")}
                        </Button>
                    </form>
                </Form> */}
                <div className="grid gap-4 mt-8">
                    {/* <Separator /> */}
                    <div className="flex flex-col w-full gap-5">
                        <Button
                            variant="outline"
                            className="w-full font-normal text-gray-600 flex gap-3"
                            onClick={() => signIn("google", {
                                redirect: true
                            })}
                        >
                            <Image
                                src={"/assets/icons/icon_google.svg"}
                                alt=""
                                width={24}
                                height={24}
                            />
                            {t("common:login_with_google")}
                        </Button>
                        {/*<Button
                            variant="outline"
                            className="w-full font-normal text-gray-600 flex gap-3"
                            onClick={() => signIn("facebook", {
                                redirect: true
                            })}
                        >
                            <Image
                                src={"/assets/icons/icon_facebook.svg"}
                                alt=""
                                width={24}
                                height={24}
                            />
                            {t("common:login_with_facebook")}
                        </Button> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
