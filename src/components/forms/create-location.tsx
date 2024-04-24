import React from 'react'
import { UploadFilesToVercel } from '../common'
import { Button } from '../ui'

export default function CreateLocationForm() {
    return (
        <div>
            <UploadFilesToVercel

                trigger={<Button>Open modal</Button>}
            />
        </div>
    )
}
