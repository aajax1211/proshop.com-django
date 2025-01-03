import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ userInfo, redirectPath = '/login' }) => {
  return userInfo ? <Outlet /> : <Navigate to={`${redirectPath}?redirect=${window.location.pathname}`} />;
};
