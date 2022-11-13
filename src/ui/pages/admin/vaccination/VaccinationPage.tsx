import React from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { employeeActions } from "../../../../redux/slices/employee";
import { vaccineActions, vaccineThunks } from "../../../../redux/slices/vaccine";
import { DataContainer, PageContainer } from "../../../components"
import { EmployeesList } from "../manageEmployee/components";
import { Header } from "./components"

export const VaccinationPage = React.memo(() => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(vaccineThunks.getVaccineTypes());

    return () => {
      dispatch(vaccineActions.clearVaccinesList());
      dispatch(employeeActions.clearEmployeesList());
    }

  }, [])

  return (
    <PageContainer>
      <DataContainer header={<Header />}>
        <EmployeesList nullListMessage='Para empezar tu búsqueda, selecciona los filtros y da clic en el botón buscar' />
      </DataContainer>
    </PageContainer>
  )
})
