import { useState } from "react";
import {
  FaMobileScreenButton,
  FaCodeCompare,
  FaRegHeart,
  FaUserLarge,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
const TopBar = () => {
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
    <>
      <ul className="flex justify-between py-1 border-b-2">
        <div className="flex justify-start ml-5">
          <li>Welcome to Our store IyadShop</li>
          <li className="flex ml-4">
            <span className="p-1 ">
              <FaMobileScreenButton />
            </span>{" "}
            Call Us: 123 - 456 - 7890
          </li>
          <li>
            <Link to={"/test"} className="ml-6">
              test
            </Link>
          </li>
        </div>
        <div className="flex justify-end mr-10">
          <li className="flex px-2">
            <span className="p-1 ">
              <FaCodeCompare />
            </span>
            Compear
          </li>
          <li className="flex px-2">
            <span className="p-1 ">
              <FaRegHeart />
            </span>
            Wishlist
          </li>

          <div className="relative">
            <li className="flex px-2" onClick={handleDropdownToggle}>
              <span className="p-1">
                <FaUserLarge />
              </span>
              Account
            </li>
            {isDropdownOpen && (
              <ul className="dropdown-menu z-10 absolute ">
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
      </ul>
    </>
  );
};

export default TopBar;
