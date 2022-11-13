import React from 'react'

import { useSelector } from 'react-redux';
import { IEmployeeState } from '../../../../redux/slices/employee';
import { EmployeeVaccinationData } from '../../../components';

export const VaccineData = React.memo(() => {

  const vaccineStatus = useSelector((state: any) => (state.employee as IEmployeeState).vaccineStatus);

  return (
    <div className="w-100 bg-light rounded-3 px-4 py-2 shadow-sm border">
      <EmployeeVaccinationData vaccineStatus={vaccineStatus} />
    </div>
  )
})
