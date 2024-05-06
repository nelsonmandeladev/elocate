import { STORAGE_RETURNABLE_FIELDS, USER_RETURNABLE_FIELD } from "@/constants";
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
        select: STORAGE_RETURNABLE_FIELDS
    });

    return storage
}

export async function listStoragesByUserId(userId: string) {
    const storages = await prisma.storage.findMany({
        where: {
            userId: userId
        },
        select: STORAGE_RETURNABLE_FIELDS,
        orderBy: {
            createdAt: "desc"
        }
    });

    return storages

}


export async function listStorages() {
    const storages = await prisma.storage.findMany({
        select: {
            ...STORAGE_RETURNABLE_FIELDS,
            user: {
                select: USER_RETURNABLE_FIELD
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