import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Redirect, useParams } from 'react-router'
import { PrivateRouteComponent, Spinner } from '../../../../lib'
import { GET_USER_DETAILS } from '../../../../lib/api/query/usersDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { UserRole } from '../../../../lib/types'

export const UsersEdit: PrivateRouteComponent = ({ viewer }) => {
  const { id } = useParams<{ id: string }>()
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
          // { id: 'avatar', label: 'Avatar', type: 'image', disabled: true },
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
      >
        {!isViewer && (
          <Box sx={{ ml: '0.5rem', display: 'flex' }}>
            <Button variant="contained" color="primary" size="small">
              Delete
            </Button>
          </Box>
        )}
      </ResourceFactory>
    </div>
  )
}
