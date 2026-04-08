"use client";

import { getAllOrders } from "@/apis/getAllOrders.api";
import { Button } from "@/components/ui/button";
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

import { useState } from "react";

export default  function AllOrdersComp() {

  const [orders, setOrders] = useState<any[]>([]);
  const handleClick = async () => {
    const data = await getAllOrders();
    console.log("Orders data:", data);
    setOrders(data.data);
    return data;
  };

  return (
    <>
      
       <h3>Total number of Orders: {orders.length}</h3>
            <Table className="border border-gray-300">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow className="divide-x divide-gray-300 border-b border-gray-300">
                  <TableHead>Date</TableHead>
           
                  <TableHead>OrderPrice</TableHead>
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                  {orders.map((order:any) => (
                    <TableRow className="divide-x divide-gray-300 border-b border-gray-300">
                      <TableCell>{order?.createdAt?.split('T')[0]}</TableCell>
                   
                      <TableCell>{order?.totalOrderPrice?.toFixed(2)} EGP </TableCell>
              
                    
                    </TableRow>
                  ))}
          
              </TableBody>

            </Table>


          <Button onClick={handleClick}>Get All Orders</Button>

 
    </>
  );
}
