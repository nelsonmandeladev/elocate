import { Input } from '@/components';
import { debounce } from '@/lib';
import { UploadCloud } from 'lucide-react';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

export function UploadFilesToVercelForm() {

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData: FormData = new FormData();
        formData.append("file", acceptedFiles[0]);

        debounce(async () => {
            await handleSaveFile(formData);
        }, 1000)();

    }, []);

    async function handleSaveFile(formData: FormData) {

        const response = await fetch("/api/files", {
            method: "POST",
            body: formData
        });
        console.log({ response });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div>
                <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className=" border p-2 rounded-md max-w-min mx-auto">
                            <UploadCloud size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10 MB &#41;
                        </p>
                    </div>
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                />
            </div>
        </div>
    )
}
