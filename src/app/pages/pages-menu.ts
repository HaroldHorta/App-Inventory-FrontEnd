import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Escritorio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Inventario',
    group: true,
  },
  {
    title: 'Inventario',
    icon: 'folder-outline',
    children: [
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
        title: 'Productos',
        icon: 'gift-outline',
        link: 'product',
      },
      {
        title: 'Inventario',
        icon: 'archive-outline',
        link: 'inventory',
      },
      {
        title: 'Gastos',
        icon: 'archive-outline',
        link: 'expenses',
      },
      {
        title: 'Arqueo de caja',
        icon: 'inbox-outline',
        link: 'cashRegister',
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
    ],
  },
  {
    title: 'Historia Clinica',
    group: true,
  },
  {
    title: 'Clinica',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Razas',
        icon: 'radio-button-off-outline',
        link: 'breed',
      },
      {
        title: 'Especies',
        icon: 'radio-button-off-outline',
        link: 'species',
      },

    ],
  },
];
