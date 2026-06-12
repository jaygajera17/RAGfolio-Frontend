import { useAuth0 } from "@auth0/auth0-react";

export function UserProfile() {
  const { user } = useAuth0();

  if (!user) return null;

  return (
    <div>
      <img src={user.picture} alt={user.name} width={60} />

      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
