import { getServerSession } from 'next-auth';
import React from 'react'
import { authoptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const Edit = async () => {
    const session = await getServerSession(authoptions);
    if (!session) {
        redirect("/signin")
    }
    else {
        redirect("/")
    }
    return (
        <div>

        </div>
    )
}

export default Edit
