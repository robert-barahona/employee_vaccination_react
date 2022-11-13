import React from "react"
import { Button, IconButton } from "@mui/material"
import { SizedBox } from "../../../../components"
import { Refresh } from "@mui/icons-material"
import { useDispatch } from 'react-redux';
import { employeeThunks } from "../../../../../redux/slices/employee";
import { uiActions } from "../../../../../redux/slices/ui";

export const Header = React.memo(() => {

  const dispatch = useDispatch();

  const handleRegresh = () => dispatch(employeeThunks.getEmployees());
  const handleNew = () => dispatch(uiActions.showEmployeeDialog());

  return (
    <>
      <div className="d-flex align-items-center">
        <span className="fs-3 fw-bold pb-1">
          Empleados
        </span>
        <SizedBox size={10} />
        <IconButton onClick={handleRegresh}>
          <Refresh />
        </IconButton>
        <div className="text-end" style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleNew}
          >
            Nuevo
          </Button>
        </div>
      </div>
    </>
  )
})
