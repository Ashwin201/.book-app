// //@ts-nocheck
// import Image from 'next/image'
// import notavailable from "@/public/thumbnail-placeholder.webp"
// import React from 'react'
// import Button from './Button'
// import { LiaLinkSolid } from "react-icons/lia"
// import { FiEdit } from "react-icons/fi"
// import Link from 'next/link'
// import DeleteBtn from './DeleteBtn'
// import { getServerSession } from 'next-auth'
// import { authoptions } from '@/app/api/auth/[...nextauth]/route'
// interface PostProps {
//     id: string,
//     author: string,
//     date: string
//     authorEmail?: string,
//     thumbnail?: string,
//     category?: string,
//     title: string,
//     content: string,
//     links?: string[]

// }
// const Post = async ({ id, author, authorEmail, date, thumbnail, category, title, content, links }: PostProps) => {
//     const session = await getServerSession(authoptions);
//     const isEditable = session && session?.user?.email === authorEmail;

//     const dateObject = new Date(date);
//     const options: Intl.DateTimeFormatOptions = {
//         month: "short",
//         day: "numeric",
//         year: "numeric"
//     }

//     const formattedDate = dateObject.toLocaleDateString("en-US", options)
//     return (
//         <>
//             <div className='mt-8 mb-8 cursor-pointer hover:scale-[.99] transition-all duration-500'>
//                 <span className='font-medium  text-black dark:text-gray-200 text-sm '>Posted by :<span className='  text-base font-semibold'>&nbsp;{author}</span> &nbsp;on&nbsp;<span className=' text-base  font-semibold'>{formattedDate}</span></span>

//                 <div className='grid grid-cols-2 xl:gap-6 mt-3 gap-3 '>

//                     <div className=' col-span-2 xl:col-span-1 w-full h-60 sm:h-72 relative'>

//                         {
//                             thumbnail ? (
//                                 <Image src={thumbnail} alt='Image Thumbnail' className=' absolute inset-0 rounded-md border-2 border-gray-400 object-cover ' fill />
//                             ) : (
//                                 <Image src={notavailable} alt='Image Thumbnail' fill className='absolute inset-0 rounded-md border-2 border-gray-400 object-cover' />
//                             )
//                         }
//                     </div>
//                     <div className=' col-span-2 xl:col-span-1 flex flex-col justify-center'>
//                         {
//                             category ? (
//                                 <Button href={""} icon="" text={category} className=" w-fit bg-gray-900 text-white hover:bg-black hover:scale-95 transition-all duration-300 cursor-pointer " />
//                             ) :
//                                 (
//                                     ""
//                                 )
//                         }


//                         <h1 className='my-3 text-2xl font-semibold  text-black dark:text-gray-200 '>{title}</h1>
//                         <p className='text-base mb-3 font-medium  text-black dark:text-gray-200'>{content}</p>

//                         {

//                             links && (
//                                 <div className="mb-3 flex flex-col gap-1">
//                                     {links.map((link, i) => (

//                                         <ul key={i} className="flex gap-2 items-center">
//                                             <li className='flex items-center gap-2 text-blue-600  overflow-x-hidden max-w-full text-ellipsis '>
//                                                 <LiaLinkSolid size={20} />
//                                                 <Link href={link} className=' hover:text-blue-800 text-blue-700 transition-all duration-500  inline-block whitespace-nowrap w-full overflow-hidden text-ellipsis font-semibold '>{link}</Link>
//                                             </li>
//                                         </ul>
//                                     ))}
//                                 </div>
//                             )}

//                         {
//                             isEditable && (
//                                 <ul className='flex items-center  bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-900 mb-3 w-fit rounded-md'>
//                                     <li className='flex items-center gap-1  text-black dark:text-gray-200   '>
//                                         <Button href={`/editpost/${id}`} text="Edit" icon={<FiEdit size={18} />} className="  " />
//                                     </li>
//                                     <span className='text-base font-semibold text-gray-500'>|</span>
//                                     <DeleteBtn id={id} />
//                                 </ul>
//                             )
//                         }
//                     </div>



//                 </div>
//             </div>
//             <hr />
//         </>
//     )
// }

// export default Post
