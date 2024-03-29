import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_MENUS } from '../../../../lib/api/query/menus'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Menus = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading, refetch } = useQuery(['getAllMenus', query], (q) =>
    GET_MENUS(q.queryKey[1]),
  )

  return (
    <ResourceTable
      columns={columns}
      refetch={refetch}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Menus"
      createLink="/admin/menus/create"
    />
  )
}
