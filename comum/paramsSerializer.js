
const qs = require('qs');
module.exports = function paramsSerializer(params) { return qs.stringify(params); };
