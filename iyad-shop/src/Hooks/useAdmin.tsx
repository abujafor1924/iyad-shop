import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiuseSecure from "./useAxiuseSecure";
import { AuthContextModel } from "../Auth/AuthProvider";

type AuthContextModelFallback = AuthContextModel & {
  loading: boolean;
};
const useAdmin = () => {
  const { user, loading } = useAuth() as AuthContextModelFallback;
  const [axiosSecure] = useAxiuseSecure();
  // use axios secure with react query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],

    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log(res);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
