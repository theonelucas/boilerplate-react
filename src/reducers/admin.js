import { ADMIN_FETCHED } from '../components/actions';

const initialState = {
  message: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN_FETCHED: {
      return {
        ...state,
        message: 'redux-saga works with ssr!'
      };
    }
    default: {
      return state;
    }
  }
};
