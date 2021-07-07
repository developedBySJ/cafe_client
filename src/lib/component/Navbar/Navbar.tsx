import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme, FilledInput, Box, Container } from '@material-ui/core'
import { Search } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { BrandIcon } from '../../assets'
const useStyle = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(250,250,250,0.8)',
    backdropFilter: 'saturate(180%) blur(8px)',
  },
  margin: {
    margin: '0 0.5rem',
  },
  searchIcon: {
    margin: '0 0.5rem',
  },
}))

export const Navbar: React.FC<{}> = (props) => {
  const { appBar, margin, searchIcon } = useStyle()
  const theme = useTheme()
  const history = useHistory()
  return (
    <AppBar style={{ margin: 0 }} className={appBar} id="my-navbar" elevation={0}>
      <Container>
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={() => history.push('/')}
          >
            <BrandIcon color="primary" />
          </IconButton>
          <Box display="flex" alignItems="center" marginLeft={'auto'}>
            <InputBase
              className={margin}
              startAdornment={<Search className={searchIcon} color={theme.palette.grey[900]} />}
            />

            <Button
              color="primary"
              variant="contained"
              size="small"
              className={margin}
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={margin}
              onClick={() => history.push('/signup')}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
