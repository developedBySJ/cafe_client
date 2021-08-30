import { ResourceTableColumn } from "../../../../lib/components/ResourceTable/type";
import { UserRole } from "../../../../lib/types";

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    prefix: '/users',
    header: 'id',
    field: 'id',
  },
  {
    type: 'string',
    header: 'First Name',
    sortable: true,
    field: 'firstName',
  },
  {
    type: 'string',
    header: 'Last Name',
    field: 'lastName',
  },
  {
    type: 'string',
    header: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    type: 'string',
    header: 'Role',
    field: 'role',
    sortable: true,

  },
  {
    type: 'string',
    header: 'Address',
    field: 'address',
  },
  {
    type: 'date',
    header: 'Birth Date',
    field: 'dateOfBirth',
    sortable: true
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