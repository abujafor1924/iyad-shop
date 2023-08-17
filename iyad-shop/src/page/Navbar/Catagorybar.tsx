import { useState, useEffect } from "react";
import useAxiuseSecure from "../../Hooks/useAxiuseSecure";
import { useQuery } from "@tanstack/react-query";
import { FaAngleRight } from "react-icons/fa6";

const Catagorybar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isProduct, setIsProduct] = useState("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [axiosSecure] = useAxiuseSecure();
  const { data: categories = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/allCategory");
      return res.data;
    },
  });

  useEffect(() => {
    fetch(`http://localhost:5000/getparoduct?cat=${isProduct}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  }, [isProduct]);

  return (
    <form>
      <div className="flex mx-10 relative ">
        <button
          onClick={handleDropdownToggle}
          data-dropdown-toggle="dropdown"
          className="   w-60 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300   focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          All categories{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <ul
          className=" z-10 mt-10   w-60 rounded absolute py-2 text-sm bg-slate-100  text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {isDropdownOpen && (
            <>
              {categories.map((ct) => (
                <li key={ct._id}>
                  <button
                    type="button"
                    onClick={() => setIsProduct(ct.categories)}
                    className=" hover:bg-slate-200 text-xl font-medium inline-flex w-full px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {ct.categories}
                    <FaAngleRight className="font-light text-sm mt-2 ml-10" />
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
        <div
          id="dropdown"
          className="z-10  hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        ></div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-slate-400 rounded-r-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Catagorybar;
