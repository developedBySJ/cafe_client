import React from 'react'
import { useQuery } from 'react-query'
import { GET_PAYMENTS } from '../../../../lib/api/query/payments'
import { ResourceTable } from '../../../../lib/components/ResourceTable'
import { useHandleQueryChange } from '../../../../lib/hooks'
import { columns } from './config'

export const Payments = () => {
  const { query, handlePageChange, handleSortChange } = useHandleQueryChange()
  const { data, isLoading } = useQuery(
    ['getPayments', query],
    (q) => GET_PAYMENTS(q.queryKey[1]),
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
      createLink="/admin/payments/create"
      label="Payments"
    />
  )
}
