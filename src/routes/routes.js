import { lazy } from 'react';

const routes = [
  {
    path: 'dashboard',
    component: lazy(() => import('../pages/Dashboard/Dashboard')),
    exact: true
  },
  {
    path: 'penjualan',
    component: lazy(() => import('../pages/Preferences/Preferences')),
    exact: true
  }
];

export default routes;