import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { FaCodeCompare, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useCart from "../../../Hooks/useCart";

interface Category {
  _id: string;
  categories: string;
}

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
}
const CategoryShow: React.FC = () => {
  const { user } = useAuth();
  const [, refetch] = useCart();
  const [isProduct, setIsProduct] = useState<string>("");
  const [bestProduct, setBestProduct] = useState<Product[]>([]);
  const [axiosSecure] = useAxiuseSecure();
  const { data: categories = [] } = useQuery<Category[]>({
    queryFn: async () => {
      const res = await axiosSecure.get(`allCategory`);
      return res.data;
    },
  });

  useEffect(() => {
    fetch(`http://localhost:5000/getparoduct?cat=${isProduct}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBestProduct(data);
      });
  }, [isProduct]);

  const handeleFavorite = (pd) => {
    const { name, category, price, image } = pd;
    fetch("http://localhost:5000/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, price, image }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        toast.success("Add Favorite successful");
      });
  };

  const handleCart = (id) => {
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
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryitemId }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          refetch();
          toast.success("Add to Cart SuccessFull");
        });
    }
  };

  return (
    <Tabs className=" w-11/12 mx-auto mb-10 ">
      <TabList>
        {categories.map((tb) => (
          <Tab key={tb._id} onClick={() => setIsProduct(tb.categories)}>
            {tb.categories}
          </Tab>
        ))}
      </TabList>
      {/* <h1>{bestProduct.length}</h1> */}

      {categories.map((tb) => (
        <TabPanel key={tb._id}>
          <div className="grid grid-cols-4 gap-4 mt-12">
            {bestProduct.map((pd) => (
              // <div key={pd._id}>
              //   <div className="card w-72 h-96 bg-base-100 shadow-xl my-4">
              //     <figure className="px-10 pt-10">
              //       <img
              //         src={pd.image}
              //         alt="Shoes"
              //         className="rounded w-64 h-48 my-4 "
              //       />
              //     </figure>
              //     <div className="card-body items-center text-center">
              //       <div className="card-actions">
              //         <button className="btn btn-ghost px-16 bg-slate-100 ">
              //           Add To Cart
              //         </button>
              //       </div>
              //       <h2 className="text-sm text-slate-900 ">{pd.name}</h2>
              //       <p>
              //         Price :{" "}
              //         <span className="text-red-600 text-xl font-medium">
              //           ${pd.price}
              //         </span>
              //       </p>
              //     </div>
              //   </div>
              // </div>

              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a>
                  <img
                    className="w-full h-52 mb-6 rounded-t-lg"
                    src={pd.image}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {pd.name}
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
                      onClick={() => handeleFavorite(pd)}
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
                      $<span>{pd.price}</span>
                    </span>
                    <button
                      onClick={() => handleCart(pd)}
                      className="text-white bg-[#9F1239] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default CategoryShow;
