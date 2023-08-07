import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../page/Loader/Loader";
import { ReactNode } from "react";

export interface AuthProviderProps {
  children?: ReactNode;
}

const ProtectiveRoute = ({ children }: AuthProviderProps) => {
  const { user, loading } = useAuth();
  const Loacation = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }

  return (
    <Navigate to={"/login"} state={{ from: Loacation }} replace></Navigate>
  );
};

export default ProtectiveRoute;
