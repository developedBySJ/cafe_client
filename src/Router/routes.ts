import { RouteComponentProps, RouteProps } from 'react-router-dom'
import { PrivateRouteComponentType } from '../lib/components/PrivateRoute'
import { Viewer } from '../lib/types/viewer'
import { ForgotPassword, Login, SignUp } from '../section'
import { MenuItemsList } from '../section/MenuItemsList/MenuItemsList'
import { ResetPassword } from '../section/ResetPassword'

interface RoutesProps extends RouteProps {
  isPrivate?: false
}
interface PrivateRoutesProps extends RouteProps {
  isPrivate?: true
  component: PrivateRouteComponentType
}

type Routes = RoutesProps | PrivateRoutesProps

export const ROUTES: Routes[] = [
  { path: '/forgot-password', component: ForgotPassword, exact: true },
  { path: '/reset-password/:token', component: ResetPassword },
  { path: '/dishes', component: MenuItemsList, exact: true },
]
