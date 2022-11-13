import React from "react";
import { useEffect } from "react";

import { DataContainer, EmployeeDialog, PageContainer } from "../../components"
import { EmployeeInfo } from "./components"
import { VaccineDialog } from './components/VaccineDialog';
import { useDispatch, useSelector } from 'react-redux';
import { vaccineThunks } from "../../../redux/slices/vaccine";
import { employeeThunks } from "../../../redux/slices/employee";
import { IAuthState } from "../../../redux/slices/auth";

export const EmployeePage = React.memo(() => {

  const dispatch = useDispatch();
  const session = useSelector((state: any) => (state.auth as IAuthState).session);

  useEffect(() => {
    dispatch(vaccineThunks.getVaccineTypes());
  }, [])

  useEffect(() => {
    if (session && session.id) {
      dispatch(employeeThunks.getEmployeeByIdUser(session.id));
    }
  }, [session])

  return (
    <PageContainer>
      <DataContainer>
        <EmployeeInfo />
        <EmployeeDialog employeeMode />
        <VaccineDialog />
      </DataContainer>
    </PageContainer>
  )
})
