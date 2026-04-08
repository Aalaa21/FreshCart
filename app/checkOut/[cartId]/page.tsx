import React from "react";
import CheckOut from "../CheckOut";

export default async function page({params}: {params: Promise<{cartId: string}> }) {

  const {cartId} = await params
  console.log("Cart ID:", cartId);

  return (
    <div>
      <CheckOut cartId={cartId} />
    </div>
  );
}
