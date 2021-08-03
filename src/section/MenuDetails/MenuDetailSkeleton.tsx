import { Box, Container, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { MenuItemSkeleton } from '../MenuItemsList'

export const MenuDetailSkeleton = () => {
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
            <Skeleton width="200px" />
          </Typography>
        </figcaption>
        <Skeleton
          variant="rect"
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
          <Skeleton width="300px" />
        </Typography>
        <Grid container spacing={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <MenuItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
