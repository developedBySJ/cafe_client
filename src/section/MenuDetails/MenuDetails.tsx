import { Box, Container, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { MenuItemCard } from '..'
import { GET_MENU } from '../../lib/api/query/menuDetail'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'
import { useOnErrorNotify } from '../../lib/hooks'
import { MenuDetailSkeleton } from './MenuDetailSkeleton'

export const MenuDetails = () => {
  const { id } = useParams<{ id: string }>()
  const notifyError = useOnErrorNotify()

  const {
    data: menu,
    isLoading: isMenuLoading,
    isError: isMenuError,
  } = useQuery(['getMenu', id], () => GET_MENU(id), {
    onError: notifyError,
  })
  const { data, isLoading, isError } = useQuery(
    ['getMenuItemsForMenu', {} as MenuItemsQuery],
    () => MENU_ITEMS({ menu: id }),
    {
      onError: notifyError,
      enabled: !!menu,
    },
  )

  if (isMenuLoading || isLoading) {
    return <MenuDetailSkeleton />
  }

  if (isMenuError || isError) {
    return (
      <>
        <Container>
          <Alert variant="filled" color="error" severity="error">
            Something Went Wrong
          </Alert>
        </Container>
        <MenuDetailSkeleton />
      </>
    )
  }
  if (!menu || !data) return null
  const { name, image } = menu?.data || { name: '', image: '' }
  return (
    <Box marginTop="-3rem">
      <figure
        style={{ margin: 0, padding: 0, position: 'relative', overflow: 'hidden', height: '40vh' }}
      >
        <figcaption
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Typography variant="h4" style={{ color: 'white' }}>
            {name}
          </Typography>
        </figcaption>
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            transform: 'scale(1.03)',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(12px)',
          }}
        />
      </figure>

      <Container>
        <Box marginBottom="2rem"></Box>
        <Typography variant="h4" style={{ margin: '2rem 0' }}>
          Explore
        </Typography>
        <Grid container spacing={2}>
          {data?.data.result.map((menuItem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={menuItem.id}>
              <MenuItemCard menuItem={menuItem} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
