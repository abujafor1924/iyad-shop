import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import { ReactNode } from "react";
import { ScaleLoader } from "react-spinners";

export interface AuthProviderProps {
  children?: ReactNode;
}

const ProtectiveRoute = ({ children }: AuthProviderProps) => {
  const { user, loading } = useAuth();
  const loacation = useLocation();

  if (loading) {
    return (
      <div className=" h-[70vh] flex flex-col justify-center items-center ">
        <ScaleLoader height={100} width={4} color="#07332F" />
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
