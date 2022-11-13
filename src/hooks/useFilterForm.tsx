import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { Today } from "@mui/icons-material";
import { employeeThunks } from "../redux/slices/employee";
import { IFilterParams } from "../interfaces";
import { dateIsHigherToday } from "../utils";
import { TEXT_FIELD_DATE_HIGHER } from "../constants/strings";

export const useFilterForm = () => {

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
  } = useForm<IFilterParams>();

  const isVaccinated = watch('isVaccinated');
  const vaccine = watch('vaccine');

  useEffect(() => {
    if (!isVaccinated && vaccine) {
      setValue('vaccine', '');
    }
  }, [isVaccinated, setValue])

  useEffect(() => {
    if (!isVaccinated && vaccine) {
      setValue('isVaccinated', true);
    }
  }, [vaccine, setValue])

  const filterEmployees: SubmitHandler<IFilterParams> = (data) => {

    const date1Higher = dateIsHigherToday(data.date1);
    date1Higher && setError('date1', { message: TEXT_FIELD_DATE_HIGHER });

    const date2Higher = dateIsHigherToday(data.date2);
    date2Higher && setError('date2', { message: TEXT_FIELD_DATE_HIGHER });

    if (date1Higher || date2Higher) return;
    dispatch(employeeThunks.getUsersWithVaccineStatus(data));

  }

  const dateIcon = useMemo(() => <Today />, []);

  return {
    control,
    dateIcon,
    filterEmployees,
    handleSubmit,
    setValue,
    watch,
  }
}