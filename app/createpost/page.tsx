import CreatePostForm from '@/components/CreatePostForm'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authoptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Create Post',
    description: 'Generated by create next app',
}

const CreatePost = async () => {
    const session = await getServerSession(authoptions);
    if (!session) {
        redirect("/signin")
    }
    return (
        < >
            <CreatePostForm />
        </>
    )
}

export default CreatePost
