import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Escritorio',
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
    title: 'Clientes',
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
    title: 'Cuenta',
    group: true,
  },
  {
    title: 'Autorización',
    icon: 'lock-outline',
    children: [
      {
        title: 'Ingresar',
        link: '/auth/login',
      },
      {
        title: 'Registrar',
        link: '/auth/register',
      },
      {
        title: 'Solicitud de contraseña',
        link: '/auth/request-password',
      },
      {
        title: 'Cambiar contraseña',
        link: '/auth/reset-password',
      },
    ],
  },
];
