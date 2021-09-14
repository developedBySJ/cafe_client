import { Resources } from '.'
import { Routes } from '../../../Router'

import { Inventory, MenuItems, Menus, Orders, Payments, Reviews, Users } from '../components'
import { Dashboard } from '../components/dashboard'
import { InventoryCreate } from '../components/Inventory/InventoryCreate'
import { InventoryEdit } from '../components/Inventory/InventoryEdit'
import { MenuCreate } from '../components/Menus/MenuCreate'
import { MenuEdit } from '../components/Menus/MenuEdit'
import { PaymentCreate } from '../components/Payments/PaymentCreate'
import { PaymentEdit } from '../components/Payments/PaymentEdit'
import { ReviewEdit } from '../components/Reviews/ReviewEdit'
import { UserCreate } from '../components/Users/UserCreate'
import { UsersEdit } from '../components/Users/UserEdit'

export const viewDataRoutes: Routes[] = [
  {
    path: `/admin/${Resources.Users}`,
    component: Users,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Inventory}`,
    component: Inventory,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Orders}`,
    component: Orders,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.MenuItems}`,
    component: MenuItems,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Menus}`,
    component: Menus,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Payments}`,
    component: Payments,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Reviews}`,
    component: Reviews,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
]

export const editDataRoutes: Routes[] = [
  {
    path: `/admin/${Resources.Users}/:id/edit`,
    component: UsersEdit,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Inventory}/:id/edit`,
    component: InventoryEdit,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Orders}/:id/edit`,
    component: Orders,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.MenuItems}/:id/edit`,
    component: MenuItems,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Menus}/:id/edit`,
    component: MenuEdit,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Payments}/:id/edit`,
    component: PaymentEdit,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Reviews}/:id/edit`,
    component: ReviewEdit,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
]

export const createDataRoutes: Routes[] = [
  {
    path: `/admin/${Resources.Users}/create`,
    component: UserCreate,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Inventory}/create`,
    component: InventoryCreate,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Orders}/create`,
    component: Orders,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.MenuItems}/create`,
    component: MenuItems,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Menus}/create`,
    component: MenuCreate,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Payments}/create`,
    component: PaymentCreate,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
  {
    path: `/admin/${Resources.Reviews}/create`,
    component: Reviews,
    isPrivate: true,
    exact: true,
    sensitive: false,
  },
]

export const AdminRoutes: Routes[] = [
  { path: `/dashboard`, component: Dashboard, isPrivate: true, sensitive: false },
  ...editDataRoutes,
  ...viewDataRoutes,
  ...createDataRoutes,
]
