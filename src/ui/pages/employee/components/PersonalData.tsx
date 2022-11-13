import React, { useMemo } from 'react'
import moment from 'moment';

import { useSelector } from 'react-redux';
import { IEmployeeState } from '../../../../redux/slices/employee';
import { EmployeePrincipalData, Info } from '../../../components'
import { LocationOn, Phone, Today } from '@mui/icons-material';

export const PersonalData = React.memo(() => {

  const currentEmployee = useSelector((state: any) => (state.employee as IEmployeeState).currentEmployee);

  const birthdateFormatted = useMemo(() => {
    return currentEmployee?.birthDate ? moment(currentEmployee?.birthDate).format('DD/MM/YYYY') : '';
  }, [currentEmployee?.birthDate])

  return (
    <div className="w-100 bg-light rounded-3 px-4 py-2 shadow-sm border">
      <EmployeePrincipalData employee={currentEmployee} />
      <hr />
      <div className='row overflow-hidden align-items-center' style={{ flexGrow: 1 }}>
        <div className="col-md-4 col-lg-3 py-2">
          <Info
            title='Fecha nacimiento'
            info={birthdateFormatted}
            icon={<Today />}
          />
        </div>
        <div className="col-md-4 col-lg-3 py-2">
          <Info
            title='Dirección'
            info={currentEmployee?.address}
            icon={<LocationOn />}
          />
        </div>
        <div className="col-md-4 col-lg-3 py-2">
          <Info
            title='Teléfono'
            info={currentEmployee?.phone}
            icon={<Phone />}
          />
        </div>
      </div>
    </div>
  )
})
