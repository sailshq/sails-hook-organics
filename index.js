/**
 * stdlib()
 *
 * Load a package from the standard library.
 *
 * @param {String} slug
 *        The unique project slug for a package.
 *
 * @return {Dictionary}
 *         The machinepack instance for the specified package.
 */
module.exports = function loadStdlibPkg (slug){

  switch (slug) {

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

    default:
      throw new Error('Unrecognized package slug: `'+slug+'`.  Please choose from the list of packages at https://github.com/sailsjs/stdlib');
  }

};

// Expose the version number for debugging purposes.
module.exports.VERSION = require('./package.json').version;
