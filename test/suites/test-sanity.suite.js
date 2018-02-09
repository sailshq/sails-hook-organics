describe('sanity', function(){
  describe('when loaded with require(\'…\'), it', function(){
    var shOrganics;
    it('exists', function(){
      shOrganics = require('../../');
    });
    it('is callable', function(){
      assert(_.isFunction(shOrganics));
    });
    it('returns something with an .initialize() method', function(){
      var pretendSailsApp = {};
      assert(_.isFunction(shOrganics(pretendSailsApp).initialize));
    });
  });//∂
  // describe('when accessed via the convenience global exposed for our test suites, `sails.stdlib`', function(){
  //   it('exists', function(){
  //     assert(sails.stdlib);
  //   });
  //   it('is callable', function(){
  //     assert(_.isFunction(sails.stdlib));
  //   });
  //   it('has a .customize() method', function(){
  //     assert(_.isFunction(sails.stdlib.customize));
  //   });
  // });//∂
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
