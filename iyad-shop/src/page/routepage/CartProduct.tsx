import { FaTimes } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface CartItem {
  _id: string;
  categoryitemId: {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
}
const CartProduct = () => {
  const [cart, refetch] = useCart();

  const total = cart.reduce(
    (sum: number, item: CartItem) => item.categoryitemId?.price + sum,
    0
  );

  const handelDelete = (id: string) => {
    fetch(`https://iyad-shop-server.vercel.app/carts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Remove Cart Product");
        }
      });
  };

  return (
    <div className="w-[100%] mt-24">
      <h1 className="text-2xl font-bold text-center my-6">Cart Product</h1>
      <div className=" w-12/12 mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-2xl "
              >
                product: {cart.length}
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-2xl"
              >
                Total: <span className="text-red-700">${total}</span>
              </th>

              <th
                scope="col"
                className="px-6 py-4 font-medium text-blue-900 text-2xl "
              >
                <Link className="ml-28" to={"/payment"}>
                  pay
                </Link>
              </th>
            </tr>
            {/* <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Price
              </th>

              <th scope="col" className="pl-36 py-4 font-medium text-gray-900">
                Delete
              </th>
            </tr> */}
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {cart.map((love: CartItem) => (
              <tr key={love.categoryitemId?._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={love.categoryitemId?.image}
                      alt=""
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {love.categoryitemId?.name}
                    </div>
                    <div className="text-gray-400">
                      {love.categoryitemId?.category}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  Price: ${love.categoryitemId?.price}
                </td>
                <td className="px-6 py-4">
                  <div className=" ml-32 cursor-pointer">
                    <a
                      x-data={{ tooltip: "Delete" }}
                      onClick={() => handelDelete(love._id)}
                    >
                      <FaTimes className="text-2xl font-medium" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartProduct;
