import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthState } from '../redux/slices/auth';
import { MyRoutes } from '.';

export const AdminRoute = ({ children }: any) => {

  const session = useSelector((state: any) => (state.auth as IAuthState).session);

  return session && session.isAdmin
    ? children
    : <Navigate to={MyRoutes.login} />
}
