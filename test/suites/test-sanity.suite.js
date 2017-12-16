describe.skip('sanity', function(){
  describe('when loaded with require(\'…\'), it', function(){
    var stdlib;
    it('worked', function(){
      stdlib = require('../../');
    });
    it('is callable', function(){
      assert(_.isFunction(stdlib));
    });
    it('has a .customize() method', function(){
      assert(_.isFunction(stdlib.customize));
    });
  });//∂
  describe('when accessed via the convenience global exposed for our test suites, it', function(){
    it('exists', function(){
      assert(stdlib);
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
// TODO: update tests to build callables first
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TODO: Also bring in test suites from:
// + https://github.com/mikermcneil/machinepack-passwords/tree/master/test
// + https://github.com/irlnathan/machinepack-gravatar/tree/master/tests
// + https://github.com/particlebanana/machinepack-mailgun/tree/master/test
// + https://github.com/particlebanana/machinepack-stripe/tree/master/test
//
// (and for any other logic that we bring in to this package)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
