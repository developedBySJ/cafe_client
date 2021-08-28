import { Resources } from ".";
import { Routes } from "../../../Router";

import { Inventory, MenuItems, Menus, Orders, Payments, Reviews, Users } from '../components'

export const viewDataRoutes: Routes[] = [
  { path: `/admin/${Resources.Users}`, component: Users, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.Inventory}`, component: Inventory, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.Orders}`, component: Orders, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.MenuItems}`, component: MenuItems, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.Menus}`, component: Menus, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.Payments}`, component: Payments, isPrivate: true, exact: true, sensitive: false, },
  { path: `/admin/${Resources.Reviews}`, component: Reviews, isPrivate: true, exact: true, sensitive: false, },
]



export const AdminRoutes: Routes[] = [
  ...viewDataRoutes

]