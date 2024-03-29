import { Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { PrivateRouteComponent } from '../../lib'
import { makeStyles } from '@material-ui/core'
import { User, Heart, Package, Star, LogOut, BarChart2 } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'
import { Orders } from '../Orders'

import { Favorite } from '../Favorite'
import { AccountDetails } from './components'
import { UserRole } from '../../lib/types'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2rem',
    padding: 0,
  },
  listWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      overflow: 'auto',
    },
  },
  link: { textDecoration: 'none', color: 'inherit' },
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
  {
    name: 'Log Out',
    icon: LogOut,
    path: '/logout',
  },
]

export const Profile: PrivateRouteComponent = ({ children, ...props }) => {
  const { pathname } = useLocation()
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <List className={classes.listWrapper}>
            {props.viewer.role !== UserRole.Customer && (
              <Link to={'/dashboard'} className={classes.link}>
                <ListItem button selected={pathname === '/dashboard'}>
                  <ListItemIcon>
                    <BarChart2 />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
            )}
            {sideBarConfig.map(({ name, icon: Icon, path }, index) => (
              <Link to={path} key={index} className={classes.link}>
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
        <Grid item xs={12} md={8} lg={9}>
          {pathname === '/me' && <AccountDetails {...props} />}
          {pathname === '/orders' && <Orders {...props} />}
          {pathname === '/favorites' && <Favorite {...props} />}
        </Grid>
      </Grid>
    </Container>
  )
}
