import { Box, Container, Grid, Typography } from '@material-ui/core'
import { useQuery } from 'react-query'
import { MenuItemCard } from '..'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'

const mock = {
  id: '111cb109-b073-4f3c-8c00-4df371437680',
  name: 'FRESH DESSERTS',
  isActive: true,
  image:
    'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80',
  createdAt: '2021-07-24T06:00:50.665Z',
  updatedAt: '2021-07-24T06:00:50.665Z',
}

export const MenuDetails = () => {
  const { name, image, isActive, id } = mock
  const { data } = useQuery(['users', {} as MenuItemsQuery], () => MENU_ITEMS({ menu: id }), {
    onSuccess: ({ data }) => console.log(data),
  })
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
