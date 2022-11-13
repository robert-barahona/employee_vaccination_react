import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVaccine } from '../../../interfaces'

export interface IVaccineState {
  vaccinesList: IVaccine[] | null;
}

const initialState: IVaccineState = {
  vaccinesList: null,
}

export const vaccineSlice = createSlice({
  name: 'vaccine',
  initialState: initialState,
  reducers: {
    setVaccinesList: (state, action: PayloadAction<IVaccine[]>) => {
      state.vaccinesList = action.payload;
      state.vaccinesList.sort((a, b) => a.name.localeCompare(b.name));
    },
    clearVaccinesList: (state) => {
      state.vaccinesList = null;
    }
  },
})

export const vaccineActions = vaccineSlice.actions

export const vaccineReducer = vaccineSlice.reducer