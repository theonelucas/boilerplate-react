import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UniversalComponent from '../UniversalComponent';
import isLoadingSelect from '../selectors/isLoading';

import Menu from './Menu/Menu';

const Switcher = ({ page, isLoading }) => (
  <div>
    <UniversalComponent page={page} isLoading={isLoading} />=
    <Menu />
  </div>
);

Switcher.defaultProps = {
  isLoading: false
};

Switcher.propTypes = {
  page: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};

const mapState = ({ page, ...state }) => ({
  page,
  isLoading: isLoadingSelect(state)
});

export default connect(mapState)(Switcher);
