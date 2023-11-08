"use client"
import React from 'react'
import Button from './Button'
import { RiDeleteBin5Line } from "react-icons/ri"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DeleteBtn = ({ id }: { id: string }) => {
    const router = useRouter()

    const deleteImage = async (publicId: string) => {
        try {
            const res = await fetch('/api/removeimage', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId }),
            });
        } catch (error) {
            console.log("Error3:", error)
        }

    };
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (confirmed) {
            try {
                const res = await fetch(`/api/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const post = await res.json();
                    const { publicId } = post;
                    await deleteImage(publicId);
                    toast.success("Post deleted successfully");
                    router.refresh();
                }
            } catch (error) {
                toast.error("Something went wrong.");
            }
        }
    };
    return (

        <ul>
            <li className='flex items-center gap-2 ' onClick={handleDelete}>
                <Button href={""} text="Delete" icon={<RiDeleteBin5Line size={20} />} className=" text-red-600" />
            </li>
        </ul>
    )
}

export default DeleteBtn
