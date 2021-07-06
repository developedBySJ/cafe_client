import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography,
  useTheme,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
  wrapper: {
    padding: '4rem 2rem',
    margin: '2rem 0',
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
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
}))

export const Login = () => {
  const { wrapper, margin, container, heading, marginTop } = useStyle()
  const theme = useTheme()
  return (
    <Container maxWidth="sm" className={container}>
      <Paper className={wrapper} elevation={0}>
        <Typography variant="h3" className={heading} align="center">
          Log in
        </Typography>
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
        <Button variant="contained" color="primary" fullWidth size="large" className={marginTop}>
          Login
        </Button>
        <Typography color="textSecondary" className={marginTop} align="center">
          Don't Have Account ? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  )
}
