import { Dispatch } from "@reduxjs/toolkit"
import { ApiHelper } from "../../../api/ApiHelper";
import { AlertHelper } from "../../../utils";
import { vaccineActions } from ".";
import { IVaccineStatus } from "../../../interfaces";
import { employeeActions, IEmployeeState } from "../employee";
import { NO_ID_ERROR } from "../../../constants/strings";
import { uiActions } from "../ui";
import { batch } from 'react-redux';

const alert = AlertHelper.getInstance();

const getVaccineTypes = (): any => {
  return async (dipsatch: Dispatch) => {

    // alert.showLoading()

    const { data, error } = await ApiHelper.get('/vaccines');

    if (error) {
      alert.showError(error);
      return;
    }

    dipsatch(vaccineActions.setVaccinesList(data));
    // alert.hideLoading();

  }
}

const updateVaccineByEmployee = (vaccineStatus: IVaccineStatus): any => {
  return async (dispatch: Dispatch, getState: any) => {

    alert.showLoading();

    const { currentEmployee } = getState().employee as IEmployeeState
    if (!currentEmployee) throw new Error(NO_ID_ERROR);

    vaccineStatus.employeeId = currentEmployee.id;
    const { id } = vaccineStatus;

    let updateVaccineResp: any;
    if (id) {
      updateVaccineResp = await ApiHelper.put(`/vaccineStatus/${id}`, vaccineStatus);
    } else {
      updateVaccineResp = await ApiHelper.post('/vaccineStatus', vaccineStatus);
    }

    if (updateVaccineResp.error) {
      alert.showError(updateVaccineResp.error);
      return;
    }

    batch(() => {
      dispatch(employeeActions.setVaccineStatus(updateVaccineResp.data));
      dispatch(uiActions.hideVaccineDialog());
    })
    alert.showSuccess({ message: 'Cambios guardados' });

  }
}

export const vaccineThunks = {
  getVaccineTypes,
  updateVaccineByEmployee,
}