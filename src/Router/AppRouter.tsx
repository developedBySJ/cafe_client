import React from 'react'
import { Route } from 'react-router-dom'
import { PrivateRoute, PrivateRouteComponentType } from '../lib/component/PrivateRoute'
import { Viewer } from '../lib/types/viewer'
import { ROUTES } from './routes'

interface AppRouterProps {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const AppRouter: React.FC<AppRouterProps> = ({ viewer, setViewer }) => {
  return (
    <>
      {ROUTES.map(({ isPrivate, component, ...props }, key) => {
        return isPrivate ? (
          <PrivateRoute
            key={key}
            setViewer={setViewer}
            component={component as PrivateRouteComponentType}
            viewer={viewer}
            {...props}
          />
        ) : (
          <Route key={key} component={component} {...props} />
        )
      })}
    </>
  )
}
