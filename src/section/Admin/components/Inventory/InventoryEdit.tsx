import {
  TextField,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { ResponsiveDialog, Spinner } from '../../../../lib'
import { DELETE_INVENTORY } from '../../../../lib/api/Mutation/deleteInventory'
import { UPDATE_INVENTORY } from '../../../../lib/api/Mutation/updateInventory'
import { UPDATE_INVENTORY_STOCKS } from '../../../../lib/api/Mutation/updateInventoryStocks'
import { UPDATE_USERS } from '../../../../lib/api/Mutation/updateUser'
import { GET_INVENTORY_DETAILS } from '../../../../lib/api/query/inventoryDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

export const InventoryEdit = () => {
  const { id } = useParams<{ id: string }>()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const queryClient = useQueryClient()
  const history = useHistory()

  const deleteInventory = useMutation(DELETE_INVENTORY, {
    onSuccess: () => {
      notifySuccess('Inventory deleted')
      return history.push('/admin/inventory')
    },
    onError: notifyError,
  })

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete this inventory?')
    if (result) {
      deleteInventory.mutate(id)
    }
  }

  const { data, isLoading, refetch } = useQuery(
    ['getInventoryDetails', id],
    () => GET_INVENTORY_DETAILS(id),
    {
      onError: notifyError,
    },
  )

  const updateInventory = useMutation(UPDATE_INVENTORY, {
    onSuccess: () => {
      notifySuccess('Inventory updated')
      return history.push('/admin/inventory')
    },
    onError: notifyError,
  })

  const updateInventoryStocks = useMutation(UPDATE_INVENTORY_STOCKS, {
    onSuccess: () => {
      notifySuccess('Inventory Stock updated')
      refetch()
      setIsOpen(false)
    },
    onError: notifyError,
  })

  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()

  const [stocks, setStocks] = useState({ qty: 0, isAdded: false })

  if (isLoading) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }

  const getBgColor = (value: boolean) =>
    value ? theme.palette.primary.main : theme.palette.grey[200]

  const handleClick = (value: boolean) => () => {
    setStocks((prev) => ({ ...prev, isAdded: value }))
  }

  const handleUpdateStock = () => {
    updateInventoryStocks.mutate({
      id,
      ...stocks,
    })
  }

  return (
    <div>
      <ResponsiveDialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Inventory Stock</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'inline-flex', borderRadius: 16, overflow: 'hidden' }}>
            <Box
              onClick={handleClick(false)}
              sx={{ bgcolor: getBgColor(!stocks.isAdded), p: '1rem 2rem' }}
              style={{ cursor: 'pointer' }}
            >
              Use
            </Box>
            <Box
              onClick={handleClick(true)}
              style={{ cursor: 'pointer' }}
              sx={{ bgcolor: getBgColor(stocks.isAdded), p: '1rem 2rem' }}
            >
              Add
            </Box>
          </Box>
          <TextField
            label="Quantity"
            value={stocks.qty}
            onChange={(e) => setStocks({ ...stocks, qty: Math.max(0, parseInt(e.target.value)) })}
            type="number"
            variant="filled"
            fullWidth
            style={{ marginTop: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdateStock}>
            Update
          </Button>
        </DialogActions>
      </ResponsiveDialog>
      <ResourceFactory
        title="Inventory"
        config={[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'availableStock', label: 'Available Stock', type: 'number', disabled: true },
          { id: 'image', label: 'Image', type: 'image', multiImage: false },
          { id: 'tags', label: 'Tags', type: 'array' },
          {
            id: 'units',
            label: 'Units',
            type: 'array',
            disabled: true,
          },
          { id: 'unit', label: 'Default Unit', type: 'text', disabled: true },
        ]}
        initialValues={data?.data || {}}
        onSubmit={(val: any) => updateInventory.mutate({ ...val, id })}
      >
        <Box sx={{ ml: '0.5rem', display: 'flex' }}>
          <Button
            variant="contained"
            style={{ marginRight: '0.5rem' }}
            size="small"
            onClick={() => setIsOpen(true)}
          >
            Update Stock
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </ResourceFactory>
    </div>
  )
}
