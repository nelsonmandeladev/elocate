import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

export function UploadFilesToVercelForm() {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log({ acceptedFiles })
        // Do something with the files
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>{"Drag 'n' drop some files here, or click to select files"}</p>
                }
            </div>
        </div>
    )
}
