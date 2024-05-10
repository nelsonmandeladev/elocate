"use client";

import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

import React from 'react';
import { usePathname } from "next/navigation";
import { BASE_SITE_URL } from "@/constants";

export function SocialShareButtons() {
    const pathname = usePathname();
    const sharedUrl = BASE_SITE_URL + pathname;
    return (
        <div className="flex flex-wrap gap-2">
            <WhatsappShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={sharedUrl} className="Demo__some-network__share-button">
                <EmailIcon size={32} round />
            </EmailShareButton>
        </div>
    )
}
