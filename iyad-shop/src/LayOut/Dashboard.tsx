import { useState } from "react";
import {
  FaAngleRight,
  FaDesktop,
  FaDotCircle,
  FaHome,
  FaOpencart,
} from "react-icons/fa";

import { Link, Outlet } from "react-router-dom";
import DasNave from "../page/Dashboard/Navbar/DasNave";
import useAdmin from "../Hooks/useAdmin";

const Dashboard: () => JSX.Element = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ispage, setIsPage] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownTogglePage = () => {
    setIsPage(!ispage);
  };

  const [isAdmin] = useAdmin();
  // const isAdmin = true;
  return (
    <div className="drawer lg:drawer-open w-[100%]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <DasNave />
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className=" hover:bg-slate-950 px-3 py-3 p-4  h-full  bg-slate-800 text-white  text-2xl font-semibold">
          {isAdmin ? (
            <>
              <span className="flex ml-3 my-6">
                <p className="text-red-400">Admin Deashbord</p>
              </span>
              <span className="flex ml-3">
                <FaHome className="text-sm mt-3 mr-3" />
                <Link to={"/dashboard/admin"}>Dashboard</Link>
              </span>
              <li
                onClick={handleDropdownToggle}
                className="flex justify-between m-2 mb-4"
              >
                {" "}
                <span className="flex">
                  <FaOpencart className="text-sm mt-3" />
                  <p className="ml-3">Product</p>
                </span>
                <FaAngleRight className="mt-2" />
              </li>
              {isDropdownOpen && (
                <ul className="dropdown-menu z-40 mb-4 ">
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/addproduct"}>Add New Product</Link>
                  </span>

                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/allproduct"}>All Product</Link>
                  </span>
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/category"}>All Category</Link>
                  </span>
                </ul>
              )}

              <li
                onClick={handleDropdownTogglePage}
                className="flex justify-between m-2 mb-4"
              >
                <span className="flex">
                  <FaDesktop className="text-sm mt-3" />
                  <p className="ml-3">Website Setup</p>
                </span>
                <FaAngleRight className="mt-2" />
              </li>
              {ispage && (
                <ul className="dropdown-menu z-40 ">
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/header"}>Header</Link>
                  </span>

                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/footer"}>Footer</Link>
                  </span>
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/pages"}>Pages</Link>
                  </span>
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/appearence"}>Appeareance</Link>
                  </span>
                  <span className="flex ml-10">
                    <FaDotCircle className="text-sm mt-3 mr-4" />
                    <Link to={"/dashboard/mackadmin"}>User roll</Link>
                  </span>
                </ul>
              )}
            </>
          ) : (
            <>
              <div>
                <h1 className="my-5 text-red-200">IYAD SHOP</h1>
                <ul>
                  <li>
                    <Link to={"/dashboard/user"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/cart"}>Cart Product</Link>
                  </li>

                  <li>
                    <Link to={"/dashboard/payHistory"}>payment History</Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
