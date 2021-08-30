import { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_REVIEWS } from '../../../../lib/api/query/reviews'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Reviews = () => {
  const [query, setQuery] = useState('?limit=25')
  const { data, isLoading } = useQuery(['getAllReviews', query], (q) => GET_REVIEWS(q.queryKey[1]))

  const { handlePageChange, handleSortChange } = useHandleQueryChange(query, setQuery)

  return (
    <ResourceTable
      columns={columns}
      data={data?.data.result || []}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      totalCount={data?.data.totalCount}
      isLoading={isLoading}
      label="Reviews"
    />
  )
}
