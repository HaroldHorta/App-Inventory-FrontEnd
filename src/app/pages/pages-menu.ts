import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Categorias',
    icon: 'folder-outline',
    link: 'category',
  },
  {
    title: 'Customers',
    icon: 'people-outline',
    link: 'customer',
  },
  {
    title: 'Orden',
    icon: 'attach-2-outline',
    link: 'order',
  },
  {
    title: 'Productos',
    icon: 'gift-outline',
    link: 'product',
  },
  {
    title: 'Reportes',
    icon: 'bar-chart-outline',
    link: '/pages/reportes/add/add-reportes',
  },
  {
    title: 'Ticket',
    icon: 'radio-button-off-outline',
    link: 'ticket',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
