import { Box, SwipeableDrawer, Button, IconButton, Avatar, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { User, Package, Heart, LogOut, Home, Search, ArrowUpRight } from 'react-feather'
import { useHistory, useLocation } from 'react-router'
import { Viewer } from '../../../../types/viewer'

interface MobNavProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (args: boolean) => void
  viewer: Viewer
}

const useStyle = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(250,250,250,0.8)',
    backdropFilter: 'saturate(180%) blur(8px)',
    margin: 0,
  },
  margin: {
    margin: '0 0.1rem',
  },
  loginButton: {
    margin: '0 0.5rem',
  },
  searchIcon: {
    margin: '0 0.5rem',
  },
  navLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
    margin: '0 1rem',
  },
  hiddenSm: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  showSm: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  button: {
    justifyContent: 'left',
    paddingLeft: '1rem',
    margin: '0.1rem 0.5rem',
  },
}))

export const MobNav: React.FC<MobNavProps> = ({ isDrawerOpen, setIsDrawerOpen, viewer }) => {
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    setIsDrawerOpen(false)
    return () => {
      setIsDrawerOpen(false)
    }
  }, [location])

  return (
    <SwipeableDrawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      onOpen={() => setIsDrawerOpen(true)}
      style={{ width: '100vw' }}
    >
      <Box width="80vw" padding="4rem 1rem">
        {!viewer.id ? (
          <Box margin="2rem 0rem" display="flex">
            <Button
              color="primary"
              variant="contained"
              size="small"
              className={classes.loginButton}
              onClick={() => history.push('/login')}
              fullWidth
            >
              Login
            </Button>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={classes.margin}
              onClick={() => history.push('/signup')}
              fullWidth
            >
              Sign up
            </Button>
          </Box>
        ) : viewer.avatar ? (
          <IconButton
            edge="start"
            color="default"
            aria-label="menu"
            onClick={() => history.push('/profile')}
            className={classes.margin}
          >
            <Avatar style={{ width: 64, height: 64 }} src={viewer.avatar} />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="default"
            aria-label="menu"
            onClick={() => history.push('/profile')}
            className={classes.margin}
          >
            <User />
          </IconButton>
        )}

        <Button
          variant="text"
          startIcon={<Home />}
          size="large"
          fullWidth
          onClick={() => history.push('/')}
          className={classes.button}
        >
          Home
        </Button>
        <Button
          variant="text"
          startIcon={<Search />}
          size="large"
          fullWidth
          onClick={() => history.push('/search')}
          className={classes.button}
        >
          Search
        </Button>

        <Button
          variant="text"
          startIcon={<ArrowUpRight />}
          size="large"
          fullWidth
          onClick={() => history.push('/menus')}
          className={classes.button}
        >
          Explore
        </Button>
        {viewer.id && (
          <Box>
            <Button
              variant="text"
              startIcon={<User />}
              size="large"
              fullWidth
              onClick={() => history.push('/me')}
              className={classes.button}
            >
              Profile
            </Button>
            <Button
              variant="text"
              startIcon={<Package />}
              size="large"
              fullWidth
              onClick={() => history.push('/orders')}
              className={classes.button}
            >
              Orders
            </Button>
            <Button
              variant="text"
              startIcon={<Heart />}
              size="large"
              fullWidth
              onClick={() => history.push('/favorites')}
              className={classes.button}
            >
              Favorites
            </Button>
            (
            <Button
              variant="text"
              startIcon={<LogOut />}
              size="large"
              fullWidth
              onClick={() => history.push('/logout')}
              className={classes.button}
            >
              Logout
            </Button>
            )
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  )
}
