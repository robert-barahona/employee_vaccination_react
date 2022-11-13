import { useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { NavbarRoutes, NoSessionRoute, MyRoutes } from ".";
import { KEY_SESSION } from "../constants";
import { LoginPage } from "../ui/pages";
import { StorageHelper } from "../utils";
import { useDispatch } from 'react-redux';
import { authActions } from "../redux/slices/auth";

export const AppRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const session = StorageHelper.getItem(KEY_SESSION);
    session && dispatch(authActions.saveSession(JSON.parse(session)));
  }, [])

  return (
    <BrowserRouter>
      <Routes>

        <Route path={MyRoutes.login} element={
          <NoSessionRoute>
            <LoginPage />
          </NoSessionRoute>}
        />

        <Route path="/*" element={<NavbarRoutes />} />
        <Route path="/" element={<Navigate to={MyRoutes.login} />} />

      </Routes>
    </BrowserRouter>
  )
}
