import { PropsWithChildren } from 'react';
import { useAuthCheck } from '../hooks';

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null
  }

  return children
};

export default ProtectedLayout;