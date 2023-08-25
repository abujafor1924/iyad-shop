import { FaMobileScreenButton } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex  justify-between ml-10 ">
      <ul className="flex justify-between py-1 border-b-2">
        <div className="md:flex justify-start ml-5 hidden">
          <li>Welcome to Our store IyadShop</li>
          <li className="flex ml-4">
            <span className="p-1 ">
              <FaMobileScreenButton />
            </span>{" "}
            Call Us: 123 - 456 - 7890
          </li>
        </div>
      </ul>
      <div>
        <ul className="flex mr-20">
          <li className="hidden md:block">
            <Link to={"/test"} className="ml-6">
              test
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"} className="ml-6">
              Deshboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
