'use strict';

/**
 * Convert Environment Array to Object
 * Note: It will replace duplicate keys for the last one
 * @param  {Array} environment
 * @return {Object}
 */
function env_to_obj(environment) {
    return environment.reduce((pv,cv) => { 
        pv[cv.key] = cv.value;
        return pv; 
    }, {});
}

module.exports = env_to_obj;
