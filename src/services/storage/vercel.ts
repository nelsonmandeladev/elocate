import prisma from "@/lib/prisma";
import { PutBlobResult } from "@vercel/blob";

export async function createVercelBlob(userId: string, file: PutBlobResult) {
    const storage = await prisma.storage.create({
        data: {
            userId: userId,
            contentDisposition: file.contentDisposition,
            contentType: file.contentType,
            downloadUrl: file.downloadUrl,
            url: file.url,
            pathname: file.pathname
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                    updatedAt: true,
                    createdAt: true,
                }
            }
        }
    });

    return storage
}