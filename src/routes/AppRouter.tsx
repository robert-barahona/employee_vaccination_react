import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { NavbarRoutes, NoSessionRoute, MyRoutes } from ".";
import { LoginPage } from "../ui/pages";

export const AppRouter = () => {

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
