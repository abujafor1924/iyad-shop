import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiuseSecure from "./useAxiuseSecure";

const usePament = () => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiuseSecure();
  const { refetch, data: payHistory = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading,
    // enabled: user !== null,
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user?.email}`);
      // console.log("axios get cart", res);
      return res.data;
    },
  });
  return [payHistory, refetch];
};

export default usePament;
