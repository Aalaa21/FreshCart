import Image from 'next/image'
import {getSingleProduct} from '../../../apis/SingleProductDet'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import SliderComp from '@/app/_components/slider/slider'
import AddCartBtn from '@/app/_components/addCartBtn'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface PageProps {
params: Promise<{ id: string }>

}

export default async function Page({ params }: PageProps) {
 
  const { id } = await params
  console.log("params:", id)
   const data = await getSingleProduct({id})
   
  return (
    <div className="flex h-screen items-center justify-center my-30">
      <div className="md:w-1/3 w-full p-4">
      
      <Image
        src={data.imageCover}
        alt={data.title}
        width={300}
        height={300}
        className="rounded-lg object-cover cursor-pointer"
      />

      <div className='flex gap-3 my-6'>
        {/* {data.images.map(img=> <Image className='cursor-pointer' key={img} src={img} alt={data.title} width={100} height={100} />)} */}
        <SliderComp slidesPerView={1} pageList={data.images} />
     
      </div>
      </div>
       <div className="md:w-2/3 w-full p-4 mb-100">
       
       
      <h5 className='font-light text-gray-500'>{data.category.name}</h5>
      <p>{data.title.split(' ').slice(0,3).join(' ')}</p>

      
       {/* rating */}
     <div className='flex gap-5 my-2'>
        <p>{data.ratingsAverage}</p>
        <Star className='mt-1 text-amber-300' size={12}></Star>
     </div>
     

     <div className='flex'>
      <>
      
       {data.priceAfterDiscount?
      <div className='flex gap-3 my-2'>
        <p className='text-green-400'>{data.priceAfterDiscount} EGP</p>
        <p className='line-through text-sm'>{data.price} EGP</p>
      </div>
      : <p className=' my-2'>{data.price} EGP</p>
      }
      <div className='flex gap-1 my-6'>

        <AddCartBtn id={data._id} cls="w-1/2 ms-20 px-10 bg-green-500 cursor-pointer">Add to Cart</AddCartBtn>
         <Button className="w-1/4 ms-20 px-10 bg-black cursor-pointer">Buy it Now</Button>
         
      </div>
    
      </>
     </div>
     </div>
    </div>
  );
}