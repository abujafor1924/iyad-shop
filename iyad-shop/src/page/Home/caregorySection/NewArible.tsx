import { FaCodeCompare, FaRegHeart } from "react-icons/fa6";
// import { toast } from "react-hot-toast";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
}

const NewArible = () => {
  const [newArriable, setNewArriable] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch("https://iyad-shop-server.vercel.app/newProduct")
      .then((res) => res.json())
      .then((data) => setNewArriable(data));
  }, []);

  const handeleFavorite = (pd: Product) => {
    const { name, category, price, image } = pd;
    if (user && user.email) {
      const favorite = {
        name,
        category,
        price,
        image,
        email: user.email,
      };
      fetch("https://iyad-shop-server.vercel.app/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toast.success("Add to Favorite SuccessFull");
        });
    }
  };

  const handleCart = (id: Product) => {
    const { name, category, price, image, quantity, description, _id } = id;
    if (user && user.email) {
      const categoryitemId = {
        orderId: _id,
        name,
        category,
        price,
        image,
        quantity,
        description,
        email: user.email,
      };
      fetch("https://iyad-shop-server.vercel.app/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryitemId }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toast.success("Add to Cart SuccessFull");
        });
    }
  };
  return (
    <div className=" px-7 mx-auto mb-10 ">
      <div className="py-4 my-6  bg-white px-4 rounded">
        <div className="text-2xl font-bold flex justify-between border-b-2 border-gray-200 bg-white">
          <h1 className="mt-6">New Arrival</h1>
          {/* <button className="btn bg-[#9F1239] my-4">Vew</button> */}
        </div>
        <div className=" mt-4 bg-white">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {newArriable.map((newProduct: Product) => (
              <SwiperSlide key={newProduct._id}>
                <div className="border-2 hover:border-[#991B1B] bor w-full max-w-sm bg-white   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/vew/${newProduct._id}`}>
                    <a>
                      <img
                        className="w-full h-52 mb-6 rounded-t-lg"
                        src={newProduct.image}
                        alt="product image"
                      />
                    </a>
                  </Link>
                  <div className="px-5 pb-5">
                    <a>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {newProduct.name}
                      </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>

                      <button
                        onClick={() => handeleFavorite(newProduct)}
                        className="p-1 ml-12"
                      >
                        <FaRegHeart className="text-xl" />
                      </button>
                      <span className="p-1 ">
                        <FaCodeCompare className="text-xl" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        $<span>{newProduct.price}</span>
                      </span>
                      <button
                        onClick={() => handleCart(newProduct)}
                        className="text-white bg-[#9F1239] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewArible;
