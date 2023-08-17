import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import useAxiuseSecure from "./../../../Hooks/useAxiuseSecure";
import { FaRegUserCircle, FaTrashAlt } from "react-icons/fa";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const MackAdmin = () => {
  const [axiosSecure] = useAxiuseSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handaleMakeAdmin = (user: User) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`${user.name} is Admin Now`);
          refetch();
        }
      });
  };

  const handeleDeleteUser = (user: User) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`${user.name} is Deleted`);
          refetch();
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>All Users || Doc-Aid</title>
      </Helmet>
      <div className="-mt-28">
        <h1 className="text-4xl font-bold text-center py-4 text-[#07332F] ">
          All Customer {users.length}
        </h1>
        {/* table area */}
        <div className="overflow-x-auto">
          <table className="table ">
            <thead>
              <tr className="text-2xl font-semibold text-black">
                <th className="px-10">#</th>
                <th className="px-10">Name</th>
                <th className="px-10">Email</th>
                <th className="px-10">Roll</th>
                <th className="px-10">Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => (
                <tr key={user._id} className="text-xl  text-black ">
                  <td className="px-10">{index + 1}</td>
                  <td className="px-10">{user.name}</td>
                  <td className="px-10">{user.email}</td>

                  <td className="px-10">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handaleMakeAdmin(user)}
                        className="btn btn-custom"
                      >
                        <FaRegUserCircle className="text-blue-800" />
                      </button>
                    )}
                  </td>
                  <td className="px-20">
                    {" "}
                    <button
                      onClick={() => handeleDeleteUser(user)}
                      className="btn btn-custom"
                    >
                      <FaTrashAlt className="text-red-800" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MackAdmin;
