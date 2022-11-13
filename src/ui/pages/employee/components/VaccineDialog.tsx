import React, { useEffect } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { MySelect, MyTextInput, SizedBox } from '../../../components'
import { useVaccineForm } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { IEmployeeState } from '../../../../redux/slices/employee'
import { IUIState } from '../../../../redux/slices/ui'
import { vaccineStatusOpts } from '../../../../utils'
import { IVaccineState } from '../../../../redux/slices/vaccine'

export const VaccineDialog = React.memo(() => {

  const dialogOpen = useSelector((state: any) => (state.ui as IUIState).vaccineDialogVisible);
  const vaccineStatus = useSelector((state: any) => (state.employee as IEmployeeState).vaccineStatus);
  const vaccinesList = useSelector((state: any) => (state.vaccine as IVaccineState).vaccinesList);

  const {
    control,
    dateIcon,
    dosesIcon,
    handleClose,
    handleSubmit,
    resetForm,
    setForm,
    updateVaccineStatus,
    watch,
  } = useVaccineForm();

  const isVaccinated = watch('isVaccinated');

  useEffect(() => {
    if (!dialogOpen) {
      resetForm();
    }
  }, [dialogOpen])

  useEffect(() => {
    if (vaccineStatus && dialogOpen) {
      setForm(vaccineStatus)
    }
  }, [vaccineStatus, dialogOpen])

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(updateVaccineStatus)}>
        <DialogTitle id="alert-dialog-title">
          Vacuna
        </DialogTitle>
        <DialogContent>
          <MySelect
            name='isVaccinated'
            label='Estado'
            options={vaccineStatusOpts}
            keyValue='value'
            keyToShow='text'
            control={control}
          />
          {
            isVaccinated && (
              <>
                <SizedBox size={20} />
                <MySelect
                  required
                  name='vaccine'
                  label='Tipo de vacuna'
                  options={vaccinesList ?? []}
                  keyValue='name'
                  keyToShow='name'
                  control={control}
                />
                <SizedBox size={20} />
                <MyTextInput
                  required
                  name='date'
                  label='Fecha de vacunación'
                  icon={dateIcon}
                  maxLength={10}
                  type="date"
                  control={control}
                />
                <SizedBox size={20} />
                <MyTextInput
                  required
                  name='doses'
                  label='Número de dósis'
                  icon={dosesIcon}
                  pattern='numbers'
                  control={control}
                />
              </>
            )
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button type='submit' autoFocus>
            Guardar cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})
