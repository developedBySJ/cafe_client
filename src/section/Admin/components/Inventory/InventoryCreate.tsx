import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import {
  CreateInventoryPayload,
  CREATE_INVENTORY,
} from '../../../../lib/api/Mutation/createInventory'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

export const InventoryCreate = () => {
  const { mutate } = useMutation(CREATE_INVENTORY)
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const history = useHistory()
  return (
    <div>
      <ResourceFactory
        onSubmit={(val) =>
          mutate(val as CreateInventoryPayload, {
            onSuccess: () => {
              notifySuccess('Inventory Created Successfully!')
              history.push('/admin/inventory')
            },
          })
        }
        title="Inventory"
        config={[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'availableStock', label: 'Available Stock', type: 'number' },
          { id: 'image', label: 'Image', type: 'image' },
          { id: 'tags', label: 'Tags', type: 'array' },
          {
            id: 'units',
            label: 'Units',
            type: 'array',
          },
          { id: 'unit', label: 'Default Unit', type: 'text' },
        ]}
        initialValues={{}}
      />
    </div>
  )
}
