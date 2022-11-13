import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../interfaces/IUser'

export interface IAuthState {
  session: IUser | null;
}

const initialState: IAuthState = {
  session: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    saveSession: (state, action: PayloadAction<IUser>) => {
      state.session = action.payload;
    },
    logOut: () => { },
  },
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer