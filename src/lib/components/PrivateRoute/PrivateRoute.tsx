import { Box } from '@material-ui/core'
import React from 'react'
import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router-dom'
import { IPrivateRouterProps } from './privateRouter.type'

const PrivateRoute: React.FC<IPrivateRouterProps> = ({
  viewer,
  setViewer,
  component: Component,
  ...rest
}) => {
  const { id } = viewer

  return id ? (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        Component ? <Component viewer={viewer} setViewer={setViewer} {...props} /> : null
      }
    />
  ) : (
    <Redirect to="/login" />
  )
}

export { PrivateRoute }
