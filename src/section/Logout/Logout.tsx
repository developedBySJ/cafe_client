import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import { PrivateRouteComponent, Spinner } from '../../lib'
import { useMutation } from 'react-query'
import { LOG_OUT } from '../../lib/api/Mutation/logout'
import { useOnErrorNotify, useOnSuccessNotify } from '../../lib/hooks'
import { useHistory } from 'react-router-dom'

export const Logout: PrivateRouteComponent = ({ setViewer }) => {
  const onErrorNotify = useOnErrorNotify()
  const onSuccessNotify = useOnSuccessNotify()
  const history = useHistory()
  const { mutate } = useMutation(LOG_OUT, {
    onSuccess: () => {
      setViewer({})
      onSuccessNotify('Logout Successfully!')
      history.push('/')
    },
    onError: (error) => {
      setViewer({ didRequest: false })
      onErrorNotify(error)
    },
  })
  useEffect(() => {
    mutate()
  }, [])
  return (
    <Container>
      <Box height="80vh">
        <Spinner fullWidth label="Logging You Out" />
      </Box>
    </Container>
  )
}
