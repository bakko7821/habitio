import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function OnlyGuestRoute() {
  const { isAuthed } = useAuth();

  if (isAuthed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
