import routesMap from '../routesMap';
import routeActions from '../routeActions';

export default (state = routeActions.ROOT, action = {}) => (
  (routesMap[action.type] || routeActions.ROOT).title || state);
