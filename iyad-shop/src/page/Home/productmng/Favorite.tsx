import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Favorite = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiuseSecure();
  const { data: favorite = [], refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite?email=${user?.email}`);
      return res.data;
    },
  });

  const handleFvDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/favorite/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Remove successful");
        }
      });
  };

  //   console.log(favorite[1]._id);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">Favorite Product</h1>
      <div className=" w-3/4 mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Price
              </th>

              <th scope="col" className="pl-36 py-4 font-medium text-gray-900">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {favorite.map((love) => (
              <tr key={love._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={love.favorite?.image}
                      alt=""
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {love.favorite?.name}
                    </div>
                    <div className="text-gray-400">
                      {love.favorite?.category}
                    </div>
                  </div>
                </th>

                <td className="px-6 py-4"> Price: ${love.favorite?.price}</td>

                <td className="px-6 py-4">
                  <div className=" ml-32">
                    <a
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => handleFvDelete(love._id)}
                    >
                      <FaTimes className="text-2xl font-medium cursor-pointer" />
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

export default Favorite;
