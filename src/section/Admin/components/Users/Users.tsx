import { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_USERS } from '../../../../lib/api/query/users'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Users = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading, refetch } = useQuery(['getAllUsers', query], (q) =>
    GET_USERS(q.queryKey[1]),
  )

  return (
    <ResourceTable
      columns={columns}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Users"
      createLink="/admin/users/create"
      refetch={refetch}
    />
  )
}
