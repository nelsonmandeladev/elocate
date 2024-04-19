import React from 'react'
import { Button } from '../ui'

export function LandingPageHeader() {
    return (
        <div className='w-full py-5 px-10 shadow-sm flex justify-between'>
            <div className="font-bold text-xl uppercase">
                ELOCATE
            </div>
            <div className=""></div>
            <div className="flex gap-2">
                <Button variant={"link"}>Connexion</Button>
                <Button>{"S'inscrire"}</Button>
            </div>
        </div>
    )
}
