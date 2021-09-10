import { ResourceTableColumn } from '../../../../lib/components/ResourceTable/type'

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    field: 'id',
    header: 'ID',
    prefix: '/admin/payments',
    suffix: 'edit',
  },
  {
    type: 'string',
    field: 'referenceId',
    header: 'Reference Id',
    width: 300,
  },
  {
    type: 'money',
    field: 'amount',
    header: 'Amount',
    width: 200,
    multiplier: 0.01,
    sortable: true,
    prefix: 'Rs. ',
  },
  {
    type: 'string',
    field: 'type',
    header: 'Type',
    width: 100,
    sortable: true,
  },
  {
    type: 'string',
    field: 'description',
    header: 'Description',
    width: 500,
    sortable: true,
  },
  {
    type: 'date',
    field: 'createdAt',
    header: 'Created At',
    width: 200,
    sortable: true,
  },
  {
    type: 'link',
    field: 'createdBy',
    header: 'Created By',
    prefix: '/admin/users',
    suffix: 'edit',
    width: 300,
  },
]
