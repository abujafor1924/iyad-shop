import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../Hooks/useAxiuseSecure";
import Example from "./Chart/PiyChart";
import App from "./Chart/BarChart";

const Analytix = () => {
  const [axiosSecure] = useAxiuseSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-status"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-status");
      return res.data;
    },
  });

  return (
    <div className="my-24">
      <div className="flex w-[100%] ">
        <div className=" grid grid-cols-2 gap-4 text-white w-1/2 ml-4 mb-16 ">
          <div className="stats shadow bg-[#B8DDF7] p-4  ">
            <div className="stat ">
              <div className="stat-title">Total Customer</div>
              <div className="stat-value">{stats.users}</div>
            </div>
          </div>
          <div className="stats shadow bg-[#C1E6E7] p-4  ">
            <div className="stat ">
              <div className="stat-title">Total Product</div>
              <div className="stat-value">{stats.producs}</div>
            </div>
          </div>
          <div className="stats shadow bg-[#CAE5BE] p-4  ">
            <div className="stat ">
              <div className="stat-title">Total Order</div>
              <div className="stat-value">{stats.order}</div>
            </div>
          </div>
          <div className="stats shadow bg-[#D1CFE9] p-4  ">
            <div className="stat ">
              <div className="stat-title">Total Revinew</div>
              <div className="stat-value">${stats.revenue}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Example />
        </div>
      </div>
      <div className="flex justify-between">
        <App />
        <App />
      </div>
    </div>
  );
};

export default Analytix;
