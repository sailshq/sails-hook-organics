/**
 * stdlib()
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
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @return {Dictionary}
 *         The machinepack instance for the specified package.
 */
module.exports = function loadStdlibPkg (slug){

  switch (slug.toLowerCase()) {


    // for...
    // Any Occasion
    case 'ifthen':
      return require('machinepack-ifthen');

    case 'strings':
      return require('machinepack-strings');

    case 'numbers':
      return require('machinepack-numbers');

    case 'booleans':
      return require('machinepack-booleans');

    case 'dictionaries':
      return require('machinepack-dictionaries');

    case 'arrays':
      return require('machinepack-arrays');

    case 'json':
      return require('machinepack-json');

    case 'datetime':
      return require('machinepack-datetime');

    case 'math':
      return require('machinepack-math');

    case 'paths':
      return require('machinepack-paths');

    case 'urls':
      return require('machinepack-urls');

    case 'emailaddresses':
      return require('machinepack-emailaddresses');



    // for...
    // Scripts and NPM Packages
    case 'fs':
      return require('machinepack-fs');

    case 'http':
      return require('machinepack-http');

    case 'process':
      return require('machinepack-process');

    case 'console':
      return require('machinepack-console');

    case 'util':
      return require('machinepack-util');



    // for...
    // App Servers & Web APIs
    case 'waterline':
      return require('machinepack-waterline');

    case 'sockets':
      return require('machinepack-sockets');

    case 'reqres':
      return require('machinepack-reqres');

    case 'sessionauth':
      return require('machinepack-sessionauth');

    case 'passwords':
      return require('machinepack-passwords');

    case 'mailgun':
      return require('machinepack-mailgun');

    case 'gravatar':
      return require('machinepack-gravatar');


    // for...
    // Miscreants
    default:
      throw new Error('Unrecognized package slug: `'+slug+'`.  Please choose from the list of packages at https://github.com/sailsjs/stdlib');
  }

};

// Expose the version string for debugging purposes.
module.exports.VERSION = require('./package.json').version;

// Expose the set of machinepacks bundled in this version of the standard library.
// Purely for convenience, each key (LHS) is the full project slug, and the shorthand
// slug is the value on the RHS.
module.exports.PACKS = {
  'machinepack-ifthen'          : 'ifthen',
  'machinepack-strings'         : 'strings',
  'machinepack-numbers'         : 'numbers',
  'machinepack-booleans'        : 'booleans',
  'machinepack-dictionaries'    : 'dictionaries',
  'machinepack-arrays'          : 'arrays',
  'machinepack-json'            : 'json',
  'machinepack-datetime'        : 'datetime',
  'machinepack-math'            : 'math',
  'machinepack-paths'           : 'paths',
  'machinepack-urls'            : 'urls',
  'machinepack-emailaddresses'  : 'emailaddresses',
  'machinepack-fs'              : 'fs',
  'machinepack-http'            : 'http',
  'machinepack-process'         : 'process',
  'machinepack-console'         : 'console',
  'machinepack-util'            : 'util',
  'machinepack-waterline'       : 'waterline',
  'machinepack-sockets'         : 'sockets',
  'machinepack-reqres'          : 'reqres',
  'machinepack-sessionauth'     : 'sessionauth',
  'machinepack-passwords'       : 'passwords',
  'machinepack-mailgun'         : 'mailgun',
  'machinepack-gravatar'        : 'gravatar',
};

