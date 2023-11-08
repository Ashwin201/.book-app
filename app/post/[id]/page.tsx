import Image from "next/image";
import notavailable from "@/public/thumbnail-placeholder.webp"
import Button from "@/components/Button";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteBtn from "@/components/DeleteBtn";
import { FiEdit } from "react-icons/fi"

export async function generateMetadata({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    return {
        title: data.title,
        description: data.desc,
    };
}
const getData = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/posts/${id}`,
            {
                cache: "no-store",
            }
        );
        if (res.ok) {
            return res.json();
        }
    } catch (err) {
        console.log(err);
    }
};

const SinglePost = async ({ params }: { params: { id: string } }) => {
    const post = await getData(params.id);

    const session = await getServerSession(authoptions);
    const isEditable = session && session?.user?.email === post.authorEmail;
    return (
        <div>
            {
                post.id ? (
                    <div>
                        {/* <span className='font-medium  text-black dark:text-gray-200 text-sm '>Posted by :<span className='  text-base font-semibold'>&nbsp;{post.author}</span></span> */}

                        <div className="  grid grid-cols-2 xl:gap-6  gap-4  ">

                            <div className=" col-span-2 xl:col-span-1 w-full h-60 sm:h-72 relative  ">
                                {
                                    post.imageUrl ? (
                                        <Image src={post.imageUrl} alt='Image Thumbnail' className=' absolute inset-0 rounded-md border-2 border-gray-400 object-cover ' fill />
                                    ) : (
                                        <Image src={notavailable} alt='Image Thumbnail' fill className='absolute inset-0 rounded-md border-2 border-gray-400 object-cover' />
                                    )
                                }

                            </div>
                            <div className="col-span-2 xl:col-span-1 flex flex-col xl:ml-3  gap-3 justify-center ">
                                {
                                    post.category ? (
                                        <Button href={""} icon="" text={post.category} className=" w-fit bg-gray-900 text-white hover:bg-black hover:scale-95 transition-all duration-300 cursor-pointer " />
                                    ) :
                                        (
                                            ""
                                        )
                                }
                                <h3 className="  text-2xl font-semibold  text-black dark:text-gray-200">
                                    {post.title}
                                </h3>
                                <p className="text-base mb-3 font-medium  text-black dark:text-gray-200">
                                    {post.desc}
                                </p>
                                {/* {
                            isEditable && (
                                <ul className='flex items-center  bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-900 mb-3 w-fit rounded-md'>
                                    <li className='flex items-center gap-1  text-black dark:text-gray-200   '>
                                        <Button href={`/editpost/${post.id}`} text="Edit" icon={<FiEdit size={18} />} className="  " />
                                    </li>
                                    <span className='text-base font-semibold text-gray-500'>|</span>
                                    <DeleteBtn id={post.id} />
                                </ul>
                            )
                        } */}
                            </div>

                        </div>

                        <div className="flex flex-col  gap-6 mt-6  w-[100%]">
                            <h3 className=" text-2xl sm:text-2xl font-semibold dark:text-gray-300 text-gray-800 ">
                                Detail :
                            </h3>
                            <div className=" dark:text-gray-300 text-gray-700 font-medium">
                                {post.content}
                            </div>

                        </div>
                    </div>
                ) : (
                    <p className="font-medium text-lg text-gray-600 tracking-wide">Sorry, No post available with this id.</p>
                )
            }

        </div>
    );
};

export default SinglePost;
