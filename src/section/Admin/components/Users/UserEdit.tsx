import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Redirect, useHistory, useParams } from 'react-router'
import { PrivateRouteComponent, Spinner } from '../../../../lib'
import { DELETE_USERS } from '../../../../lib/api/Mutation/deleteUser'
import { UpdateUserPayload, UPDATE_USERS } from '../../../../lib/api/Mutation/updateUser'
import { GET_USER_DETAILS } from '../../../../lib/api/query/usersDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnSuccessNotify } from '../../../../lib/hooks'
import { AssetType, UserRole } from '../../../../lib/types'

export const UsersEdit: PrivateRouteComponent = ({ viewer }) => {
  const { id } = useParams<{ id: string }>()
  const notifySuccess = useOnSuccessNotify()
  const notifyError = useOnSuccessNotify()
  const history = useHistory()

  const deleteUser = useMutation(DELETE_USERS, {
    onSuccess: () => {
      notifySuccess('User deleted')
      return history.push('/admin/users')
    },
    onError: notifyError,
  })

  const editUser = useMutation(UPDATE_USERS, {
    onSuccess: () => {
      notifySuccess('User Updated')
      return history.push('/admin/users')
    },
    onError: notifyError,
  })

  const handleDelete = () => {
    alert('Are you sure you want to delete this user?')
    deleteUser.mutate(id)
  }

  const { data, isLoading } = useQuery(['getUserDetails', id], (page) =>
    GET_USER_DETAILS(page.queryKey[1]),
  )

  if (isLoading) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }

  const isViewer = viewer?.id === data?.data.id

  if (isViewer) {
    return <Redirect to="/me" />
  }

  return (
    <div>
      <ResourceFactory
        title="Edit User"
        id={data?.data.id}
        config={[
          {
            id: 'avatar',
            label: 'Avatar',
            type: 'image',
            multiImage: false,
            imageType: AssetType.Avatar,
          },
          { id: 'email', label: 'Email', type: 'email', disabled: true },
          { id: 'firstName', label: 'First Name', type: 'text' },
          { id: 'lastName', label: 'Last Name', type: 'text' },
          {
            id: 'role',
            label: 'Role',
            type: 'select',
            options: Object.values(UserRole).map((i) => ({ label: i, value: i })),
          },
          { id: 'address', label: 'Address', type: 'longText' },
          { id: 'dateOfBirth', label: 'Birth Date', type: 'date' },
        ]}
        initialValues={data?.data || {}}
        onSubmit={(values) => editUser.mutate(values as UpdateUserPayload)}
      >
        {!isViewer && (
          <Box sx={{ ml: '0.5rem', display: 'flex' }}>
            <Button variant="contained" color="primary" size="small" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </ResourceFactory>
    </div>
  )
}
