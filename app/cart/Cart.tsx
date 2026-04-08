'use client'

import { getCart } from "@/apis/cart/cart.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productInterface } from "@/interfaces/products.interface";

import { MdDeleteOutline } from "react-icons/md";
import { deleteFromCart } from "@/apis/cart/actions/deleteCart.action";
import LoadingComponent from "../_components/loading/LoadingComponent";
import { updateCart } from "@/apis/cart/actions/updateCartProd.action";
import { clearCart } from "@/apis/cart/actions/clear.action";
import Link from "next/link";
export default  function Cart() {

   const {data} = useQuery({
    queryKey: ['cart'], 
    queryFn: async ()=> {
        const data = await fetch('/api/cart')
        if(!data.ok) {
            throw new Error('Failed to fetch cart data')
        }
        console.log("Cart data response:", data);
        return data.json()

    }
  
  })

// console.log("Cart data:", data);
const queryClient = useQueryClient()
// delete cart item
const {mutate:delData, data:deleteData, isPending:deletePending}= useMutation({
      mutationFn: deleteFromCart,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
})
// update cart item
const {mutate:updatedata, data:updateData, isPending:updatePending}= useMutation({
      mutationFn: updateCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
})

function handleUpdateCart(productId: string, count: number){
    updatedata({ productId, count })
   

}
const {mutate:clearAlldata, data:clearData, isPending:clearPending}= useMutation({
      mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
})
if(data?.numOfCartItems === 0){
    return <h2 className="text-xl font-bold">Your cart is empty</h2>
}
  return (
    <>
    <h3>Total Cart Items: {data?.numOfCartItems}</h3>
      <Table className="border border-gray-300">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="divide-x divide-gray-300 border-b border-gray-300">
            <TableHead>ProductName</TableHead>
            <TableHead>ProductImage</TableHead>
            <TableHead>ProductPrice</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.products.map((product:any) => (
              <TableRow className="divide-x divide-gray-300 border-b border-gray-300">
                <TableCell>{product.product.title}</TableCell>
                <TableCell className="flex justify-center align-middle">
                  <img  src={product.product.imageCover} alt={product.product.title} className="w-16 h-16 object-cover" />
                </TableCell>
                <TableCell>{product.price.toFixed(2)} EGP </TableCell>
                <TableCell className="text-center">
                    <div>
                        <button className="px-2 py-1 bg-gray-200 rounded-l cursor-pointer" onClick={()=>handleUpdateCart(product.product._id, product.count - 1)}>-</button>
                        <span className="px-4">{product.count}</span>
                        <button className="px-2 py-1 bg-gray-200 rounded-r cursor-pointer " onClick={()=>handleUpdateCart(product.product._id, product.count + 1)}>+</button>
                    </div>
                </TableCell>
                <TableCell >
                    <MdDeleteOutline size={30} className="text-red-500 cursor-pointer mx-auto" onClick={()=>delData(product.product._id)} />
                  </TableCell>
              </TableRow>
            ))}
    
        </TableBody>
        <TableFooter>
          <TableRow className="divide-x divide-gray-300 border-b border-gray-300">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={2} className="text-center font-bold">
              {data?.data.totalCartPrice?.toFixed(2)} EGP
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
       <div className="flex gap-4">
               <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={() => clearAlldata()}>
          Clear Cart
        </button>
        
         <Link href={`/checkOut/${data?.cartId}`} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Check Out
        </Link>
       </div>

    </>
  );
}
