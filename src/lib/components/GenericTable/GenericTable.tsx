import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  createStyles,
  Theme,
  PaperProps,
} from '@material-ui/core'
import React from 'react'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.common.white,
    },
  }),
)(TableCell)

const TableBackground = (props: PaperProps) => <Paper {...props} elevation={0} />

interface GenericTableProps {
  labels: string[]
  values: any[][]
}

export const GenericTable: React.FC<GenericTableProps> = ({ labels, values }) => {
  return (
    <TableContainer style={{ borderRadius: 8 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {labels.map((label, i) => (
              <StyledTableCell key={i} align={i === 0 ? 'left' : 'right'}>
                {label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row, i) => (
            <TableRow key={i}>
              {row.map((v, i) => (
                <TableCell key={i} align={i === 0 ? 'left' : 'right'}>
                  {v ?? '---'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
