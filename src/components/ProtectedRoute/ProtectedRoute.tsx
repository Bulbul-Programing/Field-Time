import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../Redux/features/Auth/authSlice";
import { verifyToken } from "../../Utils/veryfyToken";
import { Navigate, useLocation } from "react-router-dom";

type TProtectRoute = {
  children: ReactNode;
  role: string;
};

const ProtectedRoute = ({ children, role }: TProtectRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation()
  if (!token) {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }

  return children

};

export default ProtectedRoute;
