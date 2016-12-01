'use strict';

var should = require('chai').should(),
    iscf = require('../index.js');

describe('#env', function() {
  it('checks for absence of standard CF environment variable', function() {
    if (process.env.VCAP_APPLICATION) {
      delete process.env.VCAP_APPLICATION;
    }
    iscf.env().should.equal(false);
  });
});
