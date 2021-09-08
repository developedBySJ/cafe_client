import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Redirect, useParams } from 'react-router'
import { PrivateRouteComponent, Spinner } from '../../../../lib'
import { GET_USER_DETAILS } from '../../../../lib/api/query/usersDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { UserRole } from '../../../../lib/types'

export const UserCreate: PrivateRouteComponent = () => {
  return (
    <div>
      <ResourceFactory
        title="New User"
        config={[
          { id: 'email', label: 'Email', type: 'email' },
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
        initialValues={{}}
      />
    </div>
  )
}
