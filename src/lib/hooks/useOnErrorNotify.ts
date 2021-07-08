import { useSnackbar } from 'notistack'
import { ServerError } from '../types'

const useOnErrorNotify = () => {
  const { enqueueSnackbar } = useSnackbar()

  const notify = (err: unknown) => {
    const errors = (err as ServerError)?.response?.data?.message
    if (!errors) {
      enqueueSnackbar('Something Went Wrong !', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    } else if (typeof errors === 'string') {
      enqueueSnackbar(errors, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    } else {
      errors.forEach((error) => {
        enqueueSnackbar(error, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      })
    }
  }
  return notify
}

export { useOnErrorNotify }
