import { put } from "@vercel/blob";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { computeSHA256, generateFileName } from "./utils";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
    }
})


// This is use to create an object to vercel blo storage
export async function vercelPut(file: File) {
    return await put(file.name, file, {
        access: "public"
    });
}


// This is use the generate presigned urls in other to store object on aws s3 bucket
export async function awsS3PresignedUrl(userId: string, file: File) {

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME ?? "",
        Key: generateFileName(),
        ContentType: file.type,
        ContentLength: file.size,
        ChecksumSHA256: await computeSHA256(file),
        Metadata: {
            userId: userId
        }
    })

    const createSignedUrl = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60
    })

    return createSignedUrl
}