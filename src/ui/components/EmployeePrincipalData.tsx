import { Badge, Email, Person } from '@mui/icons-material';
import React from 'react'
import { Info } from '.'
import { IEmployee } from '../../interfaces/IEmployee';

interface Props {
  employee?: IEmployee | null;
}

export const EmployeePrincipalData = React.memo(({ employee }: Props) => {

  return (
    <div className='row overflow-hidden align-items-center' style={{ flexGrow: 1 }}>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Cédula'
          info={employee?.ci}
          icon={<Badge />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Apellidos'
          info={employee?.lastNames}
          icon={<Person />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Nombres'
          info={employee?.firstNames}
          icon={<Person />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Correo'
          info={employee?.mail}
          icon={<Email />}
        />
      </div>
    </div>
  )
})
