import React from 'react'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { UserRole } from '../../../../lib/types'

export const UsersEdit = () => {
  return (
    <div>
      <ResourceFactory
        title="Users"
        id={'sdak-a-21asxa'}
        config={[
          { id: 'avatar', label: 'Avatar', type: 'image', disabled: true },
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
        initialValues={{
          id: 'sdh3232-bb2uyg-23hbasd-121yh1n',
          email: 'somethin@c.co',
          dateOfBirth: null,
        }}
      />
    </div>
  )
}
