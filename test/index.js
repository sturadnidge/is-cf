'use strict';

var should = require('chai').should(),
    isCF = require('../index.js');

var mockServiceEnv = {
  "example-service-1": [
    {
      "label": "example-service-1",
      "name": "example-instance-1"
    },
    {
      "label": "example-service-1",
      "name": "example-instance-2"
    }
  ],
  "example-service-N": [
    {
      "label": "example-service-N",
      "name": "example-instance-1"
    },
    {
      "label": "example-service-N",
      "name": "example-instance-2"
    }
  ]
};

describe('#env', function() {
  it('checks for presence of standard CF environment variable', function() {
    if (process.env.VCAP_APPLICATION) {
      delete process.env.VCAP_APPLICATION;
    }
    isCF.env().should.equal(false);
  });
});

describe('#getAppEnv', function() {
  it('gets VCAP_APPLICATION environment variable', function() {
    if (!process.env.VCAP_APPLICATION) {
      process.env.VCAP_APPLICATION = '{"application_name": "example-app-name"}';
    }
    isCF.getAppEnv().should.have.property('application_name', 'example-app-name');
    // cleanup for next test, this is a global var!
    delete process.env.VCAP_SERVICES;
  });
});

describe('#getServicesEnv', function() {
  it('gets VCAP_SERVICES environment variable', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);;
    }
    isCF.getServicesEnv().should.have.property('example-service-1').with.lengthOf(2);
    // cleanup for next test, this is a global var!
    delete process.env.VCAP_SERVICES;
  });
});

describe('#getService', function() {
  it('gets service metadata', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);;
    }
    isCF.getService('example-service-1').should.be.an('array');
    // cleanup for next test, this is a global var!
    delete process.env.VCAP_SERVICES;
  });
});

describe('#getService', function() {
  it('fails to get service metadata when no services exist', function() {
    if (process.env.VCAP_SERVICES) {
      delete process.env.VCAP_SERVICES;
    }
    should.not.exist(isCF.getService('foo'));
  });
});

describe('#getService', function() {
  it('fails to get specified service metadata when other services exist', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);
    }
    should.not.exist(isCF.getService('foo'));
    // cleanup for next test, this is a global var!
    delete process.env.VCAP_SERVICES;
  });
});

describe('#getServiceInstance', function() {
  it('gets service instance metadata', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);
    }
    isCF.getServiceInstance('example-service-1', 'example-instance-2').should.be.an('object');
  });
});

describe('#getServiceInstance', function() {
  it('fails to get service instance metadata when no services exist', function() {
    if (process.env.VCAP_SERVICES) {
      delete process.env.VCAP_SERVICES;
    }
    should.not.exist(isCF.getServiceInstance('example-service-1', 'example-instance-2'));
  });
});

describe('#getServiceInstance', function() {
  it('fails to get specified service instance metadata when service instance does not exist', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);
    }
    should.not.exist(isCF.getServiceInstance('example-service-N', 'foo'));
  });
});

describe('#getServiceInstance', function() {
  it('gets correct service instance metadata when same service instance name exists in multiple services', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = JSON.stringify(mockServiceEnv);
    }
    isCF.getServiceInstance('example-service-N', 'example-instance-1')
        .should.have.property('label', 'example-service-N');
  });
});
