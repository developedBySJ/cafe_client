import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { PrivateRouteComponent } from '../../../../lib'
import { CreateUserPayload, CREATE_USER } from '../../../../lib/api/Mutation/createUser'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'
import { AssetType, UserRole } from '../../../../lib/types'

export const UserCreate: PrivateRouteComponent = () => {
  const history = useHistory()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const createUser = useMutation(CREATE_USER, {
    onError: notifyError,
    onSuccess: () => {
      notifySuccess('User Created Successfully!')
      history.push('/admin/users')
    },
  })

  return (
    <div>
      <ResourceFactory
        title="New User"
        onSubmit={(value) => createUser.mutate(value as CreateUserPayload)}
        config={[
          {
            id: 'avatar',
            label: 'Avatar',
            type: 'image',
            multiImage: false,
            imageType: AssetType.Avatar,
          },
          { id: 'email', label: 'Email', type: 'email', required: true },
          { id: 'password', label: 'Password', type: 'password', required: true },
          { id: 'firstName', label: 'First Name', type: 'text' },
          { id: 'lastName', label: 'Last Name', type: 'text', required: true },
          {
            id: 'role',
            label: 'Role',
            type: 'select',
            required: true,
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
