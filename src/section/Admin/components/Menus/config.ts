import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    prefix: '/admin/menus',
    header: 'id',
    field: 'id',
    suffix: 'edit',
  },
  {
    type: 'link',
    header: 'Name',
    field: 'name',
    prefix: '/menus',
    linkField: 'id',
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