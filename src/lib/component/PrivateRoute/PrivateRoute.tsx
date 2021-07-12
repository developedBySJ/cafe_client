import React from 'react'
import { Route, RouteComponentProps, RouteProps, useHistory } from 'react-router-dom'
import { Viewer } from '../../types/viewer'

interface IPrivateRouterProps extends RouteProps {
  viewer: Partial<Viewer>
  component:
    | React.ComponentType<RouteComponentProps<any> & { viewer: Viewer }>
    | React.ComponentType<{ viewer: Viewer }>
}

export type PrivateRouteComponent<T = {}> = React.ComponentType<T & { viewer: Viewer }>

const PrivateRoute: React.FC<IPrivateRouterProps> = ({ viewer, component: Component, ...rest }) => {
  const { didRequest, id } = viewer
  const history = React.useRef(useHistory())
  const [authorized, setAuthorized] = React.useState(false)
  React.useEffect(() => {
    if (didRequest && !id) {
      history.current.push('/login')
    }
    if (id) {
      setAuthorized(true)
    }
  }, [id, didRequest])
  return authorized ? (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        Component ? <Component viewer={viewer as Viewer} {...props} /> : null
      }
    />
  ) : (
    <h1>loading</h1>
  )
}

export { PrivateRoute }
