import { SizedBox } from '../../../components'
import { LoginForm } from './LoginForm'

export const LoginContainer = () => {
  return (
    <div className="d-flex flex-column bg-white shadow p-4 rounded-3">
      <span className="fw-bold fs-2 text-center">
        ¡Hola de nuevo!
      </span>
      <SizedBox size={30} />
      <LoginForm />
    </div>
  )
}
