import prisma from "@/lib/prisma";
import { ContactSupportFormType } from "@/types";

export async function createContactSupportMessage(message: ContactSupportFormType) {
    try {
        const support = await prisma.contactSupport.create({
            data: {
                email: message.email,
                message: message.message
            }
        });
        return support;
    } catch (error) {
        return null;
    }
}