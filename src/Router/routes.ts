import { RouteProps } from 'react-router-dom'
import { PrivateRouteComponentType } from '../lib/components/PrivateRoute'

import { RouteNotImplemented } from '../lib/components/RouteNotImplemented'
import { ForgotPassword, MenuItemDetails, ResetPassword, MenuItemsList, Home } from '../section'
import Cart from '../section/Cart/Cart'
import { Checkout } from '../section/Checkout'
import { Favorite } from '../section/Favorite'
import { Invoice } from '../section/Invoice'
import { Logout } from '../section/Logout'
import { MenuDetails } from '../section/MenuDetails'
import { Menus } from '../section/Menus'
import { NewReview } from '../section/NewReview'
import { NotFound } from '../section/NotFound'
import { Orders } from '../section/Orders'
import { Profile } from '../section/Profile'
import { Reviews } from '../section/Reviews'

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
  { path: '/404', component: NotFound, exact: true },
  { path: '/admin', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/me', component: Profile, exact: true, isPrivate: true },
  { path: '/favorites', component: Profile, exact: true, isPrivate: true },
  { path: '/cart', component: Cart, exact: true, isPrivate: true },
  { path: '/forgot-password', component: ForgotPassword, exact: true },
  { path: '/reset-password/:token', exact: true, component: ResetPassword },
  { path: '/checkout', exact: true, component: Checkout, isPrivate: true },
  { path: '/logout', exact: true, component: Logout, isPrivate: true },
  /* DISHES */
  { path: '/dishes', component: MenuItemsList, exact: true },
  { path: '/dishes/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/dishes/:id', component: MenuItemDetails, exact: true },
  { path: '/dishes/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* MENUS */
  { path: '/menus', component: Menus, exact: true },
  { path: '/menus/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/menus/:id', component: MenuDetails, exact: true },
  { path: '/menus/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* REVIEWS */
  { path: '/dishes/:menuId/reviews', component: Reviews, exact: true },
  { path: '/dishes/:menuId/reviews/new', component: NewReview, exact: true, isPrivate: true },
  { path: '/reviews', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/reviews/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* INVENTORIES */
  { path: '/inventories', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/inventories/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/inventories/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* ORDERS */
  { path: '/orders', component: Profile, exact: true, isPrivate: true },
  /* /orders/all ROUTE IS  ONLY FOR ADMIN */
  { path: '/orders/all', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/pending', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/:id', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/orders/:id/invoice', component: Invoice, exact: true, isPrivate: true },
  { path: '/orders/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* CUSTOMERS */
  { path: '/users', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/new', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/:id/edit', component: RouteNotImplemented, exact: true, isPrivate: true },
  { path: '/users/:id/delete', component: RouteNotImplemented, exact: true, isPrivate: true },

  /* HOME */
  { path: '/', component: Home, exact: true },
]
