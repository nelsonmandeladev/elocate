import {
    LOCATION_RETURNABLE_FIELD,
    STORAGE_RETURNABLE_FIELDS,
    USER_RETURNABLE_FIELD,
} from "@/constants";
import prisma from "@/lib/prisma";
import { CreateLocationType } from "@/types/app.type";

export async function createLocation(location: CreateLocationType, user_id: string) {
    const createdLocation = await prisma.location.create({
        data: {
            description: location.description,
            formatted_address: location.formatted_address,
            lat: location.lat,
            lng: location.lng,
            userId: user_id,
            imageId: location.storage_id
        },

        select: {
            ...LOCATION_RETURNABLE_FIELD,
            user: {
                select: USER_RETURNABLE_FIELD
            },
            image: {
                select: STORAGE_RETURNABLE_FIELDS
            }
        }
    })

    return createdLocation;
}

export async function listAllLocation() {
    const locations = await prisma.location.findMany({
        select: {
            ...LOCATION_RETURNABLE_FIELD,
            user: {
                select: USER_RETURNABLE_FIELD
            },
            image: {
                select: STORAGE_RETURNABLE_FIELDS
            }
        }
    });

    return locations;
}