import React from 'react'
import { MyAvatar, SizedBox } from '../../../components'
import { useDispatch, useSelector } from 'react-redux';
import { IEmployeeState } from '../../../../redux/slices/employee';
import { PersonalData, SectionTitle } from '.';
import { useCallback } from 'react';
import { uiActions } from '../../../../redux/slices/ui';
import { VaccineData } from '.';

export const EmployeeInfo = React.memo(() => {

  const dispatch = useDispatch();

  const firstNames = useSelector((state: any) => (state.employee as IEmployeeState).currentEmployee?.firstNames);
  const lastNames = useSelector((state: any) => (state.employee as IEmployeeState).currentEmployee?.lastNames);

  const fullName = `${firstNames ?? ''} ${lastNames ?? ''}`.trim();

  const openPersonalDataForm = useCallback(() => dispatch(uiActions.showEmployeeDialog()), []);
  const openVaccineDataForm = useCallback(() => dispatch(uiActions.showVaccineDialog()), []);

  if (!firstNames) return <></>

  return (
    <div className='d-flex flex-column align-items-center'>
      <MyAvatar
        size={150}
        name={fullName}
      />
      <SizedBox size={40} />
      <SectionTitle
        title='Datos personales'
        onPress={openPersonalDataForm}
      />
      <SizedBox size={5} />
      <PersonalData />

      <SizedBox size={40} />
      <SectionTitle
        title='Datos de vacuna'
        onPress={openVaccineDataForm}
      />
      <SizedBox size={5} />
      <VaccineData />

    </div>
  )
})
