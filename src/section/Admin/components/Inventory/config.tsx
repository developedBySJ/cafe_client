import { ResourceTableColumn } from '../../../../lib/components/ResourceTable/type'
import Typography from '@material-ui/core/Typography'

export const columns: ResourceTableColumn[] = [
  {
    type: 'link',
    field: 'id',
    header: 'ID',
    prefix: '/admin/inventory',
    suffix: 'edit',
  },
  {
    type: 'string',
    field: 'name',
    header: 'Name',
    width: 200,
  },
  {
    type: 'array',
    field: 'tags',
    header: 'Tags',
    width: 300,
    mapFunction: (val, i) => (
      <Typography key={i} variant="body2" style={{ marginRight: '0.4rem' }}>
        {i + 1}. {val}
      </Typography>
    ),
  },
  {
    type: 'array',
    field: 'units',
    header: 'Units',
    width: 300,
    mapFunction: (val, i) => (
      <Typography key={i} variant="body2" style={{ marginRight: '0.4rem' }}>
        {i + 1}. {val}
      </Typography>
    ),
  },
  {
    type: 'string',
    field: 'unit',
    header: 'Current Unit',
    width: 200,
  },

  {
    type: 'date',
    field: 'createdAt',
    header: 'Created At',
    width: 200,
    sortable: true,
  },
]
