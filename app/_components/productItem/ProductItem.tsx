import { Button } from '@/components/ui/button'
import { productInterface } from '@/interfaces/products.interface'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link";
import AddCartBtn from '../addCartBtn';

interface propsTypes{
  prod: productInterface
}

export default function ProductItem({prod}:propsTypes) {
  return (
    <div className='p-4 rounded-4xl border border-gray-300 '>
  <Link href={`/productdetails/${prod._id}`}>
    <div className="flex justify-center mb-2">
      <Image
        src={prod.imageCover}
        alt={prod.title}
        width={120}
        height={120}
        className="rounded-lg object-cover"
      />
    </div>


      <h5 className='font-light text-gray-500'>{prod.category.name}</h5>
      <p>{prod.title.split(' ').slice(0,3).join(' ')}</p>
  </Link>





     {/* rating */}
     <div className='flex gap-5 my-2'>
        <p>{prod.ratingsAverage}</p>
        <Star className='mt-1 text-amber-300' size={12}></Star>
     </div>
     

     <div className='flex'>
      <>
      
       {prod.priceAfterDiscount?
      <div className='flex gap-3 my-2'>
        <p className='text-green-400'>{prod.priceAfterDiscount} EGP</p>
        <p className='line-through text-sm'>{prod.price} EGP</p>
      </div>
      : <p className=' my-2'>{prod.price} EGP</p>
      }
      
       <AddCartBtn id={prod._id} cls="rounded-full bg-green-500 ms-20 cursor-pointer"> + </AddCartBtn>
      </>
     </div>
  
    </div>
  )
}
