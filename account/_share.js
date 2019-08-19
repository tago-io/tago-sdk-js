const request         = require('../comum/tago_request.js');
const config          = require('../config.js');

function invite(type, ref_id, data, default_options) {
  data = data || {};
  if (!ref_id || ref_id === '') {
    return new Promise((resolve, reject) => reject(`${type} ID parameter is obrigatory.`));
  } else if (!data.email) {
    return new Promise((resolve, reject) => reject('data.email parameter is obrigatory.'));
  }

  const url    = `${config.api_url}/share/${type}/${ref_id}`;
  const method = 'POST';

  const options = { ...default_options, url, method, data };
  return request(options);
}

function edit(type, share_id, data, default_options) {
  data = data || {};
  if (!share_id || share_id === '') {
    return new Promise((resolve, reject) => reject('Share ID parameter is obrigatory.'));
  }

  const url    = `${config.api_url}/share/${share_id}`;
  const method = 'PUT';

  const options = { ...default_options, url, method, data };
  return request(options);
}

function list(type, ref_id, default_options) {
  if (!ref_id || ref_id === '') {
    return new Promise((resolve, reject) => reject(`${type} ID parameter is obrigatory.`));
  }

  const url    = `${config.api_url}/share/${type}/${ref_id}`;
  const method = 'GET';

  const options = { ...default_options, url, method };
  return request(options);
}

function remove(type, share_id, default_options) {
  if (!share_id || share_id === '') {
    return new Promise((resolve, reject) => reject('Share ID parameter is obrigatory.'));
  }

  const url    = `${config.api_url}/share/${share_id}`;
  const method = 'DELETE';

  const options = { ...default_options, url, method };
  return request(options);
}

exports.invite = invite;
exports.remove = remove;
exports.edit = edit;
exports.list = list;
