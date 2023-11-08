"use client"
//@ts-nocheck
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineLibraryAdd } from "react-icons/md"
import { BiImageAdd } from "react-icons/bi"
import { CgLink } from "react-icons/cg"
import { RiDeleteBin5Line } from "react-icons/ri"
import { Tcategory } from '@/app/types'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary'
import Image from 'next/image'
const CreatePostForm = () => {
    const [links, setLinks] = useState<string[]>([])  //Array for storing multiple links
    const [linkInput, setLinkInput] = useState("")  //To get the link from input field


    //Use state hooks for input fields 
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [content, setContent] = useState("")
    const [categories, setCategories] = useState<Tcategory[]>([]) //this is to fetch categorie data
    const [selectedCategory, setSelectedCategory] = useState("") //this one is to store the value selected  by user
    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")

    const router = useRouter()
    //For Fetching Categories

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/categories");
            const catNames = await res.json();
            setCategories(catNames)
        }
        fetchCategories()
    }, [])

    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();  //Prevent from doing refresh action
        if (linkInput.trim() !== "") {
            setLinks((prev) => [...prev, linkInput])   //...prev to extract all elements
            setLinkInput("")
        }
    }

    //for Image upload
    const handleImageUpload = async (result: CldUploadWidgetResults) => {
        // console.log(result)
        const info = result.info as object;
        if ("secure_url" in info && "public_id" in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            setImageUrl(url)
            setPublicId(public_id)
        }
    }
    //For delete image
    const removeImage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/removeimage`, {
                method: "POST",
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify({ publicId })
            })
            if (res.ok) {
                setImageUrl("");
                setPublicId("");
            }
        } catch (error) {
            console.log(error)
        }

    }

    //For deleting Link
    const deleteLink = (index: number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index))
    }


    //For showing error message
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title && !desc && !content) {
            toast.error("Title and Content are required.")
            return;
        }


        try {

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    desc,
                    content,
                    links,
                    selectedCategory,
                    imageUrl,
                    publicId
                })
            })
            if (res.ok) {
                toast.success("Post created successfully.")
                router.push("/dashboard");
                router.refresh();

            }
            else {
                toast.error("Title and Content are required.");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className=' min-h-[69vh] z-10'>
                <h1 className='text-2xl font-bold  mb-4'>Create a post </h1>
                <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter Title' className=' dark:bg-gray-800 cursor-pointer w-full placeholder:text-base 
                    placeholder:font-medium border-2 border-gray-400 p-2 rounded-md hover:outline-none outline-none' />
                    <textarea onChange={(e) => setDesc(e.target.value)} rows={2} placeholder='Enter Short Description' className='dark:bg-gray-800 cursor-pointer resize-none w-full placeholder:text-base placeholder:font-medium border-2 border-gray-400 p-2 rounded-md hover:outline-none outline-none' />
                    <textarea onChange={(e) => setContent(e.target.value)} rows={8} placeholder='Enter Your Content' className='dark:bg-gray-800 cursor-pointer resize-none w-full placeholder:text-base placeholder:font-medium border-2 border-gray-400 p-2 rounded-md hover:outline-none outline-none' />

                    {/* For Links */}

                    <ul>
                        {
                            links && links.map((link, i) => (
                                <li className='flex items-center gap-2 mb-1 -mt-1  ' key={i}>

                                    <span className='text-blue-800 cursor-pointer '><CgLink size={23} /></span>
                                    <Link href={link} className=' text-gray-900 dark:text-gray-300  inline-block whitespace-nowrap max-w-full overflow-hidden text-ellipsis font-semibold  '>{link}</Link>
                                    <span onClick={() => deleteLink(i)} className=' text-red-800 cursor-pointer'><RiDeleteBin5Line size={21} /></span>

                                </li>
                            ))
                        }


                    </ul>
                    <div className='flex gap-3 -mt-3 '>
                        <input type="text" onChange={e => setLinkInput(e.target.value)} value={linkInput} placeholder='Paste a link' className=' dark:bg-gray-800 cursor-pointer w-full placeholder:text-base
                     placeholder:font-medium border-2 border-gray-400  p-2 rounded-md hover:outline-none outline-none ' />
                        <button onClick={addLink} className=' flex gap-2 font-medium text-base  items-center rounded-md py-[6px] px-4 hover:scale-[.99] transition-all duration-300 cursor-pointer 
                   text-white dark:text-black bg-gray-800 dark:bg-gray-200 dark:hover:bg-gray-400  '><MdOutlineLibraryAdd size={20} />Add</button>
                    </div>

                    {/* //Image Upload */}
                    <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onUpload={handleImageUpload} className={` relative w-full object-cover h-60 sm:h-80 justify-center items-center flex bg-slate-200  dark:bg-gray-800  border-2  border-gray-400  rounded-md ${imageUrl && " pointer-events-none"}`}>
                        <div >
                            <BiImageAdd size={35} />
                        </div>

                        {
                            imageUrl && (
                                <Image src={imageUrl} fill className=' absolute object-cover inset-0 rounded-md' alt={title} />

                            )
                        }
                    </CldUploadButton>
                    {
                        publicId && (
                            <button onClick={removeImage} className='flex gap-2 font-medium text-base  items-center rounded-md py-[6px] px-4 hover:scale-[.99] transition-all duration-300 cursor-pointer  text-white bg-red-800 w-fit'>
                                Remove image
                            </button>
                        )
                    }

                    {/* For Selecting Categories*/}
                    <select onChange={(e) => setSelectedCategory(e.target.value)} name='Select' className='dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium cursor-pointer w-full relative border-2 border-gray-400 p-2 rounded-md hover:outline-none outline-none pr-4 appearance-none overflow-hidden mr-12 ' >
                        <option className=' text-base font-medium  ' value="">Select a category:</option>
                        {
                            categories && categories.map((item) => (
                                <option className=' cursor-pointer text-base font-medium ' key={item.id} value={item.catName}>{item.catName}</option>
                            ))
                        }
                    </select>



                    <button className=' rounded-md font-medium p-2 text-lg text-white dark:text-black bg-gray-800 dark:bg-gray-200 dark:hover:bg-gray-400 hover:scale-[.99]   transition-all duration-500  '>Create Post</button>


                </form>
            </div>
        </>
    )
}

export default CreatePostForm
