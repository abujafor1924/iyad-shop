import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        //    navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper  w-3/3 h-[66.5vh]"
      >
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
