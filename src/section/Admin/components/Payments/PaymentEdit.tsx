import { Box } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Spinner } from '../../../../lib'
import { GET_INVENTORY_DETAILS } from '../../../../lib/api/query/inventoryDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'

export const PaymentEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery(['getInventoryDetails'], () => GET_INVENTORY_DETAILS(id))

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
