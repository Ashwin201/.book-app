import CategoriesList from "@/components/CategoriesList";
// import Post from "@/components/Post";
import { Tpost } from "@/app/types";
// import { postData } from "@/data";
import Link from "next/link";
import Post from "./post/page";
const getPosts = async (): Promise<Tpost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: "no-store" })
    if (res.ok) {
      const posts = await res.json()
      return posts;
    }
  } catch (err) {
    console.log("Error => ", err)

  }
  return null;
}
export default async function Home() {
  const posts = await getPosts()
  return (
    <div className="min-h-[65vh]">
      <div className=" text-4xl text-center lg:text-start sm:text-6xl md:text-[68px] font-medium text-gray-600 mb-8 ">
        <b className="text-gray-900 dark:text-gray-200">Hey, Ashmin here!</b> Discover my stories and creative ideas.
      </div>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} id={post.id} author={post.author.email} authorEmail={post.authorEmail} date={post.createdAt} thumbnail={post.imageUrl} category={post.catName}
            title={post.title} desc={post.desc}
            content={post.content} links={post.links || []} />
        ))
      )
        : (

          <p className=" flex items-center gap-2 font-medium text-lg text-gray-500">No Posts Available currently.
            <Link href={`/createpost`} aria-label='Create Post' className=' underline font-semibold text-gray-700'>Create Post</Link></p>
        )
      }


    </div>
  )
}
//author Email for check if post id editable or not