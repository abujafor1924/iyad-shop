import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiuseSecure from "./useAxiuseSecure";

const useCart = () => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiuseSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading,
    // enabled: user !== null,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      // console.log("axios get cart", res);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
