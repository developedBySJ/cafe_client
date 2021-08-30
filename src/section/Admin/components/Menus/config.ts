import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    prefix: '/menus',
    header: 'id',
    field: 'id',
  },
  {
    type: 'string',
    header: 'name',
    field: 'name',
  },
  {
    type: 'boolean',
    header: 'Status',
    field: 'isActive',
    trueLabel: 'Active',
    falseLabel: 'Inactive',
  },
  {
    type: 'date',
    header: 'Created At',
    field: 'createdAt',
    sortable: true
  },
  {
    type: 'date',
    header: 'Updated At',
    field: 'updatedAt',
  },
]