import { auth } from '@/lib/auth-config';
import { createVercelBlob } from '@/services';
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


