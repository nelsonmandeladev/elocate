import { auth } from '@/lib/auth-config';
import { createVercelBlob, listBlobs, listBlobsByUserId } from '@/services';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "You are not authorize to upload" }, { status: 401 })
    }

    const form = await request.formData();
    const file = form.get("file") as File;

    if (!file.name) {
        return NextResponse.json({ error: "No fille provided" }, { status: 400 })
    }

    try {
        const blog = await put(file.name, file, {
            access: "public"
        });

        const storage = await createVercelBlob(session?.user?.id, blog);

        return NextResponse.json(storage, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while saved the file" }, { status: 500 });
    }
}


export async function GET(request: Request) {

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "You are not authorize to upload" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const listFor = searchParams.get("for");

    if (!listFor) {
        return NextResponse.json({ error: "The params *for* non found in the url" }, { status: 400 })
    }

    let storages;

    try {
        if (listFor === "user") {
            storages = await listBlobsByUserId(session.user.id);
        }


        if (listFor === "admin") {
            storages = await listBlobs();
        }

        return NextResponse.json(storages, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while fetching storage" }, { status: 500 });
    }


}