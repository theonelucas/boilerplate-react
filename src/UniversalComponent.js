import PropTypes from 'prop-types';
import universal from 'react-universal-component';

import Loading from './components/Loading';
import NotFound from './components/NotFound';

// Small function that allows page to be a string or a dynamic import function
const determineHowToLoad = ({ page }) => (typeof page !== 'string' ? () => page() : import(`./components/${page}`));

const UniversalComponent = universal(determineHowToLoad, {
  error: NotFound,
  loading: Loading,
  minDelay: 1200,
  onError: (error) => { throw error; },
});

UniversalComponent.propTypes = {
  alwaysDelay: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  loading: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  loadingTransition: PropTypes.bool,
  minDelay: PropTypes.number,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  timeout: PropTypes.number,
};

const loadComponent = file => universal(determineHowToLoad({ page: file }));

export default UniversalComponent;
export { loadComponent, universal };
