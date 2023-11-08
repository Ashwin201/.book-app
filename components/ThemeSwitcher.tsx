"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { BsSun, BsMoonStarsFill } from "react-icons/bs"
import { FiSun } from "react-icons/fi"

const ThemeSwitcher = () => {
    //For Theme switch
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div>
            {theme === "dark" ? (

                <div onClick={() => setTheme("light")} className=' text-black dark:text-gray-200 cursor-pointer hover:underline transition-all duration-300 text-base items-center font-medium flex gap-2'>  <FiSun size={21} /> <span>Light Mode</span></div>


            ) : (
                <div onClick={() => setTheme("dark")} className=' text-black dark:text-gray-200 cursor-pointer hover:underline transition-all duration-300 text-base items-center  font-medium flex gap-2'>  <BsMoonStarsFill size={19} /> <span>Dark Mode</span></div>


            )}
        </div>
    )
}

export default ThemeSwitcher
