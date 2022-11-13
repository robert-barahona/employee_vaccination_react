import { SizedBox } from '../../../components'
import { Button } from '@mui/material';
import { MyTextInput } from '../../../components/MyTextInput';
import { useLoginForm } from '../../../../hooks';

export const LoginForm = () => {

  const {
    control,
    passwordHiddenIcon,
    passwordVisible,
    passwordVisibleIcon,
    usernameIcon,
    handleSubmit,
    logIn,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(logIn)}>
      <MyTextInput
        required
        name='username'
        label='Usuario/Correo'
        icon={usernameIcon}
        control={control}
      />
      <SizedBox size={20} />
      <MyTextInput
        required
        name='password'
        label='Contraseña'
        type={passwordVisible ? 'text' : 'password'}
        icon={passwordVisible ? passwordHiddenIcon : passwordVisibleIcon}
        onIcon={togglePasswordVisibility}
        control={control}
      />
      <SizedBox size={40} />
      <Button
        fullWidth
        type='submit'
        variant="contained"
        disableElevation
      >
        Iniciar sesión
      </Button>
    </form>
  )
}
