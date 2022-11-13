import React, { useEffect } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { MyTextInput, SizedBox } from '.'
import { useEmployeeForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { IUIState } from '../../redux/slices/ui';
import { employeeActions, IEmployeeState } from '../../redux/slices/employee';


interface Props {
  employeeMode?: boolean;
}

export const EmployeeDialog = React.memo(({ employeeMode = false }: Props) => {

  const dispatch = useDispatch();
  const dialogOpen = useSelector((state: any) => (state.ui as IUIState).employeeDialogVisible);
  const currentEmployee = useSelector((state: any) => (state.employee as IEmployeeState).currentEmployee);

  const {
    addressIcon,
    badgeIcon,
    birthdateIcon,
    control,
    mailIcon,
    phoneIcon,
    usernameIcon,
    createOrUpdateEmployee,
    handleClose,
    handleSubmit,
    resetForm,
    setForm,
  } = useEmployeeForm();

  useEffect(() => {
    if (!dialogOpen) {
      setTimeout(() => {
        resetForm();
        !employeeMode && dispatch(employeeActions.clearCurrentEmployee());
      }, 100);
    }
  }, [dialogOpen])

  useEffect(() => {
    if (currentEmployee && dialogOpen) {
      setForm(currentEmployee);
    }
  }, [currentEmployee, dialogOpen])

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(createOrUpdateEmployee)}>
        <DialogTitle id="alert-dialog-title">
          {employeeMode ? 'Datos personales' : 'Datos del empleado'}
        </DialogTitle>
        <DialogContent>
          <MyTextInput
            required
            name='ci'
            label='Cédula'
            pattern='ten-digits'
            icon={badgeIcon}
            control={control}
          />
          <SizedBox size={20} />
          <MyTextInput
            required
            name='firstNames'
            label='Nombres'
            pattern='letters'
            icon={usernameIcon}
            maxLength={50}
            control={control}
          />
          <SizedBox size={20} />
          <MyTextInput
            required
            name='lastNames'
            label='Apellidos'
            pattern='letters'
            icon={usernameIcon}
            maxLength={50}
            control={control}
          />
          <SizedBox size={20} />
          <MyTextInput
            required
            name='mail'
            label='Correo'
            pattern='email'
            icon={mailIcon}
            type='email'
            maxLength={50}
            control={control}
          />
          {
            employeeMode && (
              <>
                <SizedBox size={20} />
                <MyTextInput
                  name='birthDate'
                  label='Fecha de nacimiento'
                  icon={birthdateIcon}
                  maxLength={10}
                  type="date"
                  control={control}
                />
                <SizedBox size={20} />
                <MyTextInput
                  name='address'
                  label='Dirección'
                  icon={addressIcon}
                  maxLength={50}
                  control={control}
                />
                <SizedBox size={20} />
                <MyTextInput
                  name='phone'
                  label='Teléfono'
                  pattern='ten-digits'
                  icon={phoneIcon}
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
            {currentEmployee ? 'Guardar cambios' : 'Registrar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})
