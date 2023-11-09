import { authoptions } from '@/app/api/auth/[...nextauth]/route';
import EditPostForm from '@/components/EditPostForm'
import { Tpost } from '@/app/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Edit Post",
    description: "This is the edit post page.",
}
const getPost = async (id: string): Promise<Tpost | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, { cache: "no-store" });
        if (res.ok) {
            const post = await res.json();
            return post;
        }
    } catch (error) {
        console.log(error)
    }
    return null;
}
const EditPost = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authoptions);
    if (!session) {
        redirect("/signin")
    }
    const id = params.id;
    const post = await getPost(id);
    return (
        <>
            {post ? (<EditPostForm post={post} />) : (<p className=" flex items-center gap-2 font-medium text-lg text-gray-500">No Posts Available currently.</p>)}
        </>
    );
}

export default EditPost
