import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../../../Hooks/useAxiuseSecure";

import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

// import useAuth from "../../../../Hooks/useAuth";

const Category = () => {
  // const { user } = useAuth();
  const [axiosSecure] = useAxiuseSecure();
  const { data: category = [], refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allCategory`);
      return res.data;
    },
  });

  const handelDelete = (id: number) => {
    console.log(id);
    fetch(`https://iyad-shop-server.vercel.app/allCategory/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Delete successful");
        }
      });
  };
  return (
    <div className="mt-96 mb-20">
      <div className="flex justify-between -mt-52  px-10">
        <h1 className="text-2xl font-semibold text-center my-4 ">
          Category :
          <span className="text-2xl font-semibold text-red-700">
            {" "}
            {category.length}
          </span>
        </h1>
        <Link to={"/dashboard/addcategory"} className="btn btn-primary mt-2">
          Add Category
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-slate-200 text-black">
            <tr>
              <th className="pl-10">#</th>
              <th className=" pr-96">Name</th>

              <th className="px-20">Delete</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cd: any, index: number) => (
              <tr key={cd._id} className="bg-slate-50">
                <th className="px-10">{index + 1}</th>
                <td className="pr-96">{cd.categories}</td>

                <td className="px-20" onClick={() => handelDelete(cd._id)}>
                  <FaTrashAlt />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
