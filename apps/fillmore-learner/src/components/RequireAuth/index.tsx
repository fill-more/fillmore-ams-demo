import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PATHNAME } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';

function RequireAuth() {
  const { isLoading, isAuthenticated, loadCurrentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  if (!isLoading && !isAuthenticated) {
    return (
      <Navigate
        to={PATHNAME.LOGIN}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
