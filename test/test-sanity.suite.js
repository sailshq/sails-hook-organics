describe('sanity', function(){
  describe('require(\'…\')', function(){
    var stdlib;
    it('worked', function(){
      stdlib = require('./');
    });
    it('is callable', function(){
      assert(_.isFunction(stdlib));
    });
    it('has a .customize() method', function(){
      assert(_.isFunction(stdlib.customize));
    });
  });//∂
});//∂


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TODO: Also bring in test suites from:
// + https://github.com/mikermcneil/machinepack-passwords/tree/master/test
// + https://github.com/irlnathan/machinepack-gravatar/tree/master/tests
// + https://github.com/particlebanana/machinepack-mailgun/tree/master/test
// + https://github.com/particlebanana/machinepack-stripe/tree/master/test
//
// (and for any other logic that we bring in to this package)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
