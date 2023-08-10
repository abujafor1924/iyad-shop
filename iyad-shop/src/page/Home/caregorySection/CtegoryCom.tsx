import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import Product from "./Product";

const CtegoryCom = () => {
  const [axiosSecure] = useAxiuseSecure();
  const { data: category = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allCategory`);
      return res.data;
    },
  });

  return (
    <div className="w-[95%] mx-auto ml-6">
      <div>
        {category.map((ct) => (
          <div key={ct._id} className="bg-red-400 rounded px-8 py-4 my-8">
            <div className="flex justify-between border-b-2 border-slate-800">
              <h1 className="text-slate-900 font-extrabold text-2xl mt-4">
                {ct.category}
              </h1>
              <button className="btn btn-primary my-2">vew</button>
            </div>
            <div>
              <Product categoryId={ct._id}></Product>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CtegoryCom;
