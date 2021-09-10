import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { ServerError } from '../types'

const useOnErrorNotify = () => {
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const notify = (err: unknown) => {
    const errors = (err as ServerError)?.response?.data?.message
    const statusCode = (err as ServerError)?.response?.status

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
    if (statusCode === 401) {
      history.push('/login')
    }
    if (statusCode === 403) {
      enqueueSnackbar("You don't have enough permissions", {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })

    }
  }
  return notify
}

export { useOnErrorNotify }
