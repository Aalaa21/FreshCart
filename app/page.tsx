import Products from "./_components/products/Products";
import slider1 from "../assets/home-slider-1.d79601a8.png";
import slider2 from "../assets/slider-2.png";
import slider3 from "../assets/slider-3.png";
import SliderComp from "./_components/slider/slider";

import { lazy, Suspense } from "react";
import { cookies } from "next/headers";
import LoadingComponent from "./_components/loading/LoadingComponent";
import { getServerSession } from "next-auth";

const Categories = lazy(() => import("./_components/categories/Categories"));

export default async function Home() {
  const session = await getServerSession();
  console.log("Session", session);
  return (
    <>
    <h1> Welcome, {session?.user?.name}!</h1>
      <SliderComp
        slidesPerView={1}
        pageList={[slider1.src, slider2.src, slider3.src]}
      />

      <Suspense fallback={<LoadingComponent />}>
        <Categories />
      </Suspense>

      <Products />
    </>
  );
}
