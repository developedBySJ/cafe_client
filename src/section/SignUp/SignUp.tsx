import {
  Container,
  TextField,
  Button,
  makeStyles,
  Grid,
  Typography,
  useTheme,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
    padding: '4rem 2rem',
    margin: '2rem 0',
    backgroundColor: theme.palette.grey[50],
  },
  margin: {
    margin: '0.5rem 0',
  },
  heading: {
    marginBottom: '2.5rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    minHeight: '300px',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  marginTop: {
    marginTop: '1.5rem',
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0 !important',
      paddingTop: '0 !important',
      '&:last-child': {
        marginBottom: '0.5rem',
      },
    },
  },
}))

export const SignUp = () => {
  const { wrapper, margin, container, heading, marginTop, gridItem } = useStyle()
  const theme = useTheme()
  return (
    <Container maxWidth="sm" className={container}>
      <Paper className={wrapper} elevation={0}>
        <Typography variant="h3" className={heading} align="center">
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={gridItem}>
            <TextField
              id="firstName"
              label="First Name"
              variant="filled"
              fullWidth
              type="text"
              className={margin}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={gridItem}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="filled"
              fullWidth
              type="email"
              className={margin}
            />
          </Grid>
        </Grid>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          fullWidth
          type="email"
          className={margin}
        />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          fullWidth
          type="password"
          className={margin}
        />
        <Button variant="contained" color="primary" size="large" fullWidth className={marginTop}>
          Sign Up
        </Button>
        <Typography color="textSecondary" className={marginTop} align="center">
          Already Have Account ? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  )
}
