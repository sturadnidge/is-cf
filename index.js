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

  getServiceInstance: function (serviceName, instanceName) {
    if (!hasServices()) {
      return null;
    }

    let services = module.exports.getServicesEnv();

    if (serviceName in services) {

      let instance = _.find(services[serviceName], function(obj) {
        return obj.name === instanceName;
      });

      return _.isNil(instance) ? null : instance;

    } else {
      return null;
    }

  },

  getServicesEnv: function () {
    return JSON.parse(process.env.VCAP_SERVICES);
  }

};

// internal
function hasServices() {
  return process.env.VCAP_SERVICES;
}
