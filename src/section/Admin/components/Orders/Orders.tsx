import { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_ALL_ORDER } from '../../../../lib/api/query/allOrders'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Orders = () => {
  const [query, setQuery] = useState('?limit=25')
  const { data, isLoading } = useQuery(['getAllOrders', query], (q) => GET_ALL_ORDER(q.queryKey[1]))

  const { handlePageChange, handleSortChange } = useHandleQueryChange(query, setQuery)

  return (
    <ResourceTable
      columns={columns}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Orders"
    />
  )
}
