import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export class AlertHelper {
  private mySwal = withReactContent(Swal);

  private static instance: AlertHelper;

  private constructor() { }

  public static getInstance = (): AlertHelper => {
    if (!AlertHelper.instance) {
      AlertHelper.instance = new AlertHelper();
    }

    return AlertHelper.instance;
  }

  showError = async (message: string) => {
    await AlertHelper.instance.mySwal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: message,
    });
  }

  showWarning = async (message: string) => {
    await AlertHelper.instance.mySwal.fire({
      icon: 'warning',
      title: '¡Vaya!',
      text: message,
    });
  }

  showSuccess = async (params: { message: string, title?: string, timer?: number, showConfirmButton?: boolean }) => {
    const { title, message, timer, showConfirmButton } = params;
    await AlertHelper.instance.mySwal.fire({
      icon: 'success',
      title: title ?? '¡Genial!',
      text: message,
      timer: timer,
      showConfirmButton: showConfirmButton ?? true,
    });
  }

  showConfirm = async (props: { title: string, text?: string, confirmButtonText?: string, cancelButtonText?: string }) => {
    const { title, confirmButtonText, cancelButtonText, text } = props;
    const res = await AlertHelper.instance.mySwal.fire({
      icon: 'question',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText ?? 'SI',
      cancelButtonText: cancelButtonText ?? 'No',
    });
    return res.isConfirmed;
  }

  showLoading = async (message?: string) => {
    return await AlertHelper.instance.mySwal.fire({
      icon: 'info',
      text: message ?? 'Cargando...',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      didOpen: () => {
        AlertHelper.instance.mySwal.showLoading(null);
      }
    });
  }

  hideLoading = () => {
    AlertHelper.instance.mySwal.close();
  }
}