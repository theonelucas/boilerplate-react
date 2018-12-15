import routeActions from './routeActions';

export default {
  [routeActions.ROOT]: { path: '/', title: 'Root', component: 'Home' },
  [routeActions.HOME]: { path: '/home', title: 'Home', component: 'Home' },
  [routeActions.ADMIN]: { path: '/admin', title: 'Admin', component: 'Admin' }
};
