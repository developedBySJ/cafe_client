import { useQuery } from 'react-query'
import { GET_MENU_ITEMS } from '../../../../lib/api/query/menuItems'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const MenuItems = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading } = useQuery(
    ['getAllMenuItems', query],
    (q) => GET_MENU_ITEMS(q.queryKey[1]),
    {},
  )

  return (
    <ResourceTable
      columns={columns}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      data={data?.data.result || []}
      isLoading={isLoading}
      label="Dishes"
    />
  )
}
