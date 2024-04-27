import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/common';
import { awsS3PresignedUrl, vercelPut } from '@/lib';
import { auth } from '@/lib/auth-config';
import { createStorage, listStorages, listStoragesByUserId } from '@/services';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "You are not authorize to upload" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");

    if (!destination) {
        return NextResponse.json({ error: "The destination is required in the url params" }, { status: 401 })
    }

    const form = await request.formData();
    const file = form.get("file") as File;

    if (!file.name) {
        return NextResponse.json({ error: "No fille provided" }, { status: 400 })
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "The file type provided is not supported!" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "The file size is more than the max supported value: 5Mo" }, { status: 400 });
    }


    try {
        let storage;

        if (destination === "vercel") {
            const blog = await vercelPut(file)
            storage = await createStorage(session?.user?.id, blog);
        }

        if (destination === "aws-s3") {
            const s3PresignedUrl = await awsS3PresignedUrl(
                session.user.id,
                file
            );
            const s3Response = await fetch(s3PresignedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-type": file.type
                }
            });

            storage = await createStorage(session.user.id, {
                url: s3PresignedUrl.split("?")[0],
                contentType: file.type,
            })
        }


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
            storages = await listStoragesByUserId(session.user.id);
        }


        if (listFor === "admin") {
            storages = await listStorages();
        }

        return NextResponse.json(storages, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while fetching storage" }, { status: 500 });
    }


}