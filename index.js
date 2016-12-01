'use strict';

module.exports = {

  env: function () {
    return 'VCAP_APPLICATION' in process.env;
  }

};
