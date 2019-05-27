import {
  SHORTEN_URL,
  URL_SHORTENED,
  URL_FIELD_CHANGED,
  SHORTEN_URL_ERROR,
} from '../actions/shortener';

const initialState = {
  loading: false,
  url: {
    error: '',
    value: '',
  },
  urlShortened: {
    short: '',
    url: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case URL_FIELD_CHANGED: {
      return {
        ...state,
        url: {
          error: '',
          value: action.payload,
        },
      };
    }

    case SHORTEN_URL: {
      return {
        ...state,
        loading: true,
      };
    }

    case URL_SHORTENED: {
      return {
        ...state,
        loading: false,
        url: { ...initialState.url },
        urlShortened: {
          short: `//${window.location.hostname}/${action.payload.short}`,
          url: action.payload.url,
        },
      };
    }

    case SHORTEN_URL_ERROR: {
      return {
        ...state,
        loading: false,
        url: {
          ...state.url,
          error: action.payload,
        },
        urlShortened: { ...initialState.urlShortened },
      };
    }

    default: {
      return state;
    }
  }
};
