import { Box, Button, Container, InputBase, Typography } from '@material-ui/core'
import { ArrowRight, Search as SearchIcon, TrendingUp } from 'react-feather'
import {} from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { MenuItemCard, MenuItemSkeleton } from '..'
import { ProductCardSlider } from '../../lib'
import { GET_MENU_ITEMS } from '../../lib/api/query/menuItems'
import { useOnErrorNotify } from '../../lib/hooks'
import debounce from 'lodash.debounce'

const useStyle = makeStyles((theme) => ({
  searchList: {
    padding: '1rem 2rem',
    backgroundColor: theme.palette.grey[300],
    borderRadius: 16,
    margin: '0.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
}))

export const Search = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const history = useHistory()
  const searchTerm = query.get('search') || ''
  // console.log(searchTerm)
  const classes = useStyle()
  const notifyError = useOnErrorNotify()

  const { data, isError, isLoading } = useQuery(
    ['getMenuItemsSearch', location],
    (x) => {
      return GET_MENU_ITEMS(`?search=${searchTerm}&limit=6`)
    },
    {
      onError: notifyError,
      enabled: searchTerm.length > 2,
    },
  )

  const searchData = data?.data?.result

  return (
    <Container maxWidth="md" style={{ marginTop: '4rem' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          history.push(`/dishes?search=${searchTerm}`)
        }}
      >
        <Box sx={{ display: 'flex', height: 56 }}>
          <InputBase
            fullWidth
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value
              const q = val ? `?search=${val}` : '?'
              history.push(q)
            }}
            autoFocus
          />
          <Button size="small" variant="contained" color="primary" type="submit">
            <SearchIcon />
          </Button>
        </Box>
      </form>
      {!searchData?.length && !isLoading && (
        <Box>
          <Box sx={{ display: 'flex', mt: '3rem', mb: '2rem' }}>
            <TrendingUp size={32} style={{ marginRight: '1rem' }} />
            <Typography variant="h5">Trading Search</Typography>
          </Box>
          <Link to="/dishes?search=chicken" style={{ textDecoration: 'none', color: '#111' }}>
            <Box className={classes.searchList}>
              <Typography variant="h6">Chicken</Typography>
              <ArrowRight />
            </Box>
          </Link>
          <Link to="/dishes?search=paneer" style={{ textDecoration: 'none', color: '#111' }}>
            <Box className={classes.searchList}>
              <Typography variant="h6">Paneer</Typography>
              <ArrowRight />
            </Box>
          </Link>
          <Link to="/dishes?search=biriyani" style={{ textDecoration: 'none', color: '#111' }}>
            <Box className={classes.searchList}>
              <Typography variant="h6">Biriyani</Typography>
              <ArrowRight />
            </Box>
          </Link>
        </Box>
      )}
      {searchTerm?.length > 2 && (
        <Box sx={{ mt: '4rem' }}>
          <ProductCardSlider
            cards={searchData?.map((menuItem) => <MenuItemCard menuItem={menuItem} />) || []}
            error={isError}
            isLoading={isLoading}
            skeltonCard={<MenuItemSkeleton />}
            title={'Dishes'}
            sliderPerView={[1.1, 2, 3]}
          />
        </Box>
      )}
    </Container>
  )
}
