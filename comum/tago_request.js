const axios  = require('axios');
const config = require('../config');
const waitTime = () => new Promise((resolve) => setTimeout(() => resolve(), 1500));

function resultHandler(request_options, result) {
  if (!result.data) {
    throw result.statusText;
  } else if (request_options.url.indexOf('/data/export') !== -1) {
    return { data: result.data };
  } else if (!result.data.status) {
    throw result.data.message || result;
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
    return axios(request_options).then((r) => resultHandler(request_options, r)).catch((error) => ({ error }));
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
