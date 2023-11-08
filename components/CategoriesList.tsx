//@ts-nocheck
import React from 'react'
import Button from './Button'
import { Tcategory } from '@/app/types'

const getCategories = async (): Promise<Tcategory[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
        if (res.ok) {
            const categories = await res.json()
            return categories;
        }
    } catch (err) {
        console.log("Error => ", err)

    }
    return null;
}
const CategoriesList = async () => {
    const categories = await getCategories();
    return (
        <div className=' flex flex-wrap gap-4 items-center lg:items-start justify-center lg:justify-start mb-10 '>
            {
                categories && categories.map((item) => (
                    <Button key={item.id} href={`/categories/${item.catName}`} icon="" text={item.catName} className=" bg-gray-900 text-white hover:bg-black hover:scale-95 transition-all duration-300 cursor-pointer " />
                ))
            }
        </div>
    )
}

export default CategoriesList
