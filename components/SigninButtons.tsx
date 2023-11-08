"use client"
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from "react-icons/bs"
import { signIn, useSession } from 'next-auth/react'
const SigninButtons = () => {
    const { status } = useSession()

    return (
        <div className=' flex flex-col items-center justify-center min-h-[68vh]'>
            <div className=' font-semibold text-lg'>Create your own Posts by</div>
            <h1 className='text-2xl font-bold text-center my-5'>Sign In</h1>
            <div className='flex flex-col gap-6 items-center'>
                <div onClick={() => signIn("google")} className=' flex gap-4 justify-center items-center sm:w-[300px] py-2 px-10 border-2 border-gray-400 rounded-full cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-500'>
                    <FcGoogle size={30} /> <span className='font-medium text-black '>Sign In with Google</span>
                </div>
                <div onClick={() => signIn("github")} className='  flex gap-4 justify-center items-center text-black sm:w-[300px] py-2 px-10 border-2 border-gray-400 rounded-full cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-500'>
                    <BsGithub size={30} /> <span className='font-medium  '>Sign In with Github</span>
                </div>
            </div>
        </div>
    )
}

export default SigninButtons
