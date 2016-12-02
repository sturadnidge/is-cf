'use strict';

const _ = require('lodash');

module.exports = {

  env: function () {
    return 'VCAP_APPLICATION' in process.env;
  },

  getAppEnv: function () {
    if (module.exports.env()) {
      return JSON.parse(process.env.VCAP_APPLICATION);
    }
    return null;
  },

  getService: function (name) {
    if (!hasServices()) {
      return null;
    }

    let services = module.exports.getServicesEnv();

    return (name in services) ? services[name] : null;

  },

  getServicesEnv: function () {
    return JSON.parse(process.env.VCAP_SERVICES);
  }

};

// internal
function hasServices() {
  if (!'VCAP_SERVICES' in process.env) {
    return false;
  }

  if (_.isEmpty(JSON.parse(process.env.VCAP_SERVICES))) {
    return false;
  }

  return true;
}
