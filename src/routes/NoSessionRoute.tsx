import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthState } from '../redux/slices/auth';
import { MyRoutes } from '.';

export const NoSessionRoute = ({ children }: any) => {

  const session = useSelector((state: any) => (state.auth as IAuthState).session);

  return session
    ? <Navigate to={session.isAdmin ? MyRoutes.manageEmployee : MyRoutes.employee} />
    : children
}
