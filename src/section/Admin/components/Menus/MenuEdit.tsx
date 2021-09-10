import { Button } from '@material-ui/core'
import React from 'react'
import { Box } from 'react-feather'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { Spinner } from '../../../../lib'
import { DELETE_MENU } from '../../../../lib/api/Mutation/deleteMenu'
import { UPDATE_MENU } from '../../../../lib/api/Mutation/updateMenu'
import { GET_MENU } from '../../../../lib/api/query/menuDetail'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'
import { AssetType } from '../../../../lib/types'

export const MenuEdit = () => {
  const { id } = useParams<{ id: string }>()

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const history = useHistory()

  const deleteMenuItem = useMutation(DELETE_MENU, {
    onSuccess: () => {
      notifySuccess('Menu deleted')
      return history.push('/admin/menus')
    },
    onError: notifyError,
  })

  const updateMenu = useMutation(UPDATE_MENU, {
    onSuccess: () => {
      notifySuccess('Menu Updated')
      return history.push('/admin/menus')
    },
    onError: notifyError,
  })

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete this menu?')
    if (result) {
      deleteMenuItem.mutate(id)
    }
  }

  const { data, isLoading } = useQuery(['getMenuDetails', id], () => GET_MENU(id), {
    onError: notifyError,
  })

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
        title="Edit Menu"
        id={data?.data.id}
        onSubmit={(values) => updateMenu.mutate({ ...values, id })}
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
        initialValues={data?.data || {}}
      >
        <Button variant="contained" color="primary" size="small" onClick={handleDelete}>
          Delete
        </Button>
      </ResourceFactory>
    </div>
  )
}
