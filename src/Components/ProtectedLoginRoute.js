import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../Pages/Loader";

const ProtectedLoginRoutes = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return <Loader />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/addhospital" state={{ from: location }} replace />;
  } else if (user?.role === "user") {
    return <Navigate to="/home" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoutes;
