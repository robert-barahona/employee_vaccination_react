import React from 'react'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useFilterForm } from '../../../../../hooks'
import { IVaccineState } from '../../../../../redux/slices/vaccine'

import { vaccineStatusOpts } from '../../../../../utils'
import { MySelect, MyTextInput } from '../../../../components'

export const Header = React.memo(() => {

  const vaccinesList = useSelector((state: any) => (state.vaccine as IVaccineState).vaccinesList);

  const {
    control,
    dateIcon,
    handleSubmit,
    filterEmployees,
  } = useFilterForm();

  return (
    <>
      <div className="d-flex align-items-center">
        <form className='row' style={{ flexGrow: 1 }} onSubmit={handleSubmit(filterEmployees)}>
          <div className="col-6 col-lg-2 py-2">
            <MySelect
              name='isVaccinated'
              label='Estado'
              options={vaccineStatusOpts}
              keyValue='value'
              keyToShow='text'
              control={control}
              focused
              fullWidth
            />
          </div>
          <div className="col-6 col-lg-2 py-2">
            <MySelect
              name='vaccine'
              label='Tipo de vacuna'
              options={vaccinesList ?? []}
              keyValue='name'
              keyToShow='name'
              control={control}
              focused
              fullWidth
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2 py-2">
            <MyTextInput
              name='date1'
              label='Fecha inicio'
              icon={dateIcon}
              maxLength={10}
              type="date"
              control={control}
              focused
              fullWidth
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2 py-2">
            <MyTextInput
              focused
              fullWidth
              name='date2'
              label='Fecha fin'
              icon={dateIcon}
              maxLength={10}
              type="date"
              control={control}
            />
          </div>
          <div className="d-flex align-items-center col-md-4 col-lg-2 py-2 ms-auto">
            <Button
              type='submit'
              variant='contained'
              fullWidth
              disableElevation
            >
              Buscar
            </Button>
          </div>
        </form>

      </div>
    </>
  )
})
