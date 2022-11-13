import React from "react";
import { useEffect } from "react";

import { DataContainer, EmployeeDialog, PageContainer } from "../../components"
import { EmployeeInfo } from "./components"
import { VaccineDialog } from './components/VaccineDialog';
import { useDispatch } from 'react-redux';
import { vaccineThunks } from "../../../redux/slices/vaccine";

export const EmployeePage = React.memo(() => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(vaccineThunks.getVaccineTypes());
  }, [])

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
