import { useQuery } from 'react-query'
import { GET_ALL_ORDER } from '../../../../lib/api/query/allOrders'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Orders = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading, refetch } = useQuery(['getAllOrders', query], (q) =>
    GET_ALL_ORDER(q.queryKey[1]),
  )

  return (
    <ResourceTable
      refetch={refetch}
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
