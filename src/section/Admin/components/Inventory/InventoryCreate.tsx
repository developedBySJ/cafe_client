import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { ResponsiveDialog } from '../../../../lib'
import {
  CreateInventoryPayload,
  CREATE_INVENTORY,
} from '../../../../lib/api/Mutation/createInventory'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'
import { AssetType } from '../../../../lib/types'

export const InventoryCreate = () => {
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const history = useHistory()
  const { mutate, isLoading } = useMutation(CREATE_INVENTORY, {
    onError: notifyError,
    onSuccess: () => {
      notifySuccess('Inventory Created Successfully!')
      history.push('/admin/inventory')
    },
  })

  return (
    <div>
      <ResourceFactory
        onSubmit={(val) => mutate(val as CreateInventoryPayload)}
        disabled={isLoading}
        title="Inventory"
        config={[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'availableStock', label: 'Available Stock', type: 'number' },
          {
            id: 'image',
            label: 'Image',
            type: 'image',
            multiImage: false,
            imageType: AssetType.Other,
          },
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
