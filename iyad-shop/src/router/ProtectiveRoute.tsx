import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import { ReactNode } from "react";
import { ScaleLoader } from "react-spinners";
import { AuthContextModel } from "../Auth/AuthProvider";

export interface AuthProviderProps {
  children?: ReactNode;
}

type AuthContextModelFallback = AuthContextModel & {
  loading: boolean;
};
const ProtectiveRoute = ({ children }: AuthProviderProps) => {
  const { user, loading } = useAuth() as AuthContextModelFallback;
  const loacation = useLocation();

  if (loading) {
    return (
      <div className=" h-[70vh] flex flex-col justify-center items-center ">
        <ScaleLoader size={100} color="#07332F" />
      </div>
    );
  }
  if (user) {
    return children;
  }

  return (
    <Navigate to={"/login"} state={{ from: loacation }} replace></Navigate>
  );
};

export default ProtectiveRoute;
