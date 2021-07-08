import { useSnackbar } from 'notistack'

type NotifyArg = string | string[]

const useOnSuccessNotify = () => {
  const { enqueueSnackbar } = useSnackbar()

  const notify = (msgs: NotifyArg) => {
    if (typeof msgs === 'string') {
      enqueueSnackbar(msgs, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    } else {
      msgs.forEach((msg) => {
        enqueueSnackbar(msg, {
          variant: 'success',
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

export { useOnSuccessNotify }
