import { FaShoppingCart, FaThLarge } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import usePament from "../../Hooks/usePament";
import useAuth from "../../Hooks/useAuth";
import useAxiuseSecure from "../../Hooks/useAxiuseSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa6";

const UserDesh = () => {
  const [cart] = useCart();
  const [payHistory] = usePament();
  const { user } = useAuth();
  const [axiosSecure] = useAxiuseSecure();
  const { data: favorite = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-3 gap-6 w-[90%] -mt-48">
      <div className="bg-[#7E6698] px-4  py-16 rounded flex">
        <FaRegHeart className=" bg-white text-6xl p-4 rounded-full mr-4" />
        <div>
          <p className="text-4xl font-bold text-white">{favorite.length}</p>
          <h1 className=" text-gray-300">Favorite Product</h1>
        </div>
      </div>
      <div className="bg-[#FB826D] px-4  py-16 rounded flex">
        <FaShoppingCart className=" bg-white text-6xl p-4 rounded-full mr-4" />
        <div>
          <p className="text-4xl font-bold text-white">{cart.length}</p>
          <h1 className=" text-gray-300">Product in Cart</h1>
        </div>
      </div>
      <div className="bg-[#7FB6A1] px-4  py-16 rounded flex">
        <FaThLarge className=" bg-white text-6xl p-4 rounded-full mr-4" />
        <div>
          <p className="text-4xl font-bold text-white">{payHistory.length}</p>
          <h1 className=" text-gray-300">Phurces Product</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDesh;
