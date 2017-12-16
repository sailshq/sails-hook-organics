/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var LIBRARY_CONTENTS = require('../lib/private/LIBRARY_CONTENTS');
// Also note that all defs are dynamically required below, either from where
// they are defined inline in this repo, or from the appropriate dependency.


/**
 * accessible/dry
 *
 * @type {Dictionary}
 */

module.exports = _.reduce(LIBRARY_CONTENTS, function(expandedPgInfoBySlug, pgInfo, pgSlug){

  expandedPgInfoBySlug[pgSlug] = _.extend({}, _.omit(pgInfo, 'methodIdts'), {
    defs: _.reduce(LIBRARY_CONTENTS[pgSlug].methodIdts, function(helpersByIdentity, helperIdentity){
      switch (pgSlug) {

        // for...
        // Things Defined In Dependencies
        case 'strings':
        case 'fs':
        case 'http':
        case 'process':
          var dryPg = require('machinepack-'+pgSlug).toJSON();
          helpersByIdentity[helperIdentity] = _.pick(dryPg.defs, LIBRARY_CONTENTS[pgSlug].methodIdts);
          break;

        // for...
        // Things Defined In This Repo
        case 'flow':
        case 'gravatar':
        case 'passwords':
        case 'mailgun':
        case 'stripe':
          helpersByIdentity[helperIdentity] = require('../lib/private/'+pgSlug+'/'+helperIdentity);
          break;

        // for...
        // Miscreants
        default:
          throw new Error('Unrecognized package slug: `'+pgSlug+'`.  Please choose from the list of packages listed at https://npmjs.com/package/sails-hook-organics');
      }

      return helpersByIdentity;
    }, {})
  });

  return expandedPgInfoBySlug;
}, {});
