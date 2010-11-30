var uutest = require('uutest'),
    minmin = require('../lib/minmin'),
    exec   = require('child_process').exec;

var suite = new uutest.Suite({timeout: 2000});

suite.test("compile stdin to stdout", function(assert) {
  exec('../bin/minmin fixtures/foo.js', assert.trap(function(error, stdout, stderr) {
    assert.ifError(error);
    assert.match(stdout, /^function/);
    assert.equal(stderr, '');
    assert.pass();
  }));
});

suite.register(module);