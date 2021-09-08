import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    field: 'id',
    header: 'ID',
    prefix: '/admin/menu-items',
    suffix: 'edit'
  },
  {
    type: 'link',
    field: 'title',
    header: 'Title',
    width: 200,
    prefix: '/dishes',
    linkField: 'id'
  },
  {
    type: 'string',
    field: 'subTitle',
    header: 'Sub Title',
    width: 150,
  },
  {
    type: 'link',
    field: 'menu.name',
    header: 'Menu',
    linkField: 'menu.id',
    width: 200,
    prefix: '/menus',
    filterable: true,
  },
  {
    type: 'boolean',
    field: 'isAvailable',
    header: 'Available',
    width: 150,
    sortable: true,
  },
  {
    type: 'boolean',
    field: 'isVeg',
    header: 'Type',
    width: 150,
    trueLabel: 'Veg',
    falseLabel: 'Non-Veg',
  },
  {
    type: 'money',
    field: 'price',
    header: 'Price',
    precision: 2,
    prefix: 'Rs. ',
    width: 150,
    sortable: true,
  },
  {
    type: 'number',
    field: 'discount',
    header: 'Discount',
    width: 160,
    precision: 2,
    sortable: true,
  },
  {
    type: 'number',
    field: 'prepTime',
    header: 'Preparation Time',
    width: 200,
    sortable: true,
  },
  {
    type: 'date',
    field: 'createdAt',
    header: 'Created At',
    width: 200,
    sortable: true,
  },
]