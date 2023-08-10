import { FaItalic } from "react-icons/fa";
import { FaCodeCompare, FaRegHeart, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex flex-wrap  ">
      <section className="relative mx-auto">
        <nav className="flex justify-between bg-gray-200 text-black w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              <span className="flex">
                <FaItalic className="-mr-1 mt-1 text-rose-800" />
                YADSHOP
              </span>
            </a>

            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link to={"/"} className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Catagory
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="hidden xl:flex space-x-5 items-center">
              <li className="flex px-1">
                <span className="p-1 ">
                  <FaCodeCompare className="text-xl" />
                </span>
              </li>
              <li className="flex px-1">
                <span className="p-1 ">
                  <FaRegHeart className="text-xl" />
                </span>
              </li>
              <a className="flex items-center " href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a>

              <div className="flex justify-end mr-10">
                <div className="relative">
                  <li className="flex px-2" onClick={handleDropdownToggle}>
                    <span className="p-1">
                      {user ? (
                        <>
                          <label className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ">
                              <img
                                // className="rounded-full"
                                src={user.photoURL}
                              />
                            </div>
                          </label>
                        </>
                      ) : (
                        <FaUserLarge className="text-xl" />
                      )}
                    </span>
                    <p className="text-xl font-semibold mt-4">
                      {user?.displayName}
                    </p>
                  </li>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu z-10 text-2xl font-semibold absolute bg-white mt-2 -ml-16">
                      {user ? (
                        <button onClick={handleLogOut} className="mt-2">
                          Log Out
                        </button>
                      ) : (
                        <>
                          <Link to={"/login"}>Login</Link>
                          <br />
                          <Link to={"/registretion"}>Resistretion</Link>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <a className="xl:hidden flex mr-6 items-center" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
