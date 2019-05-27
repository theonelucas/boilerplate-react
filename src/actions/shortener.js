export const SHORTEN_URL = 'UrlShortener/SHORTEN_URL';
export const URL_SHORTENED = 'UrlShortener/URL_SHORTENED';
export const URL_FIELD_CHANGED = 'UrlShortener/URL_FIELD_CHANGED';
export const SHORTEN_URL_ERROR = 'UrlShortener/SHORTEN_URL_ERROR';

export const shortenUrl = () => ({ type: SHORTEN_URL });
export const urlShortened = payload => ({ payload, type: URL_SHORTENED });
export const urlFieldChanged = payload => ({ payload, type: URL_FIELD_CHANGED });
export const shortenUrlError = payload => ({ payload, type: SHORTEN_URL_ERROR });
