const axios  = require('axios');
const config = require('../config');

function resultHandler(request_options, result) {
  if (!result.data) {
    throw result.statusText;
  } else if (request_options.url.indexOf('/data/export') !== -1) {
    return result.data;
  } else if (!result.data.status) {
    throw result.data.message || result;
  }
  return result.data.result;
}

function errorHandler(error, originalRequestObject) {
  const errorAxios = {
    code: error.code,
    errno: error.errno,
    syscall: error.syscall,
    response: error.response,
  };

  console.log(originalRequestObject, errorAxios);

  if (!error.response || !error.response.data) {
    throw error;
  }
  const { message, status, result } = error.response.data;

  if (error.config.method !== 'POST' && message && message.includes('Timeout')) {
    return 'Timeout';
  } else if (!status) {
    throw message || error;
  }
  throw result;
}

const waitTime = () => new Promise((resolve) => setTimeout(() => resolve(), 1000));

async function tagoRequest(request_options) {
  request_options.timeout = config.request_timeout;

  // Prevent cache on IE
  request_options.headers = {
    ...request_options.headers,
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  };

  let result;
  const _resultHandler = resultHandler.bind(null, request_options);

  for (let i = 1; i <= config.request_attempts; i += 1) {
    result = await axios(request_options).then(_resultHandler).catch((error) => errorHandler(error, request_options));
    if (result !== 'Timeout') break;

    await waitTime();
  }

  if (result === 'Timeout') result = 'SDK: Request timed out';
  return result;
}

module.exports = tagoRequest;
