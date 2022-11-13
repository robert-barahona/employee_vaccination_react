import React from 'react';

import { SizedBox } from '../../../../components'
import { EmployeeItem } from '.'
import { useSelector } from 'react-redux';
import { IEmployeeState } from '../../../../../redux/slices/employee';
import NoDataImg from '../../../../../assets/images/no_data.png';

interface Props {
  nullListMessage?: string;
}

export const EmployeesList = React.memo(({ nullListMessage }: Props) => {

  const employeesList = useSelector((state: any) => (state.employee as IEmployeeState).employeesList);

  if (!employeesList) {
    if (!nullListMessage) return <></>;
    return (
      <div className='d-flex flex-column h-100 align-items-center justify-content-center bg-light rounded-3'>
        <span className='h1 text-center text-dark px-5'>
          {nullListMessage}
        </span>
      </div>
    )
  }

  return (
    <>
      {
        employeesList.length ? employeesList.map(e => (
          <div key={e.id}>
            <EmployeeItem employee={e} />
            <SizedBox size={30} />
          </div>
        )) : (
          <div className='d-flex flex-column h-100 align-items-center justify-content-center'>
            <img src={NoDataImg} className='w-100' style={{ maxWidth: 500 }} />
          </div>
        )
      }
    </>
  )
})
