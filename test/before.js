// Inject global `before` for our Mocha tests.
before(function(done){

  // Expose a few fun little globals, for convenience & brevity.
  var GLOBALS_FOR_TEST_SUITES = {
    assert: require('assert'),
    util: require('util'),
    _: require('@sailshq/lodash'),
    // ```
    // organics: …………require('../accessible/dry')…………
    // ```
    // TODO: ^^ expose an `organics` global here, but build it so that it's
    // packs of callables
  };

  Object.keys(GLOBALS_FOR_TEST_SUITES).forEach(function(desiredGlobalVarName){
    if (global[desiredGlobalVarName]) {
      throw new Error('Test runner cannot expose `'+desiredGlobalVarName+'` -- a global variable with the same name already exists!');
    }
    global[desiredGlobalVarName] = GLOBALS_FOR_TEST_SUITES[desiredGlobalVarName];
  });//∞

  return done();
});
