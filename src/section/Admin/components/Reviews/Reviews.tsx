import { useState } from 'react'
import { useQuery } from 'react-query'
import { GET_REVIEWS } from '../../../../lib/api/query/reviews'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Reviews = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading } = useQuery(['getAllReviews', query], (q) => GET_REVIEWS(q.queryKey[1]))

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
