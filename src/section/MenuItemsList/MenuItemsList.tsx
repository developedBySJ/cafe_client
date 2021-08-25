import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useRef, useState } from 'react'
import { ChevronDown, Filter } from 'react-feather'
import { useInfiniteQuery } from 'react-query'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemSortBy, MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'
import { ResponsiveDialog, Spinner } from '../../lib/components/'
import { useIntersectionObserver } from '../../lib/hooks/useIntersectionObserver'
import { Sort } from '../../lib/types'
import { MenuItemCard } from './components'
import { MenuFilter } from './components/MenuFilter'

const MenuItemSortList = [
  { label: 'Price', value: MenuItemSortBy.Price },
  { label: 'Availability', value: MenuItemSortBy.IsAvailable },
  { label: 'Discount', value: MenuItemSortBy.Discount },
  { label: 'Preparation Time', value: MenuItemSortBy.PrepTime },
  { label: 'Created Date', value: MenuItemSortBy.CreatedAt },
]

const useStyles = makeStyles((theme) => ({
  fixed: {
    position: 'sticky',
    top: 60,
    zIndex: 100,
    padding: '1rem 0',
    background: 'rgba(250,250,250,0.8)',
    backdropFilter: 'saturate(180%) blur(8px)',
  },
  sticky: {
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      alignSelf: 'flex-start',
      top: 64,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideFilter: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

const MenuItemsList = () => {
  const { data, hasNextPage, isLoading, isError, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['menuItems', {} as MenuItemsQuery],
      (params) => {
        return MENU_ITEMS(params.pageParam || '?limit=24')
      },
      {
        keepPreviousData: true,
        getNextPageParam: (nextPage) => {
          return nextPage?.data?.pages?.next
        },
      },
    )
  const scrollEnd = useRef<HTMLDivElement | null>(null)

  useIntersectionObserver({
    onIntersect: fetchNextPage,
    target: scrollEnd,
    enabled: hasNextPage,
    update: data,
  })

  const [isSortOpen, setIsSortOpen] = useState(false)
  const [value, setValue] = useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const classes = useStyles()

  if (isLoading) {
    return null
  }

  if (isError) {
    return (
      <>
        <Container>
          <Alert variant="filled" color="error" severity="error">
            Something Went Wrong
          </Alert>
        </Container>
      </>
    )
  }
  if (!data) return null

  return (
    <>
      <ResponsiveDialog
        onClose={() => setIsSortOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={isSortOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Sort By</DialogTitle>
        <DialogContent>
          <Box>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort</FormLabel>
              <RadioGroup name="sort" value={value} onChange={handleChange} row color="primary">
                <FormControlLabel
                  value={Sort.ASC}
                  control={<Radio color="primary" />}
                  label="Ascending"
                />
                <FormControlLabel
                  value={Sort.DESC}
                  control={<Radio color="primary" />}
                  label="Descending"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box margin="1rem 0">
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup name="sortBy" value={value} onChange={handleChange} color="primary">
                {MenuItemSortList.map(({ value, label }, index) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio color="primary" />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSortOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsSortOpen(false)} variant="contained" color="primary">
            Sort
          </Button>
        </DialogActions>
      </ResponsiveDialog>

      {/* #### FILTER BY #### */}
      <ResponsiveDialog open={false} fullWidth maxWidth="sm">
        <DialogTitle>Filter By</DialogTitle>
        <DialogContent>
          <MenuFilter />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSortOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsSortOpen(false)} variant="contained" color="primary">
            Sort
          </Button>
        </DialogActions>
      </ResponsiveDialog>
      <Container>
        <Typography variant="h4" style={{ padding: '3rem 0' }}>
          Search Result for "Food"
          <Typography variant="h6" component="span">
            {/* ({data?.totalCount}) Items Found */}
          </Typography>
        </Typography>

        <Grid container spacing={2}>
          <Grid item md={4} lg={3} className={classes.sticky}>
            <MenuFilter />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box textAlign="right" marginBottom="1.5rem">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={8}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setIsSortOpen(true)}
                    startIcon={<Filter strokeWidth="1.5px" />}
                    className={classes.hideFilter}
                  >
                    Filter
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsSortOpen(true)}
                    endIcon={<ChevronDown strokeWidth="1.5px" />}
                    fullWidth
                  >
                    Sort By
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2}>
              {data.pages.map((page) =>
                page.data.result.map((menuItem) => (
                  <Grid item xs={12} sm={6} lg={4} key={menuItem.id}>
                    <MenuItemCard menuItem={menuItem} />
                  </Grid>
                )),
              )}
            </Grid>
            <Box margin="2rem 0">
              <div ref={scrollEnd}></div>
              {isFetching && hasNextPage && isFetchingNextPage ? <Spinner /> : null}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export { MenuItemsList }
