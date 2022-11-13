import { useCallback, useMemo } from "react";
import moment from "moment";

import { Tag, Today } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { IVaccineStatus } from '../interfaces/IVaccineStatus';
import { uiActions } from "../redux/slices/ui";
import { vaccineThunks } from "../redux/slices/vaccine";
import { useForm, SubmitHandler } from 'react-hook-form';
import { dateIsHigherToday } from "../utils";
import { TEXT_FIELD_DATE_HIGHER } from "../constants/strings";

export const useVaccineForm = () => {

  const dispatch = useDispatch();

  const dateIcon = useMemo(() => <Today />, []);
  const dosesIcon = useMemo(() => <Tag />, []);

  const initForm: IVaccineStatus = {
    date: null,
    doses: null,
    isVaccinated: null,
    vaccine: null,
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
  } = useForm<IVaccineStatus>();

  const updateVaccineStatus: SubmitHandler<IVaccineStatus> = (data) => {
    if (typeof data.isVaccinated === 'string') {
      dispatch(uiActions.hideVaccineDialog());
      return;
    }

    const dateHigher = dateIsHigherToday(data.date);
    dateHigher && setError('date', { message: TEXT_FIELD_DATE_HIGHER });

    if (dateHigher && data.isVaccinated) return;

    dispatch(vaccineThunks.updateVaccineByEmployee({
      ...data,
      date: !!data.isVaccinated ? moment(data.date, 'YYYY-MM-DD').toDate() : null,
      vaccine: !!data.isVaccinated ? data.vaccine : '',
    }));
  }

  const handleClose = useCallback(() => {
    dispatch(uiActions.hideVaccineDialog());
  }, []);

  const setForm = (vaccineStatus: IVaccineStatus) => {
    reset(vaccineStatus);
    const { date } = vaccineStatus;
    setValue('date', date ? moment(date).format('YYYY-MM-DD') : '');
  }

  const resetForm = () => {
    Object.keys(initForm).forEach(e => {
      const k = e as keyof IVaccineStatus;
      setValue(k, initForm[k] ? initForm[k] : '');
    })
  }

  return {
    control,
    dateIcon,
    dosesIcon,
    handleClose,
    handleSubmit,
    resetForm,
    setForm,
    updateVaccineStatus,
    watch,
  }

}