import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { CreateMenuPayload, CREATE_MENU } from '../../../../lib/api/Mutation/createMenu'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'
import { AssetType } from '../../../../lib/types'

export const MenuCreate = () => {
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const history = useHistory()
  const createMenu = useMutation(CREATE_MENU, {
    onError: notifyError,
    onSuccess: () => {
      notifySuccess('Menu Created Successfully!')
      history.push('/admin/menus')
    },
  })

  return (
    <div>
      <ResourceFactory
        title="New Menu"
        onSubmit={(val) => createMenu.mutate(val as CreateMenuPayload)}
        config={[
          {
            id: 'image',
            label: 'Menu Image',
            type: 'image',
            multiImage: false,
            imageType: AssetType.Menu,
          },
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'isActive', label: 'Is Active?', type: 'boolean' },
        ]}
        initialValues={{}}
      />
    </div>
  )
}
