'use client';

import { useAuthorization } from '@/hooks/useAuthorization';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isLoaded, isAuthorized } = useAuthorization(allowedRoles);

  if (!isLoaded || !isAuthorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
