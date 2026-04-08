
'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

export default function SliderComp({slidesPerView,pageList}:{slidesPerView:number,pageList:string[]}) {
  return (
    <Swiper
        modules={[Navigation, Pagination]}
      spaceBetween={50}
      loop={true}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true, renderBullet: (index, className) => `<span class="${className}"></span>`, bulletActiveClass: 'bg-green-500! opacity-100! w-10! rounded-2xl!' }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >

      {pageList.map(img=> <SwiperSlide key={img}>
            <div className="relative w-full h-[400] mb-10">
            <Image
              src={img}
              alt="slide image"
              fill
              className="object-cover"
            />
          </div>

      </SwiperSlide>)}
    </Swiper>
  );
};