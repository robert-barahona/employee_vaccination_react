import { Dispatch } from "@reduxjs/toolkit"
import { ApiHelper } from "../../../api/ApiHelper"
import { AlertHelper } from "../../../utils";
import { employeeActions } from '.';
import { IEmployee, IFilterParams, IUser } from "../../../interfaces";
import { ALDREADY_EXIST, NO_ID_ERROR } from "../../../constants/strings";
import { uiActions } from "../ui";
import { batch } from 'react-redux';
import { IEmployeeState } from './employeeSlice';

const alert = AlertHelper.getInstance();

const getEmployeeByIdUser = (idUser: number): any => {
  return async (dispatch: Dispatch) => {

    alert.showLoading('Cargando información del empleado');

    const getEmployeeResp = await ApiHelper.get(`/employees?userId=${idUser}`);

    if (getEmployeeResp.error) {
      alert.showError(getEmployeeResp.error)
      return;
    }

    if (getEmployeeResp.data.length)
      dispatch(employeeActions.setCurrentEmployee(getEmployeeResp.data[0]));

    const getVaccineResp = await ApiHelper.get(`/vaccineStatus?employeeId=${getEmployeeResp.data[0].id}`);

    if (getVaccineResp.error) {
      alert.showError(getVaccineResp.error);
      return;
    }

    if (getVaccineResp.data.length)
      dispatch(employeeActions.setVaccineStatus(getVaccineResp.data[0]));

    alert.hideLoading();

  }
}

const getEmployees = (): any => {
  return async (dispatch: Dispatch) => {

    alert.showLoading('Cargando empleados');

    const { data, error } = await ApiHelper.get('/employees');

    if (error) {
      alert.showError(error)
      return;
    }

    dispatch(employeeActions.setEmployeesList(data));
    alert.hideLoading();

  }
}

const deleteEmployee = (employee: IEmployee): any => {
  return async (dispatch: Dispatch) => {

    const { id, userId, firstNames, lastNames } = employee;
    if (!id) throw new Error(NO_ID_ERROR);

    const confirm = await alert.showConfirm({
      title: `¿Eliminar a ${firstNames.split(' ')[0]} ${lastNames.split(' ')[0]}?`,
      text: 'Esta acción no se puede deshacer',
    });

    if (!confirm) return;

    alert.showLoading('Eliminando empleado');

    const { error } = await ApiHelper.delete(`/users/${userId}`);

    if (error) {
      alert.showError(error);
      return;
    }

    dispatch(employeeActions.removeEmployee(id));
    alert.showSuccess({ message: 'Usuario eliminado' });

  }
}

const createEmployee = (employee: IEmployee): any => {
  return async (dispatch: Dispatch, getState: any) => {

    const user: IUser = {
      username: employee.mail,
      password: employee.ci,
      isAdmin: false,
    }

    const { employeesList } = getState().employee as IEmployeeState;

    if (employeesList?.find(e => e.ci === employee.ci)) {
      alert.showError(`${ALDREADY_EXIST} ${employee.ci}`)
      return;
    }

    alert.showLoading();

    const createUserResp = await ApiHelper.post('/users', user);

    if (createUserResp.error) {
      alert.showError(createUserResp.error);
      return;
    }

    employee.userId = (createUserResp.data as IUser).id;
    const craeteEmployeeResp = await ApiHelper.post('/employees', employee);

    if (craeteEmployeeResp.error) {
      alert.showError(craeteEmployeeResp.error);
      return;
    }

    batch(() => {
      dispatch(uiActions.hideEmployeeDialog());
      dispatch(employeeActions.addEmployee(craeteEmployeeResp.data));
    })

    alert.showSuccess({
      title: 'Empleado creado',
      message: `Usuario: ${user.username} \n\n Contraseña: ${user.password}`,
    });

  }
}

const updateEmployee = (employee: IEmployee): any => {
  return async (dispatch: Dispatch, getState: any) => {

    const { id } = employee;
    if (!id) throw new Error(NO_ID_ERROR);

    const { employeesList } = getState().employee as IEmployeeState;

    if (employeesList?.find(e => e.ci === employee.ci && e.id !== employee.id)) {
      alert.showError(`${ALDREADY_EXIST} ${employee.ci}`)
      return;
    }

    alert.showLoading();

    const { data, error } = await ApiHelper.put(`/employees/${id}`, employee);

    if (error) {
      alert.showError(error);
      return;
    }

    batch(() => {
      dispatch(employeeActions.updateEmployee(data));
      dispatch(uiActions.hideEmployeeDialog());
    });

    alert.showSuccess({ message: 'Cambios guardados' });

  }
}

const getUsersWithVaccineStatus = (filterParams?: IFilterParams): any => {
  return async (dispatch: Dispatch) => {

    alert.showLoading();

    const { data, error } = await ApiHelper.get('/employees?_embed=vaccineStatus');

    if (error) {
      alert.showError(error);
      return;
    }

    if (data.length) {
      data.forEach((e: any) => {
        e.vaccineStatus = e.vaccineStatus.length ? e.vaccineStatus[0] : {};
      });
    }

    if (filterParams) {
      dispatch(employeeActions.filterEmployeesList({ filterParams, list: data }))
    } else {
      dispatch(employeeActions.setEmployeesList(data));
    }
    alert.hideLoading();

  }
}

export const employeeThunks = {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeeByIdUser,
  getUsersWithVaccineStatus,
  updateEmployee,
}