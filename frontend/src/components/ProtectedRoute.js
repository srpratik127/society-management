import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.user_role === "admin") {
    return location.pathname.startsWith("/admin") ? (children) : (<Navigate to="/admin" replace />);
  }  
  else if (user?.user_role === "resident") {
    return location.pathname.startsWith("/resident") ? (children) : (<Navigate to="/resident" replace />);
  }
  else if (user?.user_role === "security") {
    return location.pathname.startsWith("/security") ? (children) : (<Navigate to="/security" replace />);
  }
};

export const PublicRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const location = useLocation();
  const user = useSelector((store) => store.auth.user);

  return token ? (
    <Navigate
      to={user?.user_role==="admin" ? "/admin" : user?.user_role==="resident" ? "/resident" : "/security"}
      replace
      state={{ from: location }}
    />
  ) : (
    children
  );
};
