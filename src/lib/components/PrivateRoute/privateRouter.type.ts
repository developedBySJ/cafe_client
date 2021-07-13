import { Route, RouteComponentProps, RouteProps, useHistory } from 'react-router-dom'
import { Viewer } from '../../types/viewer'

type BasePropsTypes = { viewer: Viewer; setViewer: setViewerType }

export type PrivateRouteComponentType =
  | React.ComponentType<RouteComponentProps<any> & BasePropsTypes>
  | React.ComponentType<BasePropsTypes>

export type setViewerType = (viewer: Viewer) => void
export interface IPrivateRouterProps extends RouteProps {
  viewer: Viewer
  component: PrivateRouteComponentType
  setViewer: setViewerType
}

export type PrivateRouteComponent<T = {}> = React.ComponentType<
  T & { viewer: Viewer; setViewer: setViewerType }
>
