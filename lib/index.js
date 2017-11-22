/**
 * Module dependencies
 */

var PACKAGE_JSON = require('./package.json');


/**
 * sails-stdlib()
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
 * @param {Dictionary?} customUsageOpts
 *        Custom usage opts to pass in
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @return {Dictionary}
 *         The machinepack instance for the specified package.
 */
module.exports = function loadSailsStdlibPg (slug, customUsageOpts){

  var pg = (function _gettingAppropriatePackage(){
    switch (slug.toLowerCase()) {

      // for...
      // Any Occasion
      case 'strings':
        return require('machinepack-strings');
      case 'flow':
        throw new Error('(work in progress)');


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

  // If specified, customize with custom usage opts.
  if (customUsageOpts) {
    pg = pg.customize(customUsageOpts);
  }

  return pg;

};

// Expose a top-level "customize" function, for convenience.
module.exports.customize = function(baseCustomUsageOpts){
  return function loadCustomSailsStdlibPg(slug, customUsageOpts){
    return module.exports(slug, Object.assign({}, baseCustomUsageOpts, customUsageOpts||{}));
  };//ƒ
};

// Expose the version string for debugging purposes.
module.exports.VERSION = PACKAGE_JSON.version;

// Expose the set of machinepacks bundled in this version of the standard library.
// (this is purely for convenience)
module.exports.PACKS = (function (){
  var _packs = {};
  Object.keys(PACKAGE_JSON.dependencies).forEach(function (pkgName){
    var shorthandSlug = pkgName.replace(/^machinepack-/, '');
    _packs[shorthandSlug] = PACKAGE_JSON.dependencies[pkgName];
  });
  return _packs;
})();
