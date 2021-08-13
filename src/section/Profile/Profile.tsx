import { Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { PrivateRouteComponent } from '../../lib'
import { makeStyles } from '@material-ui/core'
import { User, Heart, Package, Star } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'
import { Orders } from '../Orders'

import { Favorite } from '../Favorite'
import { AccountDetails } from './components'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '1rem',
  },
  avatar: {
    width: '128px',
    height: '128px',
    margin: '0 auto',
  },
}))

const sideBarConfig = [
  {
    name: 'Profile',
    icon: User,
    path: '/me',
  },
  {
    name: 'Favorites',
    icon: Heart,
    path: '/favorites',
  },
  {
    name: 'Orders',
    icon: Package,
    path: '/orders',
  },
]

export const Profile: PrivateRouteComponent = ({ children, ...props }) => {
  const { pathname } = useLocation()

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <List>
            {sideBarConfig.map(({ name, icon: Icon, path }, index) => (
              <Link to={path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem button selected={path === pathname}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {pathname === '/me' && <AccountDetails {...props} />}
          {pathname === '/orders' && <Orders {...props} />}
          {pathname === '/favorites' && <Favorite {...props} />}
        </Grid>
      </Grid>
    </Container>
  )
}
