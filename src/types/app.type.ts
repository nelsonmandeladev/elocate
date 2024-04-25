
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