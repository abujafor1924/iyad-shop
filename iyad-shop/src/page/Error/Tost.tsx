// import axios from "axios";

// import { useState, useEffect } from "react";
// import { SwiperSlide } from "swiper/vue";

// const Tost = () => {
//   const [productCategories, setProductCategories] = useState({});

//   useEffect(() => {
//     axios
//       .get(`https://iyad-shop-server.vercel.app/allProduct`)
//       .then((response) => {
//         const products = response.data;

//         // Organize products by category
//         const categorizedProducts = {};
//         products.forEach((product) => {
//           const category = product.category;
//           if (!categorizedProducts[category]) {
//             categorizedProducts[category] = [];
//           }
//           categorizedProducts[category].push(product);
//         });

//         setProductCategories(categorizedProducts);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   return (
//     <div>
//       {Object.entries(productCategories).map(([category, products]) => (
//         <div key={category} className="bg-zinc-100">
//           <h2>{category}</h2>
//           <ul className="grid grid-cols-4 gap-4">
//             {products.map((product) => (
//               <SwiperSlide key={product._id}>
//                 <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                   <a>
//                     <img
//                       className="w-full h-52 mb-6 rounded-t-lg"
//                       src={pd.image}
//                       alt="product image"
//                     />
//                   </a>
//                   <div className="px-5 pb-5">
//                     <a href="#">
//                       <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                         {pd.name}
//                       </h5>
//                     </a>
//                     <div className="flex items-center mt-2.5 mb-5">
//                       <svg
//                         className="w-4 h-4 text-yellow-300 mr-1"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                       >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                       </svg>
//                       <svg
//                         className="w-4 h-4 text-yellow-300 mr-1"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                       >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                       </svg>
//                       <svg
//                         className="w-4 h-4 text-yellow-300 mr-1"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                       >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                       </svg>
//                       <svg
//                         className="w-4 h-4 text-yellow-300 mr-1"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                       >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                       </svg>
//                       <svg
//                         className="w-4 h-4 text-gray-200 dark:text-gray-600"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                       >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                       </svg>
//                       <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
//                         5.0
//                       </span>

//                       <button
//                         onClick={() => handeleFavorite(pd)}
//                         className="p-1 ml-12"
//                       >
//                         <FaRegHeart className="text-xl" />
//                       </button>
//                       <span className="p-1 ">
//                         <FaCodeCompare className="text-xl" />
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                         $<span>{pd.price}</span>
//                       </span>
//                       <button
//                         onClick={() => handleCart(pd)}
//                         className="text-white bg-[#9F1239] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                       >
//                         Add to cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tost;
