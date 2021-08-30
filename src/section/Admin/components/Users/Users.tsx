import { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_USERS } from '../../../../lib/api/query/users'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Users = () => {
  const [query, setQuery] = useState('?limit=25')
  const { data, isLoading } = useQuery(['getAllUsers', query], (q) => GET_USERS(q.queryKey[1]))

  const { handlePageChange, handleSortChange } = useHandleQueryChange(query, setQuery)

  return (
    <ResourceTable
      columns={columns}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Users"
    />
  )
}
