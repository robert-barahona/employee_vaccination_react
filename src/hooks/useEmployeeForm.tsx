import moment from "moment";

import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../redux/slices/ui";
import { Person, Mail, Badge, Today, LocationOn, Phone } from '@mui/icons-material';
import { employeeThunks } from "../redux/slices/employee";
import { store } from '../redux/store';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IEmployee } from "../interfaces";
import { dateIsHigherToday } from "../utils";
import { TEXT_FIELD_DATE_HIGHER } from "../constants/strings";

export const useEmployeeForm = () => {

  const dispatch = useDispatch();

  const badgeIcon = useMemo(() => <Badge />, []);
  const usernameIcon = useMemo(() => <Person />, []);
  const mailIcon = useMemo(() => <Mail />, []);
  const birthdateIcon = useMemo(() => <Today />, []);
  const addressIcon = useMemo(() => <LocationOn />, []);
  const phoneIcon = useMemo(() => <Phone />, []);

  const initForm: IEmployee = {
    ci: '',
    firstNames: '',
    lastNames: '',
    mail: '',
    address: null,
    birthDate: null,
    phone: null,
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
  } = useForm<IEmployee>();

  const createOrUpdateEmployee: SubmitHandler<IEmployee> = (data) => {

    const birthDateHigher = dateIsHigherToday(data.birthDate);
    birthDateHigher && setError('birthDate', { message: TEXT_FIELD_DATE_HIGHER });

    if (birthDateHigher) return;

    const { currentEmployee } = store.getState().employee;
    if (currentEmployee) {
      dispatch(employeeThunks.updateEmployee({
        ...data,
        birthDate: moment(data.birthDate, 'YYYY-MM-DD').toDate(),
      }));
    } else {
      dispatch(employeeThunks.createEmployee(data));
    }
  };

  const handleClose = useCallback(() => {
    dispatch(uiActions.hideEmployeeDialog());
  }, []);

  const setForm = (employee: IEmployee) => {
    reset(employee);
    const { birthDate } = employee;
    setValue('birthDate', birthDate ? moment(birthDate).format('YYYY-MM-DD') : '');
  }

  const resetForm = () => {
    Object.keys(initForm).forEach(e => {
      const k = e as keyof IEmployee;
      setValue(k, initForm[k] ? initForm[k] : '');
    })
  }

  return {
    addressIcon,
    badgeIcon,
    birthdateIcon,
    control,
    mailIcon,
    phoneIcon,
    usernameIcon,
    createOrUpdateEmployee,
    handleClose,
    handleSubmit,
    resetForm,
    setForm,
  }

}