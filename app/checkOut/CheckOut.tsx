"use client"

import { onlinePayment } from '@/apis/payment/checkout.api'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'

export default function CheckOut({cartId}: {cartId: string}) {
  interface CheckOutData {
    details: string,
    phone: number,
    city: string,
   
  }
  const {register, handleSubmit} = useForm<CheckOutData>()

  async function handleCheckOut(data: CheckOutData){
    const response= await onlinePayment(cartId, data)
    console.log("Checkout response", response)
    if(response.status === 'success'){
      window.location.href = response.session.url
    }
  }
  return (
    <>
    <form className='w-1/2 mx-auto my-5 border p-5 rounded-2xl shadow-2xl' onSubmit={handleSubmit(handleCheckOut)}>
         <h2 className='text-xl font-bold mb-4'>Checkout</h2>
         <input {...register('details')} className='w-full my-2 border-b p-1' placeholder='details'/>
         <input {...register('phone')} className='w-full my-2 border-b p-1' placeholder='phone' type='tel'/>
         <input {...register('city')} className='w-full my-2 border-b p-1' placeholder='city'/>
         <Button className='mt-3 cursor-pointer'>Confirm</Button>
      </form>
      </>
  )
}
