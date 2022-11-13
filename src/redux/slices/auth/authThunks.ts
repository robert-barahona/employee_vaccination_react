import { Dispatch } from "@reduxjs/toolkit"
import { ApiHelper } from '../../../api/ApiHelper';
import { authActions } from './authSlice';
import { AlertHelper, StorageHelper } from '../../../utils';
import { IUser } from "../../../interfaces";
import { KEY_SESSION } from "../../../constants";

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

    dispatch(authActions.saveSession(user));

    alert.hideLoading();

    StorageHelper.setItem(KEY_SESSION, JSON.stringify(user));

  }
}

const logOut = (): any => {
  return async (dispatch: Dispatch) => {

    const confirm = await alert.showConfirm({
      title: 'Cerrar sesión',
      text: '¿Está seguro que quiere salir?'
    });
    confirm && dispatch(authActions.logOut());
    StorageHelper.removeItem(KEY_SESSION);

  }
}

export const authThunks = {
  logIn,
  logOut,
}