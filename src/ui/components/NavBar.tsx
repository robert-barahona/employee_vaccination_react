import { Logout } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyRoutes } from '../../routes';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthState } from '../../redux/slices/auth';
import { authThunks } from '../../redux/slices/auth/authThunks';
import { SizedBox } from '.';

export const NavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: any) => (state.auth as IAuthState).session?.isAdmin);

  const goToManageEmployees = () => navigate(MyRoutes.manageEmployee);
  const goToVaccination = () => navigate(MyRoutes.vaccination);
  const handleLogOut = () => dispatch(authThunks.logOut());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <div className="w-100 d-flex align-items-center">
            <h3>
              Kruger
            </h3>
            <SizedBox size={30} />
            {
              isAdmin ? (
                <>
                  <span
                    className={`p-3 pointer ${location.pathname === MyRoutes.manageEmployee && 'fw-bold'}`}
                    onClick={goToManageEmployees}
                  >
                    Empleados
                  </span>
                  <span
                    className={`p-3 pointer ${location.pathname === MyRoutes.vaccination && 'fw-bold'}`}
                    onClick={goToVaccination}
                  >
                    Control de vacunas
                  </span>
                </>
              ) : (
                <span
                  className={`p-3 pointer ${location.pathname === MyRoutes.employee && 'fw-bold'}`}
                >
                  Mis datos
                </span>
              )
            }
          </div>
          <IconButton
            color="inherit"
            onClick={handleLogOut}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
