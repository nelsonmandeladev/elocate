import { auth } from "@/lib/auth-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "You must be authenticated to perform this request" }, { status: 401 })
    }
    const body = await request.json() as google.maps.LatLngLiteral;

    if (!body) {
        return NextResponse.json({ error: "LatLngLiteral are required in other to perform this request" }, { status: 400 })
    }

    let language = "en";

    if (request.headers.get("referer")?.includes("/fr")) {
        language = "fr"
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${body.lat},${body.lng}&language=${language}&key=${process.env.GOOGLE_MAPS_API_KEY}`

    try {
        const response = await fetch(url, {
            method: "GET"
        })
        const data = await response.json();
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}