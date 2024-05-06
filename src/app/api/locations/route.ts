import { auth } from "@/lib/auth-config";
import { createLocation, listAllLocation } from "@/services";
import { CreateLocationType } from "@/types/app.type";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "You are not authorize to create a location" }, { status: 401 })
    }

    const body = await request.json() as CreateLocationType;

    if (!body) {
        return NextResponse.json({ error: "The body is required" }, { status: 400 })
    }

    try {
        const location = await createLocation(body, session.user.id);
        return NextResponse.json(location, { status: 201 })
    } catch (error) {
        console.log({ error })
        return NextResponse.json({ error: "Un probleme est survenu lors de creation de la create de la localisation" }, { status: 500 })
    }

}


export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));
    const distance = Number(searchParams.get("distance"));

    try {
        const locations = await listAllLocation(lat, lng, distance);
        return NextResponse.json(locations, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Un probleme est survenu lors du chargement des localisations" }, { status: 500 })
    }
}