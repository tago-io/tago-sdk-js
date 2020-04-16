const axios  = require('axios');
const config = require('../config');
const waitTime = () => new Promise((resolve) => setTimeout(() => resolve(), 1500));

function resultHandler(result) {
  if (!result.data) {
    throw result.statusText;
  }

  if (result.data.status !== true) {
    return result.data.message || result.data.result || result.data;
  }

  if (result.config.url.includes('/data/export')) {
    return { data: result.data };
  }

  return { data: result.data.result };
}

async function tagoRequest(request_options) {
  request_options.timeout = config.request_timeout;

  // Prevent cache on IE
  request_options.headers = {
    ...request_options.headers,
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  };

  const request = () => {
    return axios(request_options).then(resultHandler).catch((error) => ({ error }));
  };

  let result;
  let resulterror;
  for (let i = 1; i <= config.request_attempts; i += 1) {
    const { data, error } = await request();
    if (!error) {
      result = data;
      break;
    }

    if (error.response) {
      resulterror = {
        from: 'SERVER_RESPONSE',
        url: error.config.url,
        method: String(error.config.method).toUpperCase(),
        status: error.response.status,
        code: error.code || 'UNKNOWN',
        statusText: error.response.statusText,
      };
    } else {
      resulterror = {
        from: 'CLIENT_REQUEST',
        url: error.config.url,
        method: String(error.config.method).toUpperCase(),
        status: -1,
        code: error.code || 'UNKNOWN',
        statusText: 'UNKNOWN',
      };
    }

    // ? Requests with client errors not retry.
    if (error.response && (error.response.status >= 400 || error.response.status < 500)) {
      resulterror = resultHandler(error.response);
      break;
    }

    await waitTime();
  }

  if (!result && resulterror) {
    throw resulterror;
  }

  return result;
}

module.exports = tagoRequest;
