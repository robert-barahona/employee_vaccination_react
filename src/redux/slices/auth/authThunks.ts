import { Dispatch } from "@reduxjs/toolkit"
import { ApiHelper } from '../../../api/ApiHelper';
import { authActions } from './authSlice';
import { AlertHelper } from '../../../utils';
import { IUser } from "../../../interfaces";
import { batch } from "react-redux";
import { employeeThunks } from "../employee";

const alert = AlertHelper.getInstance();

const logIn = (username: string, password: string): any => {
  return async (dispatch: Dispatch) => {

    alert.showLoading('Iniciando sesión...');

    const { data, error } = await ApiHelper.get(`/users?username=${username}&password=${password}`);

    if (error || !data?.length) {
      alert.showError(error ?? 'Usuario o contraseña incorrectos');
      return;
    }

    const user = data[0] as IUser;

    batch(() => {
      dispatch(authActions.saveSession(user));
      if (user.id && !user.isAdmin)
        dispatch(employeeThunks.getEmployeeByIdUser(user.id));
    })

    alert.hideLoading();

  }
}

const logOut = (): any => {
  return async (dispatch: Dispatch) => {

    const confirm = await alert.showConfirm({
      title: 'Cerrar sesión',
      text: '¿Está seguro que quiere salir?'
    });
    confirm && dispatch(authActions.logOut());

  }
}

export const authThunks = {
  logIn,
  logOut,
}