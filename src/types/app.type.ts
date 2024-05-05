import { CreateLocationFormType } from "./zod.type";

export interface UserType {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
    isSuperUser: string;
    createdAt: string;
    updatedAt: string;
    storages: StorageType[]
}


export type StorageType = {
    id: string;
    userId: string;
    contentDisposition: string;
    downloadUrl: string
    pathname: string
    url: string
    contentType?: string
    createdAt: string
    updatedAt: string;
    user: UserType
}

export type createStorageType = {
    contentDisposition?: string;
    downloadUrl?: string
    pathname?: string
    url: string
    contentType?: string
}

export type AwsGetSignedUrlParams = {
    fileType: string
    fileSize: number
    checksum: string
}

export interface CreateLocationType extends CreateLocationFormType {
    lng: number,
    lat: number,
    storage_id: string
}