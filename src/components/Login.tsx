import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export function Login() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>Redirecting to login...</div>
  );
}