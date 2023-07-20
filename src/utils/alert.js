import { useSnackbar } from 'vue3-snackbar'

export class showAlert {
  static error(msg) {
    const snackbar = useSnackbar()
    snackbar.add({
      type: 'error',
      text: msg
    })
  }
  static success(msg) {
    const snackbar = useSnackbar()
    snackbar.add({
      type: 'success',
      text: msg
    })
  }
}
