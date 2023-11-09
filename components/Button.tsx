//@ts-nocheck
import Link from 'next/link'
import React from 'react'

const Button = (props) => {
    return (
        <div>
            <ul className="">
                <li className={` rounded-md py-[4px] px-3 hover:scale-[.98] transition-all duration-300 cursor-pointer  ${props.className}`}>
                    <Link href={`${props.href}`} className={`flex items-center font-medium text-base    gap-2`} aria-label={props.arial}>{props.icon} {props.text}</Link>
                </li>
            </ul>
        </div>
    )
}

export default Button
