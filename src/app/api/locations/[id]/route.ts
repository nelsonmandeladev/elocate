import { findOneLocation } from "@/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        const id = request.url.split("locations/")[1];

        const location = await findOneLocation(id);

        if (location) {
            return NextResponse.json(location, { status: 200 })
        } else {
            return NextResponse.json({ error: `Location with id: ${id} does not exists` }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ error: `And error occurred with getting the location` }, { status: 500 })
    }
}