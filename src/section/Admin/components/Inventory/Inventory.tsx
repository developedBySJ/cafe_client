import { useQuery } from 'react-query'
import { GET_INVENTORY } from '../../../../lib/api/query/inventory'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Inventory = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading, refetch } = useQuery(['getAllReviews', query], (q) =>
    GET_INVENTORY(q.queryKey[1]),
  )

  return (
    <ResourceTable
      columns={columns}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Inventory"
      createLink="/admin/inventory/create"
      refetch={refetch}
    />
  )
}
