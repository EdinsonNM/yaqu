// src/components/ProtectedRoute.jsx
import { useAuth } from "@presentation/utils/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Loading } from "../loading/loading";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
