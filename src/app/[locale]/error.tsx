"use client";

import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className="h-dvh w-full flex justify-center items-center">
            <div className="w-full md:w-[500px] h-full md:h-[600px] bg-white shadow-sm rounded-sm flex flex-col justify-center items-center p-6">
                <div className="text-2xl font-bold text-gray-800 flex items-center flex-wrap justify-center gap-5 text-center">
                    {t("error:header")} <span className="text-6xl">😞</span>
                </div>
                <div className="text-center text-gray-500 mt-10">
                    {t("error:message")} <span className="text-xl">🦾</span>
                </div>
                <Button
                    className="mt-5"
                    onClick={() => reset()}
                >
                    {t("error:back_btn")}
                </Button>
            </div>
        </div>
    )
}