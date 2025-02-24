import { Outlet } from 'react-router-dom';
import { useAuthCheck } from '../../../shared/hooks';

const ProtectedLayout = () => {
  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null
  }

  return <Outlet />;
};

export default ProtectedLayout;