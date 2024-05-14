import { createStayTunned } from "@/services";
import { StayConnectFormType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json() as StayConnectFormType;

    if (!body.email) {
        return NextResponse.json({ error: "The email is required" }, { status: 400 })
    }

    try {
        const data = await createStayTunned(body);
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "We are having problem performing this request" }, { status: 500 })
    }
}