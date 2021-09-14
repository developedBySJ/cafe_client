import { Book, CreditCard, Home, List, Package, Star, User } from 'react-feather'
import { BrandIcon } from '../../../lib/assets'

export enum Resources {
  Users = 'users',
  Inventory = 'inventory',
  Orders = 'orders',
  MenuItems = 'menu-items',
  Menus = 'menus',
  Payments = 'payments',
  Reviews = 'reviews',
  Home = 'home',
}

export const resourceMap = {
  [Resources.Home]: { name: 'Home', icon: <Home /> },
  [Resources.Users]: { name: 'Users', icon: <User /> },
  [Resources.Inventory]: { name: 'Inventory', icon: <List /> },
  [Resources.Orders]: { name: 'Orders', icon: <Package /> },
  [Resources.MenuItems]: { name: 'MenuItems', icon: <BrandIcon /> },
  [Resources.Menus]: { name: 'Menus', icon: <Book /> },
  [Resources.Payments]: { name: 'Payments', icon: <CreditCard /> },
  [Resources.Reviews]: { name: 'Reviews', icon: <Star /> },
}
