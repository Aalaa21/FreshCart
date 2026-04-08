
import { getProducts } from "../../../apis/products.api";
import ProductItem from "../productItem/ProductItem";

export default async function Products() {
  const res = await getProducts();
 

  const products= res.data

  return (
    <>
    
      <h2 className='text-2xl font-bold my-10'>Featured <span className='text-green-500 underline'> Products</span></h2>
    
      <div className="grid xl:grid-cols-5  md:grid-cols-4 grid-cols-1 gap-4">
      {products?.map((prod) => (
        <ProductItem prod={prod} key={prod._id}></ProductItem>
      ))}
    </div>
    </>

  );
}
