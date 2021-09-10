import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    field: "id",
    header: "ID",
    prefix: "/admin/reviews",
    suffix: "edit"
  },

  {
    type: 'link',
    field: "menuItem.title",
    header: "Dish",
    linkField: "menuItem.id",
    prefix: '/dishes'
  },
  {
    type: 'string',
    field: "title",
    header: "Title",
  },
  {
    type: 'string',
    field: "comment",
    header: "Comment",
  },
  {
    type: 'number',
    field: "ratings",
    header: "Ratings",
    sortable: true
  },
  {
    type: 'link',
    field: "createdBy.firstName",
    linkField: "createdBy.id",
    header: "Created By",
    prefix: '/admin/users',
    suffix: "edit"
  },
  {
    type: 'date',
    field: "createdAt",
    header: "Created At",
    sortable: true
  },
]