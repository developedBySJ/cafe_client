import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme, Box, Container, Typography } from '@material-ui/core'
import { Heart, Search, Menu as MenuIcon, ShoppingBag, User } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { BrandIcon } from '../../assets'
import { Viewer } from '../../types/viewer'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { MobNav } from './components'

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
}))

interface NavbarProps {
  viewer: Viewer
}

export const Navbar: React.FC<NavbarProps> = ({ viewer }) => {
  const classes = useStyle()
  const theme = useTheme()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (route?: string) => {
    setAnchorEl(null)
    route && history.push(route)
  }
  return (
    <AppBar className={classes.appBar} id="my-navbar" elevation={0}>
      <Container>
        <Toolbar style={{ padding: 0 }}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={() => history.push('/')}
          >
            <BrandIcon color="primary" />
          </IconButton>
          <Box display="flex" alignItems="center" marginLeft={'auto'}>
            <Box className={classes.showSm}>
              <MobNav
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={(isOpen) => setIsDrawerOpen(isOpen)}
                viewer={viewer}
              />
              <IconButton
                edge="start"
                color="default"
                aria-label="search"
                onClick={() => history.push('/search')}
                className={classes.margin}
              >
                <Search color="#111111" />
              </IconButton>
              <IconButton
                edge="start"
                color="default"
                aria-label="menu"
                onClick={() => setIsDrawerOpen(true)}
                className={classes.margin}
              >
                <MenuIcon color="#111111" />
              </IconButton>
            </Box>
            <Box className={classes.hiddenSm} display="flex" alignItems="center">
              <Typography color="textPrimary">
                <Link to="/" className={classes.navLink}>
                  Home
                </Link>
              </Typography>
              <Typography color="textPrimary">
                <Link to="/menus" className={classes.navLink}>
                  Explore
                </Link>
              </Typography>

              {viewer.id ? (
                <>
                  <IconButton
                    edge="start"
                    color="default"
                    aria-label="menu"
                    onClick={() => history.push('/favorites')}
                    className={classes.margin}
                  >
                    <Heart />
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="default"
                    aria-label="menu"
                    onClick={() => history.push('/cart')}
                    className={classes.margin}
                  >
                    <ShoppingBag />
                  </IconButton>
                  {viewer.avatar ? (
                    <IconButton
                      edge="start"
                      color="default"
                      aria-label="menu"
                      onClick={() => history.push('/profile')}
                      className={classes.margin}
                    >
                      <Avatar style={{ width: 32, height: 32 }} src={viewer.avatar} />
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
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose()}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => handleClose('/me')}>Profile</MenuItem>
                    <MenuItem onClick={() => handleClose('/logout')}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    className={classes.loginButton}
                    onClick={() => history.push('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    className={classes.margin}
                    onClick={() => history.push('/signup')}
                  >
                    Sign up
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
