import { productInterface } from "./products.interface"

export interface cartDataInterface {
     status: string,
  numOfCartItems: number,
  cartId: string,
  data: {
    _id: string,
    cartOwner: string,
    products: cartProductInterface[],

    totalCartPrice: number,
}

}

export interface cartProductInterface{
    product:productInterface,
    quantity:number,
    price:number,
    id:string,
    count:number
}