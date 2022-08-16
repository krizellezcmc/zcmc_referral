import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ user, role }) => {
  const location = useLocation();
  if (user === null) {
    <Navigate to="/" />;
  }

  if (user?.role === role) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
