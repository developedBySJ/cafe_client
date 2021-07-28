import { RouteProps } from 'react-router-dom'
import { PrivateRouteComponentType } from '../lib/components/PrivateRoute'
import { RouteNotImplemented } from '../lib/components/RouteNotImplemented'
import { ForgotPassword, MenuItemDetails, ResetPassword, MenuItemsList, Home } from '../section'
import Cart from '../section/Cart/Cart'
import { NotFound } from '../section/NotFound'

interface RoutesProps extends RouteProps {
  isPrivate?: false
}
interface PrivateRoutesProps extends RouteProps {
  isPrivate?: true
  component: PrivateRouteComponentType
}

type Routes = RoutesProps | PrivateRoutesProps

export const ROUTES: Routes[] = [
  /* AUTH */
  { path: '/404', component: NotFound, exact: true, },
  { path: '/admin', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/cart', component: Cart, exact: true, isPrivate: true },
  { path: '/favorites', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/forgot-password', component: ForgotPassword, exact: true },
  { path: '/reset-password/:token', exact: true, component: ResetPassword },
  /* DISHES */
  { path: '/dishes', component: MenuItemsList, exact: true },
  { path: '/dishes/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/dishes/:id', component: MenuItemDetails, exact: true },
  { path: '/dishes/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* MENUS */
  { path: '/menus', component: RouteNotImplemented, exact: true },
  { path: '/menus/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/menus/:id', component: RouteNotImplemented, exact: true },
  { path: '/menus/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* REVIEWS */
  { path: '/dishes/:menuId/reviews', component: RouteNotImplemented, exact: true },
  { path: '/reviews', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/reviews/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },


  /* INVENTORIES */
  { path: '/inventories', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/inventories/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/inventories/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* ORDERS */
  { path: '/orders', component: RouteNotImplemented, exact: true, isPrivate: true },
  /* /orders/all ROUTE IS  ONLY FOR ADMIN */
  { path: '/orders/all', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/pending', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/:id', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },


  /* CUSTOMERS */
  { path: '/users', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/:id/delete', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* HOME */
  { path: '/', component: Home, exact: true },
]
