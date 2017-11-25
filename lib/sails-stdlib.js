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
        return (function _buildingTrimmedCopy(){
          var dry = require('machinepack-strings').toJSON();
          return machine.pack(_.extend(_.clone(dry), {
            name: 'stdlib(\'strings\')',
            defs: _.pick(dry.defs, [
              'ensure-uniq',
              'random',
              'to-stream',
              'uuid'
            ])
          }));
        })();//•

      case 'flow':
        return machine.pack({
          name: 'stdlib(\'flow\')',
          description: 'Utilities for asynchronous flow control.',
          defs: {
            'build': require('./private/flow/build'),
            'dive': require('./private/flow/dive'),
            'for-each': require('./private/flow/for-each'),
            'simultaneously': require('./private/flow/simultaneously'),
            'pause': require('./private/flow/pause'),
            'until': require('./private/flow/until')
          }
        });


      // for...
      // Scripts and NPM Packages
      case 'fs':
        return (function _buildingTrimmedCopy(){
          var dry = require('machinepack-fs').toJSON();
          return machine.pack(_.extend(_.clone(dry), {
            name: 'stdlib(\'fs\')',
            defs: _.pick(dry.defs, [
              'cp',
              'ensure-dir',
              'exists',
              'ls',
              'mkdir',
              'mv',
              'read-json',
              'read-stream',
              'read',
              'rmrf',
              'template',
              'write-json',
              'write-stream',
              'write'
            ])
          }));
        })();//•

      case 'http':
        return (function _buildingTrimmedCopy(){
          var dry = require('machinepack-http').toJSON();
          return machine.pack(_.extend(_.clone(dry), {
            name: 'stdlib(\'http\')',
            defs: _.pick(dry.defs, [
              'del',
              'get-stream',
              'get',
              'patch',
              'post',
              'put',
              'send-http-request'
            ])
          }));
        })();//•

      case 'process':
        return (function _buildingTrimmedCopy(){
          var dry = require('machinepack-process').toJSON();
          return machine.pack(_.extend(_.clone(dry), {
            name: 'stdlib(\'process\')',
            defs: _.pick(dry.defs, [
              'execute-command'
            ])
          }));
        })();//•


      // for...
      // App Servers & Web APIs
      case 'gravatar':
        return machine.pack({
          name: 'stdlib(\'gravatar\')',
          description: 'Look up the avatar image associated with a particular email address.',
          defs: {
            'get-image-url': require('./private/gravatar/get-image-url'),
          }
        });

      case 'passwords':
        return machine.pack({
          name: 'stdlib(\'passwords\')',
          description: 'It\'s password time, and you\'re invited.',
          defs: {
            'hash-password': require('./private/passwords/hash-password'),
            'check-password': require('./private/passwords/check-password')
          }
        });

      case 'mailgun':
        return machine.pack({
          name: 'stdlib(\'mailgun\')',
          description: 'Communicate with the Mailgun API to send automated emails.',
          defs: {
            'send-html-email': require('./private/mailgun/send-html-email'),
          }
        });

      case 'stripe':
        return machine.pack({
          name: 'stdlib(\'stripe\')',
          description: 'Communicate with the Stripe API to charge credit cards, etc.',
          defs: {
            'create-customer': require('./private/stripe/create-customer'),
            'delete-source': require('./private/stripe/delete-source'),
            'retrieve-customer-details': require('./private/stripe/retrieve-customer-details'),
            'update-customer': require('./private/stripe/update-customer'),
          }
        });


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
