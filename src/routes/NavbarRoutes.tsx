import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoute, EmployeeRoute, MyRoutes } from ".";
import { NavBar } from "../ui/components";
import { EmployeePage, ManageEmployeePage, VaccinationPage } from "../ui/pages";

export const NavbarRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>

        <Route path={MyRoutes.manageEmployee} element={
          <AdminRoute>
            <ManageEmployeePage />
          </AdminRoute>
        } />

        <Route path={MyRoutes.vaccination} element={
          <AdminRoute>
            <VaccinationPage />
          </AdminRoute>
        } />

        <Route path={MyRoutes.employee} element={
          <EmployeeRoute>
            <EmployeePage />
          </EmployeeRoute>
        } />

        <Route path="/*" element={<Navigate to={MyRoutes.manageEmployee} />} />

      </Routes>
    </>
  )
}
