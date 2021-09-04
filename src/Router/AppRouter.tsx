import { Box, Container } from '@material-ui/core'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Spinner } from '../lib'
import { PrivateRoute, PrivateRouteComponentType } from '../lib/components/PrivateRoute'
import { Viewer } from '../lib/types/viewer'
import { Login, SignUp } from '../section'

import { ROUTES } from './routes'

interface AppRouterProps {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const AppRouter: React.FC<AppRouterProps> = ({ viewer, setViewer }) => {
  if (!viewer.didRequest) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }
  console.log(viewer)
  return (
    <Container maxWidth="xl" style={{ padding: 0, minHeight: '80vh' }}>
      <Switch>
        <Route path="/login" exact>
          <Login viewer={viewer} setViewer={setViewer} />
        </Route>
        <Route path="/signup" exact>
          <SignUp setViewer={setViewer} />
        </Route>
        {ROUTES.map(({ isPrivate, component, ...props }, key) => {
          return isPrivate ? (
            <PrivateRoute
              key={key}
              setViewer={setViewer}
              component={component as PrivateRouteComponentType}
              viewer={viewer}
              sensitive={false}
              {...props}
            />
          ) : (
            <Route key={key} component={component} {...props} sensitive={false} />
          )
        })}
        {/* <Redirect to="/404" /> */}
      </Switch>
    </Container>
  )
}
