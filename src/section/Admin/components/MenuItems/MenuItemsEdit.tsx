import { Box } from '@material-ui/core'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { Spinner } from '../../../../lib'
import { DELETE_MENU_ITEM } from '../../../../lib/api/Mutation/deleteMenuItem'
import { GET_INVENTORY_DETAILS } from '../../../../lib/api/query/inventoryDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

export const MenuItemEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery(['getInventoryDetails'], () => GET_INVENTORY_DETAILS(id))

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const history = useHistory()

  const deleteMenuItem = useMutation(DELETE_MENU_ITEM, {
    onSuccess: () => {
      notifySuccess('Menu Item deleted')
      return history.push('/admin/menu-items')
    },
    onError: notifyError,
  })

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete this menu-item?')
    if (result) {
      deleteMenuItem.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }

  return (
    <div>
      <ResourceFactory
        title="Inventory"
        config={[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'availableStock', label: 'Available Stock', type: 'number', disabled: true },
          { id: 'image', label: 'Image', type: 'image' },
          { id: 'tags', label: 'Tags', type: 'array' },
          {
            id: 'units',
            label: 'Units',
            type: 'array',
          },
          { id: 'unit', label: 'Default Unit', type: 'text' },
        ]}
        initialValues={data?.data || {}}
      />
    </div>
  )
}
