var p    = require('proclets'),
    path = require('path'),
    root = path.join(path.dirname(__filename), "..");

exports.compilers = {
  gcl: function() {
    return p.cmd("java", ["-jar", path.join(root, 'vendor/google/compiler.jar')]);
  },
  yui: function() {
    return p.cmd("java", ["-jar", path.join(root, 'vendor/yui/yuicompressor.jar'), "--type=js"]);
  },
  uglify: function() {
    return p.cmd("uglifyjs", []);
  }
};

exports.compile = function(compiler, input, output, errs) {
  if (input) {
    if (Array.isArray(input)) {
      input = p.cmd('cat', input);
    } else if (typeof input === 'string') {
      input = p.inp(input);
    } else if (typeof input.on === 'function') {
      input = p.wrap(input);
    } else {
      throw new Error("fuuffftaaaz");
    }
  } else {
    input = p.stdin();
  }

  if (output) {
    if (typeof output === 'string') {
      output = p.out(output);
    } else if (typeof input.on === 'function') {
      output = p.wrap(output);
    } else {
      throw new Error("fuuffftaaaz");
    }
  } else {
    output = p.stdout();
  }

  var p1 = input;
  var p2 = exports.compilers[compiler]();
  var p3 = output;

  p1.spawn(p2.stdin, errs);
  p2.spawn(p3.stdin, errs);
  p3.spawn(null, errs);
};