import routeActions from './routeActions';

export default {
  [routeActions.ROOT]: { component: 'Artworks/Artworks', path: '/', title: 'Artworks' },
  [routeActions.PARTNERS]: { component: 'Partners/Partners', path: '/partners', title: 'Partners' }
};
