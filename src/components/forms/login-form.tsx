"use client";
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Button,
    Separator
} from "@/components/"
import Image from "next/image";
import { signIn } from "next-auth/react"
import { useTranslation } from "react-i18next";

export function LoginForm() {
    const { t } = useTranslation();
    return (
        <Card className="w-full border-0 shadow-none p-0">
            <CardHeader className="p-0 py-6 mb-5">
                {/* <CardTitle className="text-2xl">Login</CardTitle> */}
                <CardDescription>
                    {t("common:login_sub_title")}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            {t("common:key_email")}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="bg-gray-50 py-6"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">
                                {t("common:key_password")}
                            </Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                {t("common:forgot_password")}
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            className="bg-gray-50 py-6"
                            placeholder={t("common:enter_password_placeholder")}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {t("common:login_btn")}
                    </Button>
                    <Separator className="mt-5" />
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
                        <Button
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
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    {t("common:no_account_text")}
                    <Link href="#" className="underline">
                        {t("common:key_sign_up")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
