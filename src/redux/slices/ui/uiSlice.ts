import { createSlice } from '@reduxjs/toolkit'

export interface IUIState {
  employeeDialogVisible: boolean;
  vaccineDialogVisible: boolean;
}

const initialState: IUIState = {
  employeeDialogVisible: false,
  vaccineDialogVisible: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showEmployeeDialog: (state) => {
      state.employeeDialogVisible = true;
    },
    hideEmployeeDialog: (state) => {
      state.employeeDialogVisible = false;
    },
    showVaccineDialog: (state) => {
      state.vaccineDialogVisible = true;
    },
    hideVaccineDialog: (state) => {
      state.vaccineDialogVisible = false;
    },
  },
})

export const uiActions = uiSlice.actions

export const uiReducer = uiSlice.reducer