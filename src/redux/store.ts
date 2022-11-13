import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth';
import { employeeReducer } from "./slices/employee";
import { uiReducer } from "./slices/ui";
import { vaccineReducer } from "./slices/vaccine";

const reducers = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  ui: uiReducer,
  vaccine: vaccineReducer,
});

const rootReducer = (state: any, action: AnyAction) => {

  if (action.type === 'auth/logOut') {
    state = undefined;
  }

  return reducers(state, action);
}

export const store = configureStore({ reducer: rootReducer });