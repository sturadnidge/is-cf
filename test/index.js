'use strict';

var should = require('chai').should(),
    isCF = require('../index.js');

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
      process.env.VCAP_APPLICATION = '{"application_name": "is-cf"}';
    }
    isCF.getAppEnv().should.have.property('application_name', 'is-cf');
  });
});

describe('#getServicesEnv', function() {
  it('gets VCAP_SERVICES environment variable', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = '{"is-cf": []}';
    }
    isCF.getServicesEnv().should.have.property('is-cf').with.lengthOf(0);
  });
});

describe('#getService', function() {
  it('gets service metadata', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = '{"is-cf": []}';
    }
    isCF.getService('is-cf').should.be.an('array');
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
  it('fails to get service metadata when other services exist', function() {
    if (!process.env.VCAP_SERVICES) {
      process.env.VCAP_SERVICES = '{"is-cf": []}';
    }
    should.not.exist(isCF.getService('foo'));
  });
});
