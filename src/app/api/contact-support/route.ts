import { createContactSupportMessage } from "@/services";
import { ContactSupportFormType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json() as ContactSupportFormType;

    if (!body.email || !body.message) {
        return NextResponse.json({ error: "The email and the message are required" }, { status: 400 })
    }

    try {
        const message = await createContactSupportMessage(body);
        return NextResponse.json(message, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "We are having problem performing this request" }, { status: 500 })
    }
}