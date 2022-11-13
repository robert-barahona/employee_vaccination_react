import React from "react";
import { useEffect } from "react";

import { DataContainer, PageContainer, EmployeeDialog } from "../../../components"
import { EmployeesList, Header } from "./components"
import { useDispatch } from 'react-redux';
import { employeeActions, employeeThunks } from '../../../../redux/slices/employee';

export const ManageEmployeePage = React.memo(() => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeThunks.getEmployees());

    return () => {
      dispatch(employeeActions.clearEmployeesList());
    }
  }, [])

  return (
    <PageContainer>
      <DataContainer header={<Header />}>
        <EmployeesList nullListMessage='Para crear nuevos empleados da clic en el botón morado que dice Nuevo' />
        <EmployeeDialog />
      </DataContainer>
    </PageContainer>
  )
})
