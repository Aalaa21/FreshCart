import React from 'react'
import { getAllCategories } from '../../../apis/categories.api'
import { categoryInterface } from '../../../apis/categories.api'
import Image from 'next/image';
export default async function Categories() {
    const categories=  await getAllCategories();
   
  return (
    <>

    <h2 className='text-2xl font-bold my-10'>Shop by <span className='text-green-500 underline'>Category</span></h2>
    <div className=' gap-5 my-6 grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2'>
    
      {categories?.map((cat: categoryInterface)=>< CategoryItem cat={cat} key={cat._id} />)}
    </div>
    </>

  )
}

function CategoryItem({ cat }: { cat: categoryInterface }) {
return(
<div className='rounded-[8px] shadow p-4 border border-color flex flex-col items-center gap-2 cursor-pointer '>

<img src={cat.image} alt={cat.name} width={100} height={100} className='rounded-full size-25 object-cover' />
{cat.name}


</div>

)
}