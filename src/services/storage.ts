import prisma from "@/lib/prisma";
import { createStorageType } from "@/types/app.type";

export async function createStorage(userId: string, file: createStorageType) {
    const storage = await prisma.storage.create({
        data: {
            userId: userId,
            contentDisposition: file.contentDisposition ?? "",
            contentType: file.contentType ?? "",
            downloadUrl: file.downloadUrl ?? "",
            url: file.url,
            pathname: file.pathname ?? ""
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

export async function listStoragesByUserId(userId: string) {
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


export async function listStorages() {
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

export async function deleteStorage(blogId: string) {
    await prisma.storage.delete({
        where: {
            id: blogId
        }
    });

    return true;
}