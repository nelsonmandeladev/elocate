import prisma from "@/lib/prisma";
import { StayConnectFormType } from "@/types";

export async function createStayTunned(data: StayConnectFormType) {
    try {
        const item = await prisma.stayTunned.create({
            data: {
                email: data.email,
                message: data.message
            }
        })
        return item
    } catch (error) {
        return null
    }
}