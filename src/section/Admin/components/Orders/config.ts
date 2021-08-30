import { OrderStatus } from "../../../../lib/api/types/order.type";
import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    field: 'id',
    header: 'ID',
    prefix: '/orders',
  },
  {
    type: 'link',
    field: 'user',
    header: 'Customer',
    prefix: '/users',
  },
  {
    type: 'money',
    field: 'total',
    header: 'Total',
    prefix: 'Rs. ',
    precision: 2,
    width: 150,
  },
  {
    type: 'enum',
    enum: OrderStatus,
    field: 'status',
    header: 'Status',
    width: 200,
    sortable: true,
  },
  {
    type: 'date',
    field: 'createdAt',
    header: 'Created At',
    sortable: true,
    width: 200,
  },
  {
    type: 'string',
    field: 'address',
    header: 'Address',
    width: 300,
  },
  {
    type: 'string',
    field: 'notes',
    header: 'Notes',
    width: 200,
  },
  {
    type: 'date',
    field: 'deliveredAt',
    header: 'Delivered At',
    sortable: true,
    width: 200,
  },
  {
    type: 'string',
    field: 'payment',
    header: 'Payment',
    width: 200,
  },
]