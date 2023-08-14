// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";

const NewArible: React.FC = () => {
  const [axiosSecure] = useAxiuseSecure();
  const { data: category = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/allProduct");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-x-emerald-900 w-11/12 mx-auto">
        New Areible
        {category.length}
      </h1>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {category.map((fd) => (
            <SwiperSlide key={fd._id}>
              <div className="card w-72 my-6 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={fd.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{fd.name}</h2>

                  <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArible;
