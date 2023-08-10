import { useQuery } from "@tanstack/react-query";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";

const Product = ({ categoryId }) => {
  const [axiosSecure] = useAxiuseSecure();
  const { data: product = [], refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allProduct?category=${categoryId}`);
      return res.data;
    },
  });
  return (
    <div>
      {product.map((pd) => (
        <div key={pd._id}>{pd.name}</div>
      ))}
    </div>
  );
};

export default Product;
