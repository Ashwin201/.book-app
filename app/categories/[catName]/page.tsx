//@ts-nocheck
import Post from '@/app/post/page';
import { Tcategory, Tpost } from '@/app/types'
// import Post from '@/components/Post';
import Link from 'next/link';
import React from 'react'
const getPosts = async (catName: string): Promise<Tcategory[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`, { cache: "no-store" })
        if (res.ok) {
            const categories = await res.json();
            const posts = categories.posts;
            return posts;

        }
    } catch (error) {
        console.log(error)
    }
    return null;
}
const CatogoriesPost = async ({ params }: { params: { catName: string } }) => {
    const category = params.catName;
    const posts = await getPosts(category);
    return (
        <div>
            <p className='flex font-medium items-center mb-4 text-xl'>Category&nbsp;:&nbsp;<h1 className='text-2xl font-bold  '>{category} </h1></p>
            {posts && posts.length > 0 ? (
                posts.map((post: Tpost) => (
                    <Post key={post.id} id={post.id} author={post.author.email} authorEmail={post.authorEmail} date={post.createdAt} thumbnail={post.imageUrl} category={post.catName} title={post.title}
                        content={post.content} links={post.links || []} />
                ))
            )
                : (

                    <p className=" flex flex-col sm:flex-row items-start sm:items-center gap-2 font-medium text-lg text-gray-500">No Posts available currently based on {category}.
                        <Link href={`/createpost`} aria-label='Create Post' className=' underline font-semibold text-gray-700'>Create Post</Link>
                    </p>
                )
            }
        </div>
    )
}

export default CatogoriesPost
