import React from 'react'
import { Route, RouteComponentProps, useHistory } from 'react-router-dom'
import { IPrivateRouterProps } from './privateRouter.type'

const PrivateRoute: React.FC<IPrivateRouterProps> = ({
  viewer,
  setViewer,
  component: Component,
  ...rest
}) => {
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
        Component ? <Component viewer={viewer} setViewer={setViewer} {...props} /> : null
      }
    />
  ) : (
    <h1>loading</h1>
  )
}

export { PrivateRoute }
