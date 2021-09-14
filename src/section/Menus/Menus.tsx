import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { GET_MENUS } from '../../lib/api/query/menus'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { useOnErrorNotify } from '../../lib/hooks'
import { MenusSkeleton } from './MenusSkeleton'

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    position: 'absolute',
    zIndex: 1,
    bottom: '0',
    left: '0',
    padding: '1rem 0.5rem',
    bgcolor: '#f7f7f7',
    width: '100%',
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'saturate(180%) blur(12px)',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
  },
  heading: {
    margin: '2rem 0 3rem 0',
  },
}))

export const Menus = () => {
  const classes = useStyles()
  const onErrorNotify = useOnErrorNotify()
  const { data, isLoading, isError } = useQuery(
    ['getMenus'],
    () => GET_MENUS('?limit=50&isActive=true'),
    {
      onError: onErrorNotify,
    },
  )

  if (isLoading) {
    return <MenusSkeleton />
  }
  if (isError) {
    return (
      <>
        <Container>
          <Alert variant="filled" color="error" severity="error">
            Something Went Wrong
          </Alert>
        </Container>
        <MenusSkeleton />
      </>
    )
  }

  if (!data) {
    return <h1>No menus</h1>
  }

  return (
    <Container>
      <Typography variant="h4" className={classes.heading}>
        Explore Our Menu
      </Typography>
      <Grid container spacing={2}>
        {data?.data?.result &&
          data?.data?.result.map((menu) => {
            return (
              <Grid key={menu.id} item xs={12} sm={6} md={4}>
                <Link to={`/menus/${menu.id}`} className={classes.link}>
                  <AspectRatioBox borderRadius={16}>
                    <Box height="512px" position="relative">
                      <Box className={classes.cardWrap}>
                        <Typography
                          variant="h5"
                          color="textPrimary"
                          style={{ marginLeft: '0.5rem' }}
                        >
                          {menu.name}
                        </Typography>
                      </Box>
                      {menu.image && (
                        <img
                          src={menu.image}
                          alt={menu.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />
                      )}
                    </Box>
                  </AspectRatioBox>
                </Link>
              </Grid>
            )
          })}
      </Grid>
    </Container>
  )
}
