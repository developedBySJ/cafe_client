import { Box, Button, IconButton, Typography } from '@material-ui/core'
import { DataGrid, GridColDef, GridFilterModel, GridRowData, GridSortModel } from '@mui/x-data-grid'
import moment from 'moment'
import React from 'react'
import { Plus, RefreshCw } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { ResourceTableColumn } from './type'

interface ResourceTableProps {
  data: GridRowData[]
  columns: ResourceTableColumn[]
  label: string
  isLoading?: boolean
  createLink?: string
  onPageChange?: (page: number) => void
  onSortChange?: (sort: GridSortModel) => void
  onFilterChange?: (filter: GridFilterModel) => void
  refetch?: () => void
  totalCount?: number
}

const getColumns = (columns: ResourceTableColumn[]): GridColDef[] => {
  return columns.map((column, i) => {
    const { field, type, width, header } = column
    const columnDef: GridColDef = {
      headerName: header,
      field,
      align: i === 0 ? 'left' : 'right',
      headerAlign: i === 0 ? 'left' : 'right',
      filterable: !!column.filterable,
      sortable: !!column.sortable,
      ...(!width && { flex: 1 }),
      width,
      minWidth: 150,
      renderCell: (params) => {
        if (type === 'link') {
          // @ts-ignore
          const { prefix, suffix, linkField } = column
          const value = _.get(params.row, params.field)
          const link = linkField ? _.get(params.row, linkField) : value
          return (
            <Link to={`${prefix || ''}/${link}/${suffix || ''}`} style={{ color: '#111' }}>
              {value}
            </Link>
          )
        }
        if (type === 'array') {
          // @ts-ignore
          const { mapFunction } = column
          const value = _.get(params.row, params.field) as any[]
          return <>{value ? value.map(mapFunction) : '---'}</>
        }
      },
      valueFormatter: (params) => {
        const value = _.get(params.row, params.field)

        if (type === 'number') {
          // @ts-ignore
          return Number(value).toFixed(column.precision || 0) || '---'
        }
        if (type === 'link') {
          // @ts-ignore
          return value
        }
        if (type === 'enum') {
          // @ts-ignore
          return column.enum[params.value as string | number]
        }
        if (type === 'date') {
          return params.value ? moment(params.value as string).format('DD-MM-YY hh:mm') : '---'
        }
        if (type === 'money') {
          // @ts-ignore
          const { precision, prefix, multiplier = 1 } = column
          return `${prefix || ''}${(Number(params.value) * multiplier).toFixed(precision || 0)}`
        }
        if (type === 'string') {
          return value || '---'
        }
        if (type === 'boolean') {
          // @ts-ignore
          const { trueLabel = 'Yes', falseLabel = 'No' } = column
          return value ? trueLabel : falseLabel
        }
      },
    }
    return columnDef
  })
}

export const ResourceTable: React.FC<ResourceTableProps> = ({
  columns,
  data,
  label,
  isLoading,
  onPageChange,
  onSortChange,
  totalCount,
  createLink,
  onFilterChange,
  refetch,
}) => {
  const dataColumns = getColumns(columns)
  const history = useHistory()
  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '1rem' }}
      >
        <Typography variant="h5">{label}</Typography>
        <Box>
          <IconButton onClick={() => refetch && refetch()}>
            <RefreshCw />
          </IconButton>
          {createLink && (
            <Button
              size="small"
              startIcon={<Plus />}
              onClick={() => history.push(createLink || '/')}
            >
              Create
            </Button>
          )}
        </Box>
      </Box>

      <div style={{ width: '100%' }}>
        <DataGrid
          rows={data}
          filterMode="server"
          sortingMode="server"
          paginationMode="server"
          columns={dataColumns}
          pageSize={25}
          style={{ width: '100%', height: '80vh' }}
          rowsPerPageOptions={[25]}
          disableSelectionOnClick
          loading={isLoading}
          pagination
          rowCount={totalCount}
          onPageChange={(page, details) => onPageChange && onPageChange(page + 1 || 1)}
          onSortModelChange={(model) => onSortChange && onSortChange(model)}
          onFilterModelChange={(model) => onFilterChange && onFilterChange(model)}
        />
      </div>
    </Box>
  )
}
