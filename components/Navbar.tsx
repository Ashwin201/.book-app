'use client'
//@ts-nocheck
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BsBookHalf } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { BiLogIn } from "react-icons/bi"
import { TbLogout2 } from "react-icons/tb"
import { MdOutlineCreateNewFolder } from "react-icons/md"
import Link from 'next/link'
import Button from './Button'
import { signOut, useSession } from 'next-auth/react'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
    const { status, data: session } = useSession()
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const popupRef = useRef<HTMLDivElement | null>(null)


    //code to off the popup when click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setIsPopupVisible(false)
            }
        }
        document.addEventListener("click", handleClickOutside);
        if (!isPopupVisible) {
            document.removeEventListener("click", handleClickOutside);

        }
        return () => {
            document.removeEventListener("click", handleClickOutside);

        }
    }, [isPopupVisible])


    return (
        <div className=' z-30 border-b-2 border-gray-300'>
            <div className=" flex justify-between items-center  mb-[15px] md:mb-5 relative ">
                <ul >
                    <li >
                        <Link href={"/"} aria-label='Home Logo BsBookHalf' className='flex items-center gap-2 font-serif font-bold  text-[22px] dark:text-gray-200 text-black'>
                            <BsBookHalf size={30} />.book
                        </Link>
                    </li>

                </ul>
                {
                    status === "unauthenticated" || status === "loading" ? (
                        <Button href="/signin" arial="Sign In" icon={<BiLogIn size={20} />} text="Sign in" className=" bg-slate-300 hover:bg-slate-400 dark:bg-gray-800 dark:hover:bg-gray-900   hover:scale-95" />

                    ) : (
                        <>
                            <div ref={popupRef} className={`absolute z-50   right-0 top-20 bg-white dark:bg-gray-900  shadow-lg  shadow-gray-300 dark:shadow-gray-800 py-6 px-5  flex-col 
                             gap-3 rounded-md  items-end text-end 
                            ${isPopupVisible ? "flex" : "hidden"}`}>
                                <div className=' flex flex-col'>
                                    <Link href={"/dashboard"} aria-label='Dashboard' onClick={() => setIsPopupVisible((prev) => !prev)} className=' font-semibold text-lg cursor-pointer  text-black dark:text-gray-200 '>{session?.user?.name}</Link>
                                    <Link href={"/dashboard"} aria-label=' Dashboard' onClick={() => setIsPopupVisible((prev) => !prev)} className=' font-medium text-xs text-gray-600 dark:text-gray-400 cursor-pointer mb-2'>{session?.user?.email}</Link>
                                </div>


                                <Link onClick={() => setIsPopupVisible((prev) => !prev)} href={"/dashboard"} aria-label='Dashboard' className=' hover:underline transition-all duration-300 
                                text-base font-medium flex gap-2 text-black dark:text-gray-200' >
                                    <CgProfile size={23} /> <span>Dashboard</span>
                                </Link>
                                <Link onClick={() => setIsPopupVisible((prev) => !prev)} href={"/createpost"} aria-label='Create New' className='hover:underline transition-all duration-300 
                                text-base font-medium  text-black dark:text-gray-200 flex gap-2' >
                                    <MdOutlineCreateNewFolder size={25} /> <span>Create New</span>
                                </Link>
                                <div className=' border-t-2 border-gray-400 pt-4' onClick={() => setIsPopupVisible((prev) => !prev)}>
                                    <ThemeSwitcher />
                                </div>
                                <button onClick={() => setIsPopupVisible((prev) => !prev)} >
                                    <span className=' hover:underline transition-all duration-300 text-base font-medium flex gap-2  text-black dark:text-gray-200' onClick={() => signOut()}><TbLogout2 size={20} /> <span> Sign Out</span></span>
                                </button>

                            </div>

                            <div className=' flex gap-4 items-center'>
                                <span>
                                    <Button href="/createpost" arial="Create New" icon={<MdOutlineCreateNewFolder size={25} />} text="Create New" className=" hidden sm:block  dark:bg-gray-800
                                     dark:hover:bg-gray-900 bg-slate-300 hover:bg-slate-400  hover:scale-95" />
                                </span>

                                <Image onClick={() => setIsPopupVisible((prev) => !prev)} src={session?.user?.image as string} width={40} height={40} alt='Image' className=' cursor-pointer   mb-1 border-2 border-gray-400 rounded-[50%]' />


                            </div>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Navbar
{/* <span onClick={() => signOut()}>
                                    <Button href="/" icon={<TbLogout2 size={20} />} text="Sign out" className=" hidden sm:block  bg-slate-300  hover:bg-slate-400 hover:scale-95" />
                                </span> */}