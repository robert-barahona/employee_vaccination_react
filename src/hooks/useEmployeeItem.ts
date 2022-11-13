import { useCallback, useState } from "react";
import { batch, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { employeeActions, employeeThunks } from "../redux/slices/employee";
import { uiActions } from "../redux/slices/ui";
import { MyRoutes } from "../routes";
import { IEmployee } from '../interfaces';

export const useEmployeeItem = (employee: IEmployee) => {

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const manageMode = pathname === MyRoutes.manageEmployee;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = useCallback(() => {
    batch(() => {
      dispatch(employeeActions.setCurrentEmployee(employee));
      dispatch(uiActions.showEmployeeDialog());
    })
    handleCloseMenu();
  }, [employee])

  const handleDelete = useCallback(() => {
    dispatch(employeeThunks.deleteEmployee(employee));
    handleCloseMenu();
  }, [])

  return {
    anchorEl,
    manageMode,
    open,
    handleCloseMenu,
    handleOpenMenu,
    handleEdit,
    handleDelete,
  }

}