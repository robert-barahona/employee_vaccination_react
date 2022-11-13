import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { IEmployee, IFilterParams, IVaccineStatus } from '../../../interfaces';

export interface IEmployeeState {
  currentEmployee: IEmployee | null;
  employeesList: IEmployee[] | null;
  vaccineStatus: IVaccineStatus | null;
}

const initialState: IEmployeeState = {
  currentEmployee: null,
  employeesList: null,
  vaccineStatus: null,
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
      if (!state.employeesList) return;
      const exist = state.employeesList.find(e => e.id === action.payload.id);
      if (exist) return;
      state.employeesList.push(action.payload);
      state.employeesList.sort((a, b) => a.lastNames.localeCompare(b.lastNames));
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      if (state.currentEmployee?.id === action.payload.id) {
        state.currentEmployee = action.payload;
      }
      if (!state.employeesList) return;
      state.employeesList = state.employeesList.filter(e => e.id !== action.payload.id);
      state.employeesList.push(action.payload);
      state.employeesList.sort((a, b) => a.lastNames.localeCompare(b.lastNames));
    },
    removeEmployee: (state, action: PayloadAction<number>) => {
      if (!state.employeesList) return;
      state.employeesList = state.employeesList.filter(e => e.id !== action.payload);
      state.employeesList.sort((a, b) => a.lastNames.localeCompare(b.lastNames));
    },
    setCurrentEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.currentEmployee = action.payload;
    },
    clearEmployeesList: (state) => {
      state.employeesList = null;
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
    setEmployeesList: (state, action: PayloadAction<IEmployee[]>) => {
      state.employeesList = action.payload;
      state.employeesList.sort((a, b) => a.lastNames.localeCompare(b.lastNames));
    },
    setVaccineStatus: (state, action: PayloadAction<IVaccineStatus>) => {
      state.vaccineStatus = action.payload;
    },
    filterEmployeesList: (state, action: PayloadAction<{ filterParams: IFilterParams, list: IEmployee[] }>) => {
      const { filterParams: { isVaccinated, vaccine, date1, date2 }, list } = action.payload;

      const startDate = moment(date1).format('YYYY-MM-DD');
      const endDate = moment(date2).format('YYYY-MM-DD');

      state.employeesList = list.filter(e => {

        const vaccineDate = moment(e.vaccineStatus?.date).format('YYYY-MM-DD');
        // Condition if is vaccinated
        const condition1 = typeof isVaccinated === 'boolean' ? e.vaccineStatus?.isVaccinated === isVaccinated : true;
        // Condition for vaccine type
        const condition2 = vaccine?.length ? e.vaccineStatus?.vaccine === vaccine : true;
        // Condition for vaccine date in range
        const condition3 = moment(date1).isValid() ? vaccineDate >= startDate : true;
        const condition4 = moment(date2).isValid() ? vaccineDate <= endDate : true;

        return condition1 && condition2 && condition3 && condition4;
      });

      state.employeesList.sort((a, b) => a.lastNames.localeCompare(b.lastNames));
    },
  },
})

export const employeeActions = employeeSlice.actions

export const employeeReducer = employeeSlice.reducer