/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var machine = require('machine');
var DEFAULT_CUSTOM_USAGE_OPTS = require('./private/DEFAULT_CUSTOM_USAGE_OPTS');
var getInspectFn = require('./private/get-inspect-fn');
var OUR_PACKAGE_JSON = require('../package.json');

/**
 * sails-stdlib
 *
 * Load a package from the standard library.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @param {String} slug
 *        The unique shorthand slug for a package. This is almost the same thing as
 *        the normal project slug (e.g. `machinepack-math`), just without the prefix
 *        (e.g. `math`).  Note that this is case insensitive-- whatever gets passed
 *        in is casted to lowercase before being used to look up the appropriate
 *        package.
 *
 * @param {Dictionary?} overrides
 *        Overrides for base custom usage opts.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @return {Dictionary}
 *         The machinepack instance for the specified package.
 */
module.exports = function loadSailsStdlibPg (slug, overrides){

  var opts = _.extend({}, DEFAULT_CUSTOM_USAGE_OPTS, overrides || {});

  var pg = (function _gettingAppropriatePackage(){
    switch (slug.toLowerCase()) {

      // for...
      // Any Occasion
      case 'strings':
        return require('machinepack-strings');

      case 'flow':
        return machine.pack({
          name: 'stdlib(\'flow\')',
          description: 'Utilities for asynchronous flow control.',
          defs: {
            build: require('./flow/build'),
            dive: require('./flow/dive'),
            forEach: require('./flow/for-each'),
            simultaneously: require('./flow/simultaneously'),
            pause: require('./flow/pause'),
            until: require('./flow/until')
          }
        });


      // for...
      // Scripts and NPM Packages
      case 'fs':
        return require('machinepack-fs');

      case 'http':
        return require('machinepack-http');

      case 'process':
        return require('machinepack-process');


      // for...
      // App Servers & Web APIs
      case 'gravatar':
        return require('machinepack-gravatar');

      case 'passwords':
        return require('machinepack-passwords');

      case 'mailgun':
        return require('machinepack-mailgun');

      case 'stripe':
        return require('machinepack-stripe');


      // for...
      // Miscreants
      default:
        throw new Error('Unrecognized package slug: `'+slug+'`.  Please choose from the list of packages listed at https://npmjs.com/package/sails-stdlib');
    }
  })();//†

  // Customize with custom usage opts.
  pg = pg.customize(opts);

  return pg;

};



/**
 * .customize()
 *
 * Return a customized version of this library with the specified custom usage
 * options applied across the board.
 *
 * @returns {Ref}  [customized library]
 */

Object.defineProperty(module.exports, 'customize', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: function customize(baselineCustomUsageOpts){
    var customizedLib = function loadCustomSailsStdlibPg(slug, overrides){
      return module.exports(slug, _.extend({}, DEFAULT_CUSTOM_USAGE_OPTS, baselineCustomUsageOpts, overrides||{}));
    };//ƒ
    Object.defineProperty(customizedLib, 'inspect', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: getInspectFn(baselineCustomUsageOpts)
    });
    return customizedLib;
  }//ƒ
});


/**
 * .inspect()
 *
 * Return a pretty-printed explanation of what this is, for use in the REPL, etc.
 *
 * > Note: This overrides Node's default console.log() / util.inspect() behavior.
 *
 * @returns {String}
 */

Object.defineProperty(module.exports, 'inspect', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: getInspectFn()
});


/**
 * .VERSION
 *
 * Expose the current version of this library.
 *
 * @type {String}
 */

Object.defineProperty(module.exports, 'VERSION', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: OUR_PACKAGE_JSON.version
});
