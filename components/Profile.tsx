"use client"
//@ts-nocheck
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Profile = () => {
    const { status, data: session } = useSession()
    return (
        <div>
            {
                status === "unauthenticated" || status === "loading" ? (
                    ""
                ) : (
                    <div className=' flex justify-center flex-col items-center text-center'>

                        <Image src={session?.user?.image} width={52} height={52} alt='Image' className=' cursor-pointer  mb-2 border-2 border-gray-400 rounded-[50%]' />
                        <p className=' font-semibold text-xl tracking-wide cursor-pointer text-black dark:text-gray-200 '>{session?.user?.name}</p>
                        <p className=' mb-6 font-semibold text-base text-gray-700 dark:text-gray-500 tracking-wide cursor-pointer '>{session?.user?.email}</p>
                        <hr />
                    </div>
                )
            }
        </div>
    )
}

export default Profile
