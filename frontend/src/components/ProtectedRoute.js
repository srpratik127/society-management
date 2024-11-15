import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const location = useLocation();

  return token ? (children) : (<Navigate to="/login" replace state={{ from: location }} />);
};

export const PublicRoute = ({ children }) => {
  const token = useSelector((store) => store.auth.token);
  const location = useLocation();
  const user = useSelector((store) => store.auth.user);

  return token ? (<Navigate to={user.role ? "/resident" : "/admin"} replace state={{ from: location }} />) : (children);
};
