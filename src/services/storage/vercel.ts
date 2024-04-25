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
            contentDisposition: true,
            contentType: true,
            createdAt: true,
            downloadUrl: true,
            id: true,
            pathname: true,
            updatedAt: true,
            url: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                    updatedAt: true,
                    createdAt: true,
                },

            }
        }
    });

    return storage
}

export async function listBlobsByUserId(userId: string) {
    const storages = await prisma.storage.findMany({
        where: {
            userId: userId
        },
        select: {
            contentDisposition: true,
            contentType: true,
            createdAt: true,
            downloadUrl: true,
            id: true,
            pathname: true,
            updatedAt: true,
            url: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return storages

}


export async function listBlobs() {
    const storages = await prisma.storage.findMany({
        select: {
            contentDisposition: true,
            contentType: true,
            createdAt: true,
            downloadUrl: true,
            id: true,
            pathname: true,
            updatedAt: true,
            url: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                    updatedAt: true,
                    createdAt: true,
                },

            }
        }
    });

    return storages;
}

export async function deleteBlob(blogId: string) {
    const blob = await prisma.storage.delete({
        where: {
            id: blogId
        }
    });

    return true;
}