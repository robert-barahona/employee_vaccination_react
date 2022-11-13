import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { authThunks } from "../redux/slices/auth";
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  username: string;
  password: string;
}

export const useLoginForm = () => {

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<IFormInput>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const usernameIcon = useMemo(() => <Person />, []);
  const passwordVisibleIcon = useMemo(() => <Visibility />, []);
  const passwordHiddenIcon = useMemo(() => <VisibilityOff />, []);

  const togglePasswordVisibility = useCallback(() => setPasswordVisible(currentValue => !currentValue), []);

  const logIn: SubmitHandler<IFormInput> = ({ username, password }) => {
    dispatch(authThunks.logIn(username, password));
  };

  return {
    control,
    passwordHiddenIcon,
    passwordVisible,
    passwordVisibleIcon,
    usernameIcon,
    handleSubmit,
    logIn,
    togglePasswordVisibility,
  }

}