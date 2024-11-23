import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role) {
    return location.pathname.startsWith("/resident") ? (
      children
    ) : (
      <Navigate to="/resident" replace />
    );
  } else {
    return location.pathname.startsWith("/admin") ? (
      children
    ) : (
      <Navigate to="/admin" replace />
    );
  }
};

export const PublicRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const location = useLocation();
  const user = useSelector((store) => store.auth.user);

  return token ? (
    <Navigate
      to={user.role ? "/resident" : "/admin"}
      replace
      state={{ from: location }}
    />
  ) : (
    children
  );
};
