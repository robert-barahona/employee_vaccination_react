import React from 'react'

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { IEmployee } from '../../../../../interfaces';
import { EmployeePrincipalData, EmployeeVaccinationData, MyAvatar, SizedBox } from '../../../../components';
import { useEmployeeItem } from '../../../../../hooks';


interface Props {
  employee: IEmployee;
}

export const EmployeeItem = React.memo(({ employee }: Props) => {

  const { firstNames, lastNames } = employee;

  const {
    anchorEl,
    manageMode,
    open,
    handleCloseMenu,
    handleDelete,
    handleEdit,
    handleOpenMenu,
  } = useEmployeeItem(employee);

  return (
    <div className='d-flex align-items-center px-4 py-2 rounded-3 bg-light overflow-auto border'>
      <div className={`hide-onxs ${!manageMode && 'mt-3'}`} style={{ alignSelf: !manageMode ? 'flex-start' : undefined }}>
        <MyAvatar name={`${firstNames} ${lastNames}`} />
        <SizedBox size={20} />
      </div>


      {!manageMode ? (
        <div className='d-flex flex-column justify-content-center' style={{ flexGrow: 1 }}>
          <EmployeePrincipalData employee={employee} />
          <hr />
          <EmployeeVaccinationData vaccineStatus={employee.vaccineStatus} />
        </div>
      ) : <EmployeePrincipalData employee={employee} />
      }

      {
        manageMode && (
          <>
            <SizedBox size={20} />
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenMenu}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Editar</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Eliminar</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )
      }

    </div>
  )
})
