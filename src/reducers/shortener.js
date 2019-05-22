import {
  SHORTEN_URL,
  URL_SHORTENED,
  URL_FIELD_CHANGED,
  SHORTEN_URL_ERROR
} from '../actions/shortener';

const initialState = {
  url: {
    value: '',
    error: ''
  },
  urlShortened: {
    url: '',
    short: ''
  },
  loading: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case URL_FIELD_CHANGED: {
      return {
        ...state,
        url: {
          value: action.payload,
          error: ''
        }
      };
    }

    case SHORTEN_URL: {
      return {
        ...state,
        loading: true
      };
    }

    case URL_SHORTENED: {
      return {
        ...state,
        urlShortened: {
          url: action.payload.url,
          short: `//${window.location.hostname}/${action.payload.short}`
        },
        url: { ...initialState.url },
        loading: false
      };
    }

    case SHORTEN_URL_ERROR: {
      return {
        ...state,
        url: {
          ...state.url,
          error: action.payload
        },
        urlShortened: { ...initialState.urlShortened },
        loading: false
      };
    }

    default: {
      return state;
    }
  }
};
