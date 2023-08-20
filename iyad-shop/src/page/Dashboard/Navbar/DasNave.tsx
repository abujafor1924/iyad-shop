import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaUserLarge } from "react-icons/fa6";

const DasNave = () => {
  const { user } = useAuth();
  return (
    <div className="navbar bg-gray-800 text-white  fixed top-0 z-40 w-[77%] py-4">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link to={"/"}>
          <FaGlobe />
        </Link>
        <a className="btn btn-ghost normal-case text-xl">IYADSHOP</a>
      </div>
      <label className="btn btn-ghost btn-circle avatar mr-10">
        <div className=" w-10 rounded-full">
          {user ? (
            <img title={user?.displayName ?? ""} src={user.photoURL ?? ""} />
          ) : (
            <FaUserLarge className="text-xl mt-2 ml-2" />
          )}
        </div>
      </label>
    </div>
  );
};

export default DasNave;
