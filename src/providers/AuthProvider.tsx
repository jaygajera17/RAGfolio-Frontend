import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_CLIENT, AUTH0_DOMAIN } from "../constants/constant";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}