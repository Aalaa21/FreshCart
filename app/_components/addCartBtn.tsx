"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/apis/cart/actions/addCart.action";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface propsTypes {
  children: React.ReactNode;
  cls: string;
  id: string;
}

export default function AddCartBtn({ children, cls, id }: propsTypes) {
  const queryClient = useQueryClient()
  const {data, mutate}= useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
            
       toast(data.message,{position:"top-right",duration:3000}),
        queryClient.invalidateQueries({queryKey:['cart']})
    },
      onError:()=>{
         toast("Failed to add product to cart...Please login first",{position:"top-right",duration:3000})
    }
    
    })


   async function handleAddToCart() {
      mutate(id)

    }
  return (
    <div>
      <Button onClick={handleAddToCart} className={cls}>
        {" "}
        {children}{" "}
      </Button>
    </div>
  );
}
